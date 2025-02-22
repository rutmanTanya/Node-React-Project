const express = require('express'); 
const session = require('express-session'); 
const config = require("./config/config.js");
const db = require("./config/db");

//Authentication middleware
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Session setup
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

// Route to check if the server is running
app.get("/", (req, res) => {
    res.send("Schedule & Logistics Backend Running");
});

//Route to check if the frontend is connected to backend
app.get("/api", (req, res) => {
    res.json({ message: "Hello from Backend!" });
});

// Routes
const authRoutes = require("./routes/authRoutes");
const workerRoutes = require("./routes/workerRoutes");
const dutyGearRoutes = require("./routes/dutyGearRoutes");
const gearStatusRoutes = require("./routes/gearStatusRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/workers", authMiddleware([4]), workerRoutes);
app.use("/api/duty-gear", authMiddleware([2, 4]), dutyGearRoutes); 
app.use("/api/gear-status", authMiddleware([1, 2, 3, 4]), gearStatusRoutes);

// Start the server
app.listen(PORT, () => {
    console.log("Server running on http://localhost:4000");
});
