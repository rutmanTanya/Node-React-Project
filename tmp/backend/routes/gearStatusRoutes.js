const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get status of all gear
router.get("/", (req, res) => {
    db.query("SELECT * FROM gear_status", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});

// Update gear condition
router.put("/:id", (req, res) => {
    const { condition, notes } = req.body;
    const { id } = req.params;

    const sql = "UPDATE gear_status SET condition = ?, notes = ? WHERE id = ?";
    db.query(sql, [condition, notes, id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Gear status updated!" });
    });
});

module.exports = router;
