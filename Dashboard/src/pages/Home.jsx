import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [username, setName] = useState("");
  const [useremail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [roles, setRole] = useState("");

  const [role, getRole] = useState([]);
  const [users, setUser] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState("");

  useEffect(() => {
    fetchUser();
    fetchRole();
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/currentUser", {
        withCredentials: true,
      });
      setCurrentUserRole(res.data.role);
    } catch (e) {
      console.log("User not logged in or unauthorized");
      setCurrentUserRole("Unauthorized");
    }
  };

  const fetchRole = async () => {
    try {
      const res = await axios.get("http://localhost:8000/roles");
      getRole(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    formData.append("useremail", useremail);
    formData.append("contact", contact);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("roles", roles);
    if (image) formData.append("image", image);

    try {
      if (editingUser) {
        await axios.put(`http://localhost:8000/users/${editingUser}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("User updated successfully");
      } else {
        await axios.post("http://localhost:8000/users", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Record added successfully");
      }
      fetchUser();
      setName("");
      setEmail("");
      setContact("");
      setPassword("");
      setAddress("");
      setImage(null);
      setEditingUser(null);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/users");
      setUser(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      alert("User deleted successfully");
      fetchUser();
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = (id) => {
    const user = users.find((u) => u._id === id);
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setContact(user.contact);
      setPassword(user.password);
      setAddress(user.address);
      setEditingUser(user._id);
    }
  };

  if (currentUserRole !== "admin") {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger fw-bold">Only accessible to Admin</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div
        className="card shadow-lg border-0 mx-auto mb-5"
        style={{
          maxWidth: "900px",
          borderRadius: "18px",
          backgroundColor: "#fff",
        }}
      >
        <div className="card-body p-5">
          <h2
            className="text-center fw-bold mb-4"
            style={{ color: "#6f42c1", letterSpacing: "1px" }}
          >
            Add / Update Users
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control border-2"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setName(e.target.value)}
                  style={{ borderColor: "#6f42c1" }}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control border-2"
                  placeholder="Enter your email"
                  value={useremail}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ borderColor: "#6f42c1" }}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control border-2"
                  placeholder="Enter your contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  style={{ borderColor: "#6f42c1" }}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control border-2"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ borderColor: "#6f42c1" }}
                />
              </div>
              <div className="col-md-12">
                <input
                  type="text"
                  className="form-control border-2"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={{ borderColor: "#6f42c1" }}
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-select border-2"
                  value={roles}
                  onChange={(e) => setRole(e.target.value)}
                  style={{ borderColor: "#6f42c1" }}
                >
                  <option>---- Select any role ----</option>
                  {role.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <input
                  type="file"
                  className="form-control border-2"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ borderColor: "#6f42c1" }}
                />
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                className="btn px-5 py-2 fw-semibold"
                type="submit"
                style={{
                  backgroundColor: "#6f42c1",
                  color: "#fff",
                  borderRadius: "30px",
                }}
              >
                {editingUser ? "Update User" : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div
        className="card shadow-sm border-0"
        style={{ borderRadius: "18px", backgroundColor: "#fff" }}
      >
        <div className="card-body p-4">
          <h3
            className="fw-bold mb-4 text-center"
            style={{ color: "#6f42c1" }}
          >
             Users List
          </h3>
          <div className="table-responsive">
            <table className="table align-middle text-center">
              <thead>
                <tr style={{ backgroundColor: "#f5f0fa", color: "#6f42c1" }}>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>Created At</th>
                  <th>Role</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users
                  .filter((u) => u.role?.name !== "admin")
                  .map((u) => (
                    <tr key={u._id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.contact}</td>
                      <td>{u.address}</td>
                      <td>{u.created_at}</td>
                      <td>{u.role?.name}</td>
                      <td>
                        <img
                          src={u.image}
                          alt={u.name}
                          width={50}
                          height={50}
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            border: "2px solid #d1b3ff",
                          }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-sm me-2"
                          style={{
                            backgroundColor: "#dc3545",
                            color: "#fff",
                            borderRadius: "8px",
                          }}
                          onClick={() => handleDelete(u._id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-sm"
                          style={{
                            backgroundColor: "#6f42c1",
                            color: "#fff",
                            borderRadius: "8px",
                          }}
                          onClick={() => handleEdit(u._id)}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {users.length === 0 && (
              <p className="text-center text-muted fst-italic">
                No users found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
