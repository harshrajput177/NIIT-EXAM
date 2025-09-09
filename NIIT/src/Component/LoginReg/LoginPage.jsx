import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../LoginReg/LoginPage.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, role) => {
    e.preventDefault();

    try {
      // ✅ endpoint choose based on role
      const endpoint =
        role === "admin"
          ? "http://localhost:4000/api/auth/admin-login"
          : "http://localhost:4000/api/auth/login";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert(
          role === "admin"
            ? "✅ Admin Login Successful"
            : "✅ Student Login Successful"
        );
        localStorage.setItem("token", data.token);

        // ✅ Redirect based on role
        if (role === "admin") {
          navigate("/Register-user-by-admin");
        } else {
          navigate("/DetailPage");
        }
      } else {
        alert(data.message || "❌ Invalid Credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Server Error ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <form>
          <input
            type="text"
            name="userId"
            placeholder="User ID"
            value={formData.userId}
            onChange={handleChange}
            required
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

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, "student")}
            >
              Login as Student
            </button>
            <button
              type="submit"
              onClick={(e) => handleSubmit(e, "admin")}
            >
              Login as Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


