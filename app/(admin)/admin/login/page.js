"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/admin");
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <i className="fa-solid fa-grid-2"></i>
        </div>
        <h1>Welcome Back</h1>
        <p>Sign in to your admin panel</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p style={{ color: "#ef4444", fontSize: 13, margin: "0 0 16px", textAlign: "center" }}>
              {error}
            </p>
          )}
          <button type="submit" className="btn-primary-admin" style={{ width: "100%", justifyContent: "center", padding: "12px", fontSize: 15 }}>
            <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
