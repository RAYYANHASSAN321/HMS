import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Roles = () => {
  const [rolename, setRoleName] = useState('');
  const [roles, getRoles] = useState([]);
  const [currentUserRole, setCurrentUserRole] = useState('');

  useEffect(() => {
    fetchRoles();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/roles', { name: rolename });
      setRoleName('');
      fetchRoles();
    } catch (e) {
      console.log(e);
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get('http://localhost:8000/roles');
      getRoles(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (currentUserRole !== 'admin') {
    return (
      <div className="container text-center mt-5">
        <h2 className="text-danger fw-bold">Only accessible to Admin</h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div
        className="card shadow-lg border-0 mx-auto"
        style={{
          maxWidth: '800px',
          borderRadius: '16px',
          backgroundColor: '#fff',
        }}
      >
        <div className="card-body p-5">
          <h2
            className="text-center fw-bold mb-4"
            style={{
              color: '#6f42c1',
              letterSpacing: '1px',
            }}
          >
            🛠 Manage Roles
          </h2>

          <form className="mb-4" onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg border-2"
                placeholder="Enter role name"
                value={rolename}
                onChange={(e) => setRoleName(e.target.value)}
                style={{
                  borderColor: '#6f42c1',
                  borderRadius: '50px 0 0 50px',
                }}
                required
              />
              <button
                className="btn btn-lg fw-semibold"
                type="submit"
                style={{
                  backgroundColor: '#6f42c1',
                  color: '#fff',
                  borderRadius: '0 50px 50px 0',
                  border: 'none',
                }}
              >
                Add Role
              </button>
            </div>
          </form>

          <div className="table-responsive mt-4">
            <table className="table align-middle table-hover text-center">
              <thead>
                <tr style={{ backgroundColor: '#f5f0fa', color: '#6f42c1' }}>
                  <th>ID</th>
                  <th>Role Name</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r._id}>
                    <td>{r._id}</td>
                    <td className="fw-semibold" style={{ color: '#4b2980' }}>
                      {r.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {roles.length === 0 && (
            <p className="mt-3 text-muted fst-italic text-center">
              No roles added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Roles;
