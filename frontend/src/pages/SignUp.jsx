import React, { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Signup failed");
        return;
      }

      setMessage("✅ Check your email for verification link");
    } catch (err) {
      setMessage("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Signup</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* ✅ Role only allowed here (signup only) */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;
