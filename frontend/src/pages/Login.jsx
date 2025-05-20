import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    // ovde ide validacija i backend poziv
    navigate('/home')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form onSubmit={handleLogin} className="bg-gray-100 p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </form>
    </div>
  )
}