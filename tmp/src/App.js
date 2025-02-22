import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { checkSession } from "./api"; 
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./components/MyRoutes";
import "./App.css";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MyRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
