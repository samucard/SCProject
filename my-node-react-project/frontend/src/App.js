// App.js
import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import "./index.css";
import logo from "./assets/logo.svg";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleLoginSuccess = (userData) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUser(userData);
    }, 5000); // Mostra il loader per 5 secondi
  };

  const toggleRegister = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className={`App ${loading ? "hide-content" : ""}`}>
      <header
        className={`app-header ${
          loading ? "hidden" : "flex items-center justify-center"
        }`}
      >
        <img src={logo} alt="Logo" className="h-20 w-auto" />
      </header>
      {loading ? (
        <div className="loader flex items-center justify-center min-h-screen">
          <img src={logo} alt="Logo" className="h-48 w-auto animate-pulse" />
        </div>
      ) : user ? (
        <Home user={user} />
      ) : isRegister ? (
        <Register onSwitch={toggleRegister} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} onSwitch={toggleRegister} />
      )}
    </div>
  );
}

export default App;
