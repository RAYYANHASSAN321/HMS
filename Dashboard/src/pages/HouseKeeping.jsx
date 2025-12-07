import React, { useEffect, useState } from "react";
import axios from "axios";

const HouseKeeping = () => {
  const [currentUserRole, setCurrentUserRole] = useState("");
  const [rooms, setRooms] = useState([]);
  const [reportText, setReportText] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
    fetchCurrentUser();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:8000/rooms");
      // Show only rooms needing cleaning or maintenance
      const filtered = res.data.filter(
        (r) => r.status === "maintenance" || r.status === "needs cleaning"
      );
      setRooms(filtered);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get("http://localhost:8000/currentUser", {
          withCredentials: true,
        });
        setCurrentUserRole(res.data.role);
      } catch (e) {
        console.log("User not logged in or unauthorized");
        setCurrentUserRole("unauthorized");
      }
    };
  

  const markAsCleaned = async (room) => {
    try {
      await axios.put(`http://localhost:8000/rooms/${room._id}`, {
        status: "available",
      });
      fetchRooms();
      alert(`Room ${room.roomNumber} marked as cleaned!`);
    } catch (err) {
      console.error(err);
    }
  };

  const submitReport = async () => {
    if (!selectedRoom || !reportText.trim()) return alert("Select room and write report.");
    try {
      await axios.post("http://localhost:8000/maintenanceReports", {
        roomId: selectedRoom._id,
        report: reportText,
      });
      alert("Report submitted successfully!");
      setReportText("");
      setSelectedRoom(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (currentUserRole !== "housekeeping") {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger fw-bold">Access Denied</h2>
        <p className="text-muted">Only House Keeping users can view this page.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "30px", fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "#f9f8fc" }}>
      <h2 style={{ color: "#6a0dad", marginBottom: "20px" }}>Cleaning Staff Dashboard</h2>

      <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" }}>
        <h4>Rooms Needing Attention</h4>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
              <th>Room</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((r) => (
              <tr key={r._id}>
                <td>{r.roomNumber}</td>
                <td>{r.roomType}</td>
                <td>{r.status}</td>
                <td>
                  <button
                    onClick={() => markAsCleaned(r)}
                    style={{
                      background: "#6a0dad",
                      color: "#fff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginRight: "8px",
                    }}
                  >
                    Mark as Cleaned
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>

       
      </div>
    </div>
  );
};

export default HouseKeeping;
