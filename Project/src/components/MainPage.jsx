import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkSession,loginUser, logoutUser } from "../api";
import "../assets/styles/MainPage.css";

function MainPage() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Check if the user is logged in when the page loads
  useEffect(() => {
    const verifySession = async () => {
      const sessionData = await checkSession();
      if (sessionData.loggedIn) {
        setUser(sessionData.user);
      }
    };

    verifySession();
  }, []);

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser(username, password);

    if (result.error) {
      setMessage(result.error);
    } else {
      setUser(result.user);
      navigate(result.user.position_id === 4 ? "/admin" : "/dashboard"); // Redirect after login
    }
  };

   // Logout function
  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="main">
      <div className="internal-home">
        <h1>Welcome to the Internal System</h1>
        
        {user ? (
          <>
            <p>Access your tasks and system features from your dashboard.</p>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <button type="submit" className="login-button">Login</button>
            </form>
            {message && <p className="error-message">{message}</p>}
          </div>
        )}
      </div>
    </div>       
  );
}

export default MainPage;
