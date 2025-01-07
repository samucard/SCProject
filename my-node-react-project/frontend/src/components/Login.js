import React, { useState } from "react";

function Login({ onLoginSuccess, onSwitch }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      
      if (response.ok) {
        const token = data.token;
        localStorage.setItem("authToken", token);

        const userResponse = await fetch(
          "http://localhost:5001/api/users/details",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = await userResponse.json();

        if (userResponse.ok) {
          onLoginSuccess(userData);
        } else {
          setError("Errore nel recuperare i dettagli dell'utente");
        }
      } else {
        setError(data.message || "Errore durante il login");
      }
    } catch (error) {
      setError("Errore del server");
    }
  };

  return (
    <div className="auth-container max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-semibold mb-6">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Username o Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          type="submit"
        >
          Accedi
        </button>
      </form>
      {error && (
        <p className="auth-message text-red-500 mt-4 text-center">{error}</p>
      )}
      <p className="switch-text text-center mt-6">
        Non hai un account?{" "}
        <span
          onClick={onSwitch}
          className="switch-link text-blue-500 cursor-pointer"
        >
          Registrati ora
        </span>
      </p>
    </div>
  );
}

export default Login;
