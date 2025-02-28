import React from "react";
import { logoutUser } from "../api";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate("/login");
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <p>Welcome, Admin! Manage users and system settings here.</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default AdminDashboard;
