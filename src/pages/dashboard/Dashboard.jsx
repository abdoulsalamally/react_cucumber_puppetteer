import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Navigate back to the login page
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to the Dashboard!</h1>
      <p>This is your main application area.</p>
      <button 
        onClick={handleLogout} 
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "20px"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
