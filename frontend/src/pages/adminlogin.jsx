
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      sessionStorage.setItem("adminToken", data.token);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Unable to connect to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          Admin Login
        </h1>

        <p className="mb-6 text-gray-500">
          Sign in to manage bookings
        </p>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-3 text-red-700">
            {error}
          </p>
        )}

        <label className="mb-2 block font-medium">Username</label>
        <input
          className="mb-4 w-full rounded-lg border p-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />

        <label className="mb-2 block font-medium">Password</label>
        <input
          className="mb-6 w-full rounded-lg border p-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black p-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
