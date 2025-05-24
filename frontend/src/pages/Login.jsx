import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import logo from "../assets/logo.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const user = await AuthService.login(username, password);
      if (user.accessToken) {
        navigate(user.role === "ADMIN" ? "/admin-dashboard" : "/dashboard");
      } else {
        setMessage("Login failed. Invalid credentials.");
      }
    } catch {
      setMessage("Login failed. Invalid credentials.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 animate-fadeBackground">
        <div className="absolute inset-0 bg-black opacity-50 z-10" />
        <div className="bg-slideshow z-0 w-full h-full" />
      </div>

      {/* Login form */}
      <div className="relative z-20 flex items-center h-screen px-10">
        <div className="w-[520px] py-16 bg-white rounded-lg shadow-lg p-8 dark:bg-gray-800 dark:text-white ml-20">
          <div className="flex flex-col items-center mb-8">
            <img src={logo} alt="Logo" className="w-16 h-16 mb-2" />
            <h1 className="text-2xl font-bold text-center">Sign in to your account</h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
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
              Sign in
            </button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link to="/register" className="text-red-500 hover:underline">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}