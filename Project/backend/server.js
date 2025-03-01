//Project submitted by: Tanya Rotman, Alex Lapin. Class 48/6

const express = require('express'); 
const session = require('express-session'); 
const path = require("path");
const config = require("./config/config.js");
const db = require("./config/db");

//Authentication middleware
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Serve frontend from backend
app.use(express.static(path.join(__dirname, "../build")));

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

// All other routes → Serve React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Routes
const authRoutes = require("./routes/authRoutes");
const workerRoutes = require("./routes/workerRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/workers", authMiddleware([1]), workerRoutes);

// Start the server
app.listen(PORT, () => {
    console.log("Server running on http://localhost:4000");
});
