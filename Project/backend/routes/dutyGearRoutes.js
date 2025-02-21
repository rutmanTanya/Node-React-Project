const express = require("express");
const router = express.Router();
const db = require("../config/db");

//Authentication middleware
const authMiddleware = require("../middleware/authMiddleware");

// Get all duty gear
router.get("/", (req, res) => {
    db.query("SELECT * FROM duty_gear_types", (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
});


// Update actual gear quantity - only for admins and ahmash
router.put("/:id", authMiddleware([2, 4]), (req, res) => {
    const { actual_gear_quantity, actual_cartridge_quantity } = req.body;
    const { id } = req.params;

    const sql = "UPDATE duty_gear_types SET actual_gear_quantity = ?, actual_cartridge_quantity = ? WHERE id = ?";
    db.query(sql, [actual_gear_quantity, actual_cartridge_quantity, id], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: "Gear updated!" });
    });
});


module.exports = router;
