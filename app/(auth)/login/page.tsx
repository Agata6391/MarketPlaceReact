// "use client";

// import { useState } from "react";
// import { signIn } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/Button";
// import "@/styles/pages/auth.css";

// export default function LoginPage() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const callbackUrl = params.get("callbackUrl") ?? "/";

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const result = await signIn("credentials", {
//       email: form.email,
//       password: form.password,
//       redirect: false,
//     })
//     ;if (result?.error) {
//   const e = result.error;

//   if (e === "ACCOUNT_BANNED") setError("Your account is banned.Please contact support.");
//   else if (e === "ACCOUNT_DELETED") setError("Your account is inactive.");
//   else if (e === "ACCOUNT_SUSPENDED") setError("Your account is suspended. Please contact support.");
//   else if (e.startsWith("ACCOUNT_SUSPENDED_UNTIL:")) {
//     const iso = e.split("ACCOUNT_SUSPENDED_UNTIL:")[1];
//     const d = new Date(iso);
//     setError(`Your account is suspended until ${d.toLocaleString()}.`);
//   } else {
//     setError("Invalid email or password");
//   }

//   setLoading(false);
//   return;
// }

// router.push(callbackUrl);

//     // if (result?.error) {
//     //   setError("Invalid email or password");
//     //   setLoading(false);
//     // } else {
//     //   router.push(callbackUrl);
//     // }
//   }

//   return (
//     <div className="auth-page">
//       {/* Left visual panel */}
//       <div className="auth-page__visual">
//         <div className="auth-page__visual-bg" />
//         <div className="auth-page__visual-grid" />
//         <div className="auth-page__visual-content">
//           <p className="auth-page__visual-logo">Octu<span>pus</span></p>
//           <p className="auth-page__visual-tagline">
//             The marketplace where talent meets opportunity.
//           </p>
//         </div>
//       </div>

//       {/* Right form panel */}
//       <div className="auth-page__form-side">
//         <div className="auth-form">
//           <h1 className="auth-form__title">Welcome back</h1>
//           <p className="auth-form__subtitle">
//             No account yet?{" "}
//             <Link href="/register">Create one for free</Link>
//           </p>

//           {/* Google OAuth */}
//           <button className="auth-google-btn" onClick={() => signIn("google", { callbackUrl })}>
//             <svg width="18" height="18" viewBox="0 0 24 24">
//               <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//               <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//               <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
//               <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//             </svg>
//             Continue with Google
//           </button>

//           <div className="auth-divider">or</div>

//           {/* Credentials form */}
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label className="form-label">Email</label>
//               <input
//                 className={`form-input ${error ? "form-input--error" : ""}`}
//                 type="email"
//                 placeholder="you@example.com"
//                 value={form.email}
//                 onChange={(e) => setForm({ ...form, email: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label className="form-label">Password</label>
//               <input
//                 className={`form-input ${error ? "form-input--error" : ""}`}
//                 type="password"
//                 placeholder="••••••••"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 required
//               />
//               {error && <p className="form-error">{error}</p>}
//             </div>

//             <Button type="submit" fullWidth loading={loading} style={{ marginTop: 8 }}>
//               Sign In
//             </Button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { Button } from "@/components/ui/Button";
import "@/styles/pages/auth.css";

export default function LoginPage() {
  
  const router = useRouter();
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") ?? "/";

  const captchaRef = useRef<HCaptcha | null>(null);

  const [form, setForm] = useState({ email: "", password: "" });
  const [captchaToken, setCaptchaToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!captchaToken) {
      setError("Please complete the captcha.");
      return;
    }

    setLoading(true);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      hcaptchaToken: captchaToken,
      redirect: false,
    });
    console.log("SIGNIN RESULT:", result);

    if (result?.error) {
      const err = result.error;

      if (err === "ACCOUNT_BANNED") {
        setError("Your account is banned. Please contact support.Admin@octupus.com");
      } else if (err === "ACCOUNT_DELETED") {
        setError("Your account is inactive.");
      } else if (err === "ACCOUNT_SUSPENDED") {
        setError("Your account is suspended. Please contact support.");
      } else if (err.startsWith("ACCOUNT_SUSPENDED_UNTIL:")) {
        const iso = err.split("ACCOUNT_SUSPENDED_UNTIL:")[1];
        const d = new Date(iso);
        setError(`Your account is suspended until ${d.toLocaleString()}.`);
      } else if (err === "HCAPTCHA_REQUIRED") {
        setError("Please complete the captcha.");
      } else if (err === "HCAPTCHA_FAILED") {
        setError("Captcha verification failed. Please try again.");
      } else {
        setError("Invalid email or password");
      }

      setCaptchaToken("");
      captchaRef.current?.resetCaptcha();
      setLoading(false);
      return;
    }

    router.push(callbackUrl);
  }

  return (
    <div className="auth-page">
      <div className="auth-page__visual">
        <div className="auth-page__visual-bg" />
        <div className="auth-page__visual-grid" />
        <div className="auth-page__visual-content">
          <p className="auth-page__visual-logo">Octu<span>pus</span></p>
          <p className="auth-page__visual-tagline">
            The marketplace where talent meets opportunity.
          </p>
        </div>
      </div>

      <div className="auth-page__form-side">
        <div className="auth-form">
          <h1 className="auth-form__title">Welcome back</h1>
          <p className="auth-form__subtitle">
            No account yet?{" "}
            <Link href="/register">Create one for free</Link>
          </p>

          <button
            className="auth-google-btn"
            onClick={() => signIn("google", { callbackUrl })}
            type="button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="auth-divider">or</div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                className={`form-input ${error ? "form-input--error" : ""}`}
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
                className={`form-input ${error ? "form-input--error" : ""}`}
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div className="form-group" style={{ marginTop: 12 }}>
              <HCaptcha
                ref={captchaRef}
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || ""}
                onVerify={(token) => {
                  setCaptchaToken(token);
                  setError("");
                }}
                onExpire={() => {
                  setCaptchaToken("");
                }}
                onError={() => {
                  setCaptchaToken("");
                  setError("Captcha could not be loaded.");
                }}
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <Button
              type="submit"
              fullWidth
              loading={loading}
              disabled={loading || !captchaToken}
              style={{ marginTop: 8 }}
            >
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}