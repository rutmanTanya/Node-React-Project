//Project submitted by: Tanya Rotman, Alex Lapin. Class 48/6
const express = require('express'); 
const session = require('express-session'); 
const path = require("path");
const config = require("./config/config.js");
const db = require("./config/db");

// Authentication middleware
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
    saveUninitialized: true,
    cookie: { secure: false }
}));

//DB connection
db.getConnection();

// Route to check if the server is running
app.get("/", (req, res) => {
    res.send("Schedule & Logistics Backend Running");
});

// API route to check connection
app.get("/api", (req, res) => {
    res.json({ message: "Hello from Backend!" });
});

// Routes
const authRoutes = require("./routes/authRoutes");
const workerRoutes = require("./routes/workerRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/workers", authMiddleware([1]), workerRoutes);

//React frontend connection
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
