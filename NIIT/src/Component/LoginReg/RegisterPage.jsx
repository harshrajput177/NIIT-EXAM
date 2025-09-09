import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginReg/LoginPage.css";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    password: "",
    duration: "10", // 👈 default 10 days
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("User Created Successfully 🎉");
        setFormData({ userId: "", name: "", password: "", duration: "10" });
      } else {
        alert(data.message || "Something went wrong ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create User</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={formData.userId}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Name (optional)"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            minLength="6"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Duration Dropdown */}
          <select
          className="selectDate"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          >
            <option value="10">10 Days</option>
            <option value="15">15 Days</option>
            <option value="20">20 Days</option>
          </select>

          <button type="submit">Create User</button>
        </form>

        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button onClick={() => navigate("/users")}>All Users</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;


