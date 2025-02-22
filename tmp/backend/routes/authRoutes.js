const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");

//Authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// User login
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    const sql = `
        SELECT users.id, users.username, users.password, users.position_id, positions.role 
        FROM users 
        JOIN positions ON users.position_id = positions.id 
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

        // Compare input password with hashed password in DB
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        // Store user session
        req.session.user = {
            id: user.id,
            username: user.username,
            position_id: user.position_id,
            role: user.role
        };

        console.log("SESSION DATA:", req.session.user);

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
                position_id: user.position_id
            }
        });
    });
});

// Check if user is logged in (session check)
router.get("/session", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ loggedIn: false, error: "Not authenticated." });
    }

    res.json({
        loggedIn: true,
        user: req.session.user
    });
});

// Register a new user with default password being their date of birth
//(Admins only)
router.post("/register", authMiddleware([4]), async (req, res) => {
    const { username, date_of_birth, email, position_id, worker_id } = req.body;

    if (!username || !date_of_birth || !email || !position_id || !worker_id) {
        return res.status(400).json({ error: "All fields are required." });
    }

    // Generate default password based on DOB (format: DDMMYYYY)
    const defaultPassword = date_of_birth.split("-").reverse().join("");

    // Hash the default password
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    // Insert user into database
    const sql = "INSERT INTO users (username, password, email, position_id, worker_id) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [username, hashedPassword, email, position_id, worker_id], (err, result) => {
        if (err) {
            console.error("MySQL Error:", err);
            res.status(500).json({ error: "Error registering user." });
        }
        res.status(201).json({ message: "User registered with default password!" });
    });
});

// Delete a User 
// (Admins Only)
router.delete("/users/:id", authMiddleware([4]), (req, res) => {
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

// Fetch user from database
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ error: "User not found." });
        }

        const user = result[0];

        // Verify the old password
        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Old password is incorrect." });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password in database
        const updateSql = "UPDATE users SET password = ? WHERE username = ?";
        db.query(updateSql, [hashedPassword, username], (updateErr, updateResult) => {
            if (updateErr) return res.status(500).json({ error: "Error updating password." });
            res.json({ message: "Password changed successfully!" });
        });
    });
});


module.exports = router;
