import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Manager = () => {
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState('');
  const [bookings, setBookings] = useState([]);

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
      const res = await axios.get("http://localhost:8000/guestlist");
      setGuests(res.data);
    } catch (err) {
      console.error("Failed to fetch guests:", err);
    }
  };

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:8000/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  // Chart data for bookings per room type
  const roomTypes = [...new Set(rooms.map(r => r.roomType))];
  const bookingsPerRoomType = roomTypes.map(
    type => bookings.filter(b => b.room?.roomType === type).length
  );

  const chartData = {
    labels: roomTypes,
    datasets: [
      {
        label: "Bookings per Room Type",
        data: bookingsPerRoomType,
        backgroundColor: "rgba(106, 13, 173, 0.7)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Room Bookings Overview" },
    },
  };

  if (currentUserRole !== 'manager') {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger fw-bold">Only accessible to Manager</h2>
      </div>
    );
  }


  return (
    <div style={{ padding: "30px", fontFamily: "'Poppins', sans-serif", background: "#f9f8fc", minHeight: "100vh" }}>
      <h2 style={{ color: "#6a0dad", marginBottom: "20px" }}>Manager Controls</h2>

      {/* Chart */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Guests Table */}
      <div style={{ marginBottom: "30px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
        <h4>Guests</h4>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((g) => (
              <tr key={g._id}>
                <td>{g.name}</td>
                <td>{g.contact}</td>
                <td>{g.email || "—"}</td>
                <td>{g.address || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rooms Table */}
      <div style={{ marginBottom: "30px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
        <h4>Rooms</h4>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
              <th>Room Number</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r._id}>
                <td>{r.roomNumber}</td>
                <td>{r.roomType}</td>
                <td>${r.price}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bookings Table */}
      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
        <h4>Bookings</h4>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
              <th>Guest</th>
              <th>Room</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.guest?.name || "—"}</td>
                <td>{b.room?.roomNumber || "—"}</td>
                <td>{new Date(b.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(b.checkOutDate).toLocaleDateString()}</td>
                <td>${b.totalAmount}</td>
                <td>{b.bookingStatus || "pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manager;
