import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const Analytics = () => {
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [roomType, setRoomType] = useState("all");

  useEffect(() => {
    fetchCurrentUser();
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [bookings, month, year, roomType]);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/currentUser", { withCredentials: true });
      setCurrentUserRole(res.data.role);
    } catch (err) {
      console.error("Error fetching current user:", err);
      setCurrentUserRole("unauthorized");
    }
  };

  const fetchData = async () => {
    try {
      const bookingsRes = await axios.get("http://localhost:8000/bookings");
      const roomsRes = await axios.get("http://localhost:8000/rooms");
      setBookings(bookingsRes.data);
      setRooms(roomsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const applyFilters = () => {
    let filtered = bookings.filter(b => {
      const bDate = new Date(b.checkInDate);
      const matchMonth = bDate.getMonth() + 1 === parseInt(month);
      const matchYear = bDate.getFullYear() === parseInt(year);
      const matchRoomType = roomType === "all" || b.room?.roomType === roomType;
      return matchMonth && matchYear && matchRoomType;
    });
    setFilteredBookings(filtered);
  };

  // Block Housekeeping role
  if (currentUserRole === "housekeeping") {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger fw-bold">Access Denied</h2>
        <p className="text-muted">Only Managers/Admins can view this Analytics page.</p>
      </div>
    );
  }

  // Stats
  const totalBookings = filteredBookings.length;
  const totalRevenue = filteredBookings.reduce((sum, b) => sum + b.totalAmount, 0);
  const activeRooms = rooms.filter(r => r.status === "available").length;

  const chartData = Array.from({ length: 12 }, (_, i) => {
    const m = i + 1;
    const monthlyBookings = filteredBookings.filter(b => new Date(b.checkInDate).getMonth() + 1 === m);
    const monthlyRevenue = monthlyBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    return { month: m.toString(), bookings: monthlyBookings.length, revenue: monthlyRevenue };
  });

  const uniqueRoomTypes = [...new Set(rooms.map(r => r.roomType))];

  return (
    <div style={{ padding: "30px", fontFamily: "'Poppins', sans-serif", background: "#f9f8fc", minHeight: "100vh" }}>
      <h2 style={{ color: "#6a0dad", marginBottom: "20px" }}>Performance Analytics Dashboard</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" }}>
        <select value={month} onChange={e => setMonth(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>

        <select value={year} onChange={e => setYear(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px" }}>
          {[2023, 2024, 2025].map(y => <option key={y} value={y}>{y}</option>)}
        </select>

        <select value={roomType} onChange={e => setRoomType(e.target.value)} style={{ padding: "8px 12px", borderRadius: "8px" }}>
          <option value="all">All Room Types</option>
          {uniqueRoomTypes.map(rt => <option key={rt} value={rt}>{rt}</option>)}
        </select>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "200px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <h4>Total Bookings</h4>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#6a0dad" }}>{totalBookings}</p>
        </div>
        <div style={{ flex: 1, minWidth: "200px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <h4>Total Revenue</h4>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#6a0dad" }}>${totalRevenue}</p>
        </div>
        <div style={{ flex: 1, minWidth: "200px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <h4>Active Rooms</h4>
          <p style={{ fontSize: "28px", fontWeight: "700", color: "#6a0dad" }}>{activeRooms}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div style={{ flex: 2, minWidth: "300px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <h4>Monthly Bookings</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="bookings" stroke="#6a0dad" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ flex: 2, minWidth: "300px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
          <h4>Monthly Revenue</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#6a0dad" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Bookings */}
      <div style={{ marginTop: "40px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
        <h4>Recent Bookings</h4>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
              <th>Guest</th>
              <th>Room</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.slice(-5).reverse().map((b) => (
              <tr key={b._id}>
                <td>{b.guest?.name || "—"}</td>
                <td>{b.room?.roomNumber || "—"}</td>
                <td>{new Date(b.checkInDate).toLocaleDateString()}</td>
                <td>{new Date(b.checkOutDate).toLocaleDateString()}</td>
                <td>${b.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
