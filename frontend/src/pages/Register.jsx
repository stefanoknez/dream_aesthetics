import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import logo from "../assets/logo.png";

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
    } catch {
      setMessage("Registration failed.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 animate-fadeBackground">
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
        <div className="bg-slideshow z-0 w-full h-full" />
      </div>

      {/* Register form */}
      <div className="relative z-20 flex items-center h-screen px-10">
        <div className="w-[520px] py-16 bg-white rounded-lg shadow-lg p-8 dark:bg-gray-800 dark:text-white ml-20">
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="Logo" className="w-16 h-16 mb-2" />
            <h1 className="text-2xl font-bold text-center">Create your account</h1>
          </div>
          <form onSubmit={handleRegister} className="space-y-6">
            {message && <div className="text-red-500 text-sm text-center">{message}</div>}
            <div>
              <label htmlFor="username" className="block text-sm font-medium">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition font-medium"
            >
              Register
            </button>
            <p className="mt-4 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-red-500 hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}