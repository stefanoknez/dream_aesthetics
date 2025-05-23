import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await AuthService.register(username, email, password);
      if (response.message === "User was registered successfully!") {
        setMessage("Registration successful!");
        navigate("/login");
      } else {
        setMessage(response.message || "Registration failed.");
      }
    } catch (err) {
      setMessage("Registration failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleRegister} className="bg-gray-200 p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {message && <div className="text-red-600 mb-4">{message}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}