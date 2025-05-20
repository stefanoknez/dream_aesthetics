export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form className="bg-gray-100 p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 mb-4 border rounded"
          required
        />
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  )
}