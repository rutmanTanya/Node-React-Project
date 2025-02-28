const API_URL = "http://localhost:4000/api"; 

// Check if the user is logged in (Session Validation)
export const checkSession = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/session`, {
            method: "GET",
            credentials: "include", // Ensures cookies (session data) are sent
        });

        return await response.json();
    } catch (error) {
        console.error("Session Check Error:", error);
        return { loggedIn: false };
    }
};

// User Login API
export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ username, password }),
        });

        return await response.json();
    } catch (error) {
        console.error("Login Error:", error);
        return { error: "Failed to connect to server" };
    }
};

// Logout API
export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        return await response.json();
    } catch (error) {
        console.error("Logout Error:", error);
        return { error: "Failed to log out." };
    }
};
