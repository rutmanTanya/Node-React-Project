import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { checkSession, logoutUser } from "../api";
import logo from '../assets/img/logo.png';

function Header() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Check session on page load
    useEffect(() => {
        const verifySession = async () => {
            const sessionData = await checkSession();
            if (sessionData.loggedIn) {
                setUser(sessionData.user);
            }
        };

        verifySession();
    }, []);

    // Logout function
    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
        navigate("/login"); // Redirect to login page after logout
    };

    return (
      <header>
        <div className="container">
          <div className="header__wrap">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="logo" />
                <span className="slogan">Security Schedule and Logistics</span>
              </Link>
              <p className='pName'>Alex Lapin & Tanya Rotman</p>
            </div>
            
            {/* Navigation Menu */}
            <nav>
              <ul className="menu">
                <li>
                  <NavLink to="/" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"} end>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                    Contact
                  </NavLink>
                </li>

                {/* Show Dashboard & Logout only when logged in */}
                {user && (
                  <>
                    <li>
                      <NavLink to={user.position_id === 4 ? "/admin" : "/dashboard"} 
                        className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}>
                        Dashboard
                      </NavLink>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="menu-item logout-button">Logout</button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    );
}

export default Header;
