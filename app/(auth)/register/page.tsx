"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import "@/styles/pages/auth.css";

export default function RegisterPage() {
  const router = useRouter();
  const params = useSearchParams();
  const defaultRole = params.get("role") ?? "buyer";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: defaultRole,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!data.success) {
      setError(data.error);
      setLoading(false);
      return;
    }

    // Auto sign in after registration
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      callbackUrl: form.role === "vendor" ? "/dashboard/vendor" : "/",
    });
  }

  return (
    <div className="auth-page">
      <div className="auth-page__visual">
        <div className="auth-page__visual-bg" />
        <div className="auth-page__visual-grid" />
        <div className="auth-page__visual-content">
          <p className="auth-page__visual-logo">Skill<span>ora</span></p>
          <p className="auth-page__visual-tagline">
            Join thousands of freelancers and clients on the platform built for results.
          </p>
        </div>
      </div>

      <div className="auth-page__form-side">
        <div className="auth-form">
          <h1 className="auth-form__title">Create your account</h1>
          <p className="auth-form__subtitle">
            Already have one? <Link href="/login">Sign in</Link>
          </p>

          {/* Google OAuth */}
          <button className="auth-google-btn" onClick={() => signIn("google", { callbackUrl: "/" })}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="auth-divider">or</div>

          {/* Role selector */}
          <div style={{ marginBottom: "20px" }}>
            <p className="form-label" style={{ marginBottom: 10 }}>I want to...</p>
            <div className="auth-form__role-toggle">
              <button
                type="button"
                className={`auth-form__role-option ${form.role === "buyer" ? "auth-form__role-option--active" : ""}`}
                onClick={() => setForm({ ...form, role: "buyer" })}
              >
                <span className="auth-form__role-icon">🛒</span>
                <span className="auth-form__role-label">Hire talent</span>
                <span className="auth-form__role-desc">Find & buy services</span>
              </button>
              <button
                type="button"
                className={`auth-form__role-option ${form.role === "vendor" ? "auth-form__role-option--active" : ""}`}
                onClick={() => setForm({ ...form, role: "vendor" })}
              >
                <span className="auth-form__role-icon">💼</span>
                <span className="auth-form__role-label">Sell services</span>
                <span className="auth-form__role-desc">Offer your skills</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                type="text"
                placeholder="Jane Smith"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={8}
              />
              {error && <p className="form-error">{error}</p>}
            </div>

            <Button type="submit" fullWidth loading={loading} style={{ marginTop: 8 }}>
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
