import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import { checkSession } from "/Users/tr/Downloads/ReactNodeProject-main/src/api.js";
import Login from './Login';
import MainPage from './MainPage';
import About from './About';
import MyAccount from './MyAccount';
import Header from './Header';
import Footer from './Footer';
import SinglePost from './SinglePost';
import Contact from './Contact';
import AdminDashboard from "./AdminDashboard";
import WorkerDashboard from "./WorkerDashboard";

function MyRoutes() {
  const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const verifySession = async () => {
          const sessionData = await checkSession();
          if (sessionData.loggedIn) {
              setUser(sessionData.user);
          }
          setLoading(false);
      };

      verifySession();
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Header />
      <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />

      {/*Protected Routes for logged in users only*/}

      <Route path="/admin" element={user && user.position_id === 4 ? <AdminDashboard /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={user ? <WorkerDashboard /> : <Navigate to="/login" />} />
      <Route path="/account" element={user ? <MyAccount /> : <Navigate to="/login" />} />

        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
      <Footer />
    </>
  );
}

export default MyRoutes
