const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

// User Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    const sql = `
        SELECT users.id, users.username, users.password, workers.position_id, positions.role, workers.date_of_birth
        FROM users
        JOIN workers ON users.worker_id = workers.id
        JOIN positions ON workers.position_id = positions.id
        WHERE users.username = ?
    `;

    db.query(sql, [username], async (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Server error. Please try again later." });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        const user = result[0];
        const defaultPassword = user.date_of_birth.split("-").reverse().join("");
        const isValid = await bcrypt.compare(password, user.password) || password === defaultPassword;

        if (!isValid) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        req.session.user = {
            id: user.id,
            username: user.username,
            position_id: user.position_id,
            role: user.role
        };

        res.json({
            message: "Login successful",
            user: req.session.user
        });
    });
});

// Check if user is logged in
router.get("/session", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ loggedIn: false, error: "Not authenticated." });
    }

    res.json({
        loggedIn: true,
        user: req.session.user
    });
});

// Register a new user (Admins Only)
router.post("/register", authMiddleware([1]), async (req, res) => {
    const { gov_id, date_of_birth, worker_id } = req.body;

    if (!gov_id || !date_of_birth || !worker_id) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const defaultPassword = date_of_birth.split("-").reverse().join("");
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const sql = "INSERT INTO users (username, password, worker_id) VALUES (?, ?, ?)";
    db.query(sql, [gov_id, hashedPassword, worker_id], (err) => {
        if (err) {
            console.error("MySQL Error:", err);
            return res.status(500).json({ error: "Error registering user." });
        }
        res.status(201).json({ message: "User registered with default password!" });
    });
});

// Delete a User (Admins Only)
router.delete("/users/:id", authMiddleware([1]), (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error deleting user." });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found." });
        }
        res.json({ message: "User deleted successfully!" });
    });
});

// Change Password Route
router.put("/change-password", (req, res) => {
    const { username, oldPassword, newPassword } = req.body;

    if (!username || !oldPassword || !newPassword) {
        return res.status(400).json({ error: "All fields are required." });
    }

    const sql = "SELECT users.password, workers.date_of_birth FROM users JOIN workers ON users.worker_id = workers.id WHERE users.username = ?";
    db.query(sql, [username], async (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const user = result[0];
        const defaultPassword = user.date_of_birth.split("-").reverse().join("");
        const isValid = await bcrypt.compare(oldPassword, user.password) || oldPassword === defaultPassword;

        if (!isValid) {
            return res.status(401).json({ error: "Old password is incorrect." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateSql = "UPDATE users SET password = ? WHERE username = ?";
        db.query(updateSql, [hashedPassword, username], (updateErr) => {
            if (updateErr) return res.status(500).json({ error: "Error updating password." });
            
            req.session.destroy();
            res.json({ message: "Password changed successfully. Please log in again." });
        });
    });
});

module.exports = router;

