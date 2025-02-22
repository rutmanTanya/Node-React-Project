const authMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.status(403).json({ error: "Not authorized. Please log in." });
        }

        const userRole = req.session.user.position_id; 

        if (!requiredRoles.includes(userRole)) {
            return res.status(403).json({ error: "You do not have permission." });
        }

        next(); // Allow access
    };
};

module.exports = authMiddleware;
