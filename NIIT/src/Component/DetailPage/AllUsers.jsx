import React, { useEffect, useState } from "react";
import "../DetailPage/DetailPage.css"

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // 👈 modal ke liye
  const [formData, setFormData] = useState({ name: "", expiryDate: "" });

  // ✅ Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Delete User
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const res = await fetch(`http://localhost:4000/api/auth/users/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("User deleted ✅");
        setUsers(users.filter((user) => user._id !== id));
      } else {
        alert("Failed to delete ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  // ✅ Open Edit Modal
  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      expiryDate: user.expiryDate
        ? new Date(user.expiryDate).toISOString().split("T")[0] // YYYY-MM-DD
        : "",
    });
  };

  // ✅ Update User
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/auth/users/${editingUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        const updatedUser = await res.json();
        alert("User updated ✅");

        // Update list without reload
        setUsers(
          users.map((u) =>
            u._id === editingUser._id ? updatedUser.user : u
          )
        );

        setEditingUser(null); // close modal
      } else {
        alert("Failed to update ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Expiry Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.userId}</td>
                <td>{user.name}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  {user.expiryDate
                    ? new Date(user.expiryDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

  {editingUser && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>Edit User</h3>
      <label>
        Name:
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
      </label>
      <label>
        Expiry Date:
        <input
          type="date"
          value={formData.expiryDate}
          onChange={(e) =>
            setFormData({ ...formData, expiryDate: e.target.value })
          }
        />
      </label>

      <div className="modal-actions">
        <button onClick={handleUpdate}>Save</button>
        <button onClick={() => setEditingUser(null)}>Cancel</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AllUsers;


