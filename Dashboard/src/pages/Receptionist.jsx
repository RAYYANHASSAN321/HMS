import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE = "http://localhost:8000";

const Receptionist = () => {
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [guestData, setGuestData] = useState({
    name: "",
    contact: "",
    email: "",
    address: "",
    idProof: "",
  });
  const [bookingData, setBookingData] = useState({
    guestId: "",
    roomId: "",
    checkInDate: "",
    checkOutDate: "",
    totalAmount: "",
  });

  useEffect(() => {
    fetchGuests();
    fetchRooms();
    fetchBookings();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/currentUser', { withCredentials: true });
        setCurrentUserRole(res.data.role);
      } catch (e) {
        console.log('User not logged in or unauthorized');
        setCurrentUserRole('Unauthorized');
      }
    };

  const fetchGuests = async () => {
    try {
      const res = await axios.get(`${BASE}/guestlist`);
      setGuests(res.data || []);
    } catch (err) {
      console.error(err);
      setGuests([]);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get(`${BASE}/rooms`);
      if (Array.isArray(res.data)) {
        setRooms(res.data.filter((r) => r.status === "available"));
      } else {
        setRooms([]);
      }
    } catch (err) {
      console.error(err);
      setRooms([]);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${BASE}/bookings`);
      setBookings(res.data || []);
    } catch (err) {
      console.error(err);
      setBookings([]);
    }
  };

  const addGuest = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE}/guest`, guestData);
      alert("Guest Added!");
      setGuestData({ name: "", contact: "", email: "", address: "", idProof: "" });
      fetchGuests();
    } catch (err) {
      console.error(err);
      alert("Failed to add guest");
    }
  };

  const bookRoom = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE}/book`, bookingData);
      alert("Room booked successfully!");
      setBookingData({ guestId: "", roomId: "", checkInDate: "", checkOutDate: "", totalAmount: "" });
      fetchBookings();
      fetchRooms();
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Booking failed");
    }
  };

  const checkout = async (id) => {
    try {
      await axios.put(`${BASE}/checkout/${id}`);
      alert("Checkout successful! Invoice sent via email (if guest had an email).");
      fetchBookings();
      fetchRooms();
    } catch (err) {
      console.error(err);
      alert("Checkout failed");
    }
  };

   if (currentUserRole !== 'receptionist') {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger fw-bold">Only accessible to Receptionist</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h2 className="text-center mb-4" style={{ color: "#5e17eb", fontWeight: 700 }}>
        Receptionist Dashboard
      </h2>

      {/* Guest Form */}
      <div
        className="card p-4 mb-4"
        style={{
          border: "none",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.7)",
          boxShadow: "0 8px 25px rgba(94,23,235,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h4 className="mb-3" style={{ color: "#5e17eb", fontWeight: "600" }}>
          Add Guest
        </h4>
        <form onSubmit={addGuest} className="row g-3">
          {Object.keys(guestData).map((key) => (
            <div className="col-md-4" key={key}>
              <input
                type="text"
                className="form-control"
                placeholder={key.toUpperCase()}
                value={guestData[key]}
                onChange={(e) => setGuestData({ ...guestData, [key]: e.target.value })}
                required={key === "name" || key === "contact"}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #d0c2f2",
                  padding: "10px",
                }}
              />
            </div>
          ))}
          <div className="col-12 text-end">
            <button
              className="btn"
              style={{
                background: "linear-gradient(135deg, #6a0dad, #a770ef)",
                color: "white",
                borderRadius: "10px",
                padding: "10px 25px",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(106,13,173,0.3)",
              }}
            >
              Add Guest
            </button>
          </div>
        </form>
      </div>

      {/* Booking Form */}
      <div
        className="card p-4 mb-4"
        style={{
          border: "none",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.7)",
          boxShadow: "0 8px 25px rgba(94,23,235,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h4 className="mb-3" style={{ color: "#5e17eb", fontWeight: "600" }}>
          Book Room
        </h4>
        <form onSubmit={bookRoom} className="row g-3">
          <div className="col-md-3">
            <select
              className="form-select"
              value={bookingData.guestId}
              onChange={(e) => setBookingData({ ...bookingData, guestId: e.target.value })}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #d0c2f2",
                padding: "10px",
              }}
            >
              <option value="">Select Guest</option>
              {guests.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <select
              className="form-select"
              value={bookingData.roomId}
              onChange={(e) => setBookingData({ ...bookingData, roomId: e.target.value })}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #d0c2f2",
                padding: "10px",
              }}
            >
              <option value="">Select Room</option>
              {rooms.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.roomNumber} - {r.roomType}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={bookingData.checkInDate}
              onChange={(e) => setBookingData({ ...bookingData, checkInDate: e.target.value })}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #d0c2f2",
                padding: "10px",
              }}
            />
          </div>

          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={bookingData.checkOutDate}
              onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #d0c2f2",
                padding: "10px",
              }}
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control"
              placeholder="Total Amount"
              value={bookingData.totalAmount}
              onChange={(e) => setBookingData({ ...bookingData, totalAmount: e.target.value })}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #d0c2f2",
                padding: "10px",
              }}
            />
          </div>

          <div className="col-12 text-end">
            <button
              className="btn"
              style={{
                background: "linear-gradient(135deg, #5e17eb, #a770ef)",
                color: "white",
                borderRadius: "10px",
                padding: "10px 25px",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(94,23,235,0.3)",
              }}
            >
              Book Room
            </button>
          </div>
        </form>
      </div>

      {/* Booking Table */}
      <div
        className="card p-4"
        style={{
          border: "none",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.8)",
          boxShadow: "0 8px 25px rgba(94,23,235,0.1)",
        }}
      >
        <h4 className="mb-3" style={{ color: "#5e17eb", fontWeight: "600" }}>
          All Bookings
        </h4>
        <table className="table table-hover align-middle">
          <thead style={{ backgroundColor: "#f4edff", color: "#5e17eb" }}>
            <tr>
              <th>Guest</th>
              <th>Room</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.guest?.name || "—"}</td>
                <td>{b.room? `${b.room.roomNumber} - ${b.room.roomType}`: "—"}</td>
                <td>{new Date(b.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(b.checkOutDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className="badge"
                    style={{
                      background:
                        b.bookingStatus === "checked-out"
                          ? "#b39ddb"
                          : "linear-gradient(135deg, #6a0dad, #a770ef)",
                      color: "white",
                      borderRadius: "6px",
                      padding: "5px 10px",
                    }}
                  >
                    {b.bookingStatus}
                  </span>
                </td>
                <td>{b.paymentStatus}</td>
                <td>
                  {b.bookingStatus === "booked" && (
                    <button
                      className="btn btn-sm"
                      onClick={() => checkout(b._id)}
                      style={{
                        background: "linear-gradient(135deg, #ef5350, #d32f2f)",
                        color: "white",
                        borderRadius: "8px",
                        padding: "6px 14px",
                        fontWeight: 500,
                      }}
                    >
                      Checkout
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Receptionist;
