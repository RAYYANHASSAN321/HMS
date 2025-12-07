import React, { useState, useEffect } from "react";
import axios from "axios";

const Room = () => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("available");
  const [image, setImage] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState("");

  useEffect(() => {
    fetchCurrentUser();
    fetchRooms();
  }, []);

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

  const fetchRooms = async () => {
    try {
      const res = await axios.get("http://localhost:8000/rooms");
      setRooms(res.data);
    } catch (err) {
      console.error("Error fetching rooms:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("roomNumber", roomNumber);
    formData.append("roomType", roomType);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("status", status);
    if (image) formData.append("image", image);

    try {
      if (editingRoom) {
        await axios.put(`http://localhost:8000/rooms/${editingRoom}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Room updated successfully!");
      } else {
        await axios.post("http://localhost:8000/rooms", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Room added successfully!");
      }

      resetForm();
      fetchRooms();
    } catch (err) {
      console.error("Error saving room:", err);
      alert("Something went wrong!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this room?")) return;
    try {
      await axios.delete(`http://localhost:8000/rooms/${id}`);
      alert("🗑 Room deleted successfully!");
      fetchRooms();
    } catch (err) {
      console.error("Error deleting room:", err);
    }
  };

  const handleEdit = (id) => {
    const room = rooms.find((r) => r._id === id);
    if (room) {
      setRoomNumber(room.roomNumber);
      setRoomType(room.roomType);
      setPrice(room.price);
      setDescription(room.description);
      setStatus(room.status || "available");
      setEditingRoom(room._id);
      setPreview(room.image);
    }
  };

  const resetForm = () => {
    setRoomNumber("");
    setRoomType("");
    setPrice("");
    setDescription("");
    setStatus("available");
    setImage(null);
    setPreview(null);
    setEditingRoom(null);
    document.getElementById("imageInput").value = "";
  };

  if (currentUserRole !== "admin") {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger fw-bold">Access Denied</h2>
        <p className="text-muted">Only admin users can view this page.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Add / Update Form */}
      <div className="card shadow-lg mb-4 p-4" style={{ borderRadius: "18px" }}>
        <h2 className="text-center mb-4" style={{ color: "#6f42c1" }}>
          {editingRoom ? "Update Room" : "Add New Room"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Room Number"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Room Type"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="available">Available</option>
                <option value="booked">Booked</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div className="col-md-6">
              <input
                id="imageInput"
                type="file"
                className="form-control"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setImage(file);
                  setPreview(file ? URL.createObjectURL(file) : null);
                }}
              />
            </div>
            <div className="col-md-12">
              <textarea
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {preview && (
              <div className="text-center mt-2">
                <img
                  src={preview}
                  alt="Preview"
                  width={100}
                  height={100}
                  style={{ borderRadius: "10px", objectFit: "cover" }}
                />
              </div>
            )}
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-primary px-4" type="submit">
              {editingRoom ? "Update Room" : "Add Room"}
            </button>
            {editingRoom && (
              <button
                type="button"
                className="btn btn-secondary ms-3 px-4"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Room List */}
      <div className="card shadow-sm p-4" style={{ borderRadius: "18px" }}>
        <h3 className="text-center mb-4" style={{ color: "#6f42c1" }}>
          🛏 Rooms List
        </h3>
        <table className="table text-center align-middle">
          <thead style={{ backgroundColor: "#f5f0fa", color: "#6f42c1" }}>
            <tr>
              <th>Room No</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Description</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length > 0 ? (
              rooms.map((r) => (
                <tr key={r._id}>
                  <td>{r.roomNumber}</td>
                  <td>{r.roomType}</td>
                  <td>${r.price}</td>
                  <td>
                    <span
                      className={`badge ${
                        r.status === "available"
                          ? "bg-success"
                          : r.status === "booked"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td>{r.description}</td>
                  <td>
                    <img
                      src={r.image}
                      alt={r.roomNumber}
                      width={50}
                      height={50}
                      style={{ borderRadius: "8px", objectFit: "cover" }}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => handleDelete(r._id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(r._id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-muted">
                  No rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Room;
