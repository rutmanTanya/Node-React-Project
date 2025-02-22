const express = require("express");
const router = express.Router();
const db = require("../config/db");

//Authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// Get all workers
router.get("/", (req, res) => {
    db.query("SELECT * FROM workers", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Add a new worker
router.post("/", (req, res) => {
    const { name, lastname, date_of_birth, certification, works_weekends, role } = req.body;
    
    const sql = "INSERT INTO workers (name, lastname, date_of_birth, certification, works_weekends, role) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [name, lastname, date_of_birth, certification, works_weekends, role], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Worker added!" });
    });
});

//Restriction to add workers - only allowed to admin position
router.post("/", authMiddleware([4]), (req, res) => {
    const { name, lastname, date_of_birth, certification, works_weekends, phone_number, email, position_id } = req.body;

    const sql = "INSERT INTO workers (name, lastname, date_of_birth, certification, works_weekends, phone_number, email, position_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [name, lastname, date_of_birth, certification, works_weekends, phone_number, email, position_id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ message: "Worker added!" });
    });
});

module.exports = router;
