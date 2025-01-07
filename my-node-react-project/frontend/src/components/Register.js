import React, { useState } from "react";
import axios from "axios";

function Register({ onSwitch }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [residence, setResidence] = useState("");
  const [address, setAddress] = useState("");
  const [manager, setManager] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    if (!username || !password || !address || !manager) {
      setMessage("Tutti i campi obbligatori devono essere compilati.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("birthDate", birthDate);
    formData.append("residence", residence);
    formData.append("address", address);
    formData.append("manager", manager);
    formData.append("logo", logoFile);

    try {
      const response = await axios.post(
        "http://localhost:5001/api/users/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setMessage(response.data);
    } catch (error) {
            console.log("Dati inviati:", Array.from(formData.entries()));
      setMessage("Errore durante la registrazione");
    }
  };

  return (
    <div className="auth-container max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-semibold mb-6">Registrati</h2>
      <form className="space-y-4" autoComplete="off">
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Username"
          autoComplete="new-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          autoComplete="new-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Nome"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Cognome"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="date"
          placeholder="Data di nascita"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Residenza (opzionale)"
          value={residence}
          onChange={(e) => setResidence(e.target.value)}
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Indirizzo"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Manager"
          value={manager}
          onChange={(e) => setManager(e.target.value)}
        />
        <input
          className="block w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
          accept="image/svg+xml, image/png, image/jpeg"
          onChange={(e) => setLogoFile(e.target.files[0])}
        />
        <button
          className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          onClick={handleRegister}
          type="button"
        >
          Registrati
        </button>
      </form>
      <p className="auth-message text-center mt-4 text-green-500">{message}</p>
      <p className="switch-text text-center mt-6">
        Sei già registrato?{" "}
        <span
          onClick={onSwitch}
          className="switch-link text-blue-500 cursor-pointer"
        >
          Accedi ora
        </span>
      </p>
    </div>
  );
}

export default Register;
