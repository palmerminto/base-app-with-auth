"use client";

import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/navigation";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  const handleAuth = async () => {
    if (!auth) {
      throw new Error("Firebase auth is not initialized");
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/a"); // Redirect on login
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/a"); // Redirect on signup
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePasswordReset = async () => {
    setError(null);
    setMessage(null);

    if (!auth) {
      throw new Error("Firebase auth is not initialized");
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      {!showResetPassword ? (
        <>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
          <button
            onClick={handleAuth}
            style={{ display: "block", width: "100%" }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
          {isLogin && (
            <button
              onClick={() => setShowResetPassword(true)}
              style={{
                marginTop: "10px",
                background: "none",
                color: "blue",
                cursor: "pointer",
                border: "none",
              }}
            >
              Forgot Password?
            </button>
          )}
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                border: "none",
                background: "none",
                color: "blue",
                cursor: "pointer",
              }}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </>
      ) : (
        <>
          <h1>Reset Password</h1>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
          <button
            onClick={handlePasswordReset}
            style={{ display: "block", width: "100%" }}
          >
            Send Reset Email
          </button>
          <button
            onClick={() => setShowResetPassword(false)}
            style={{
              marginTop: "10px",
              background: "none",
              color: "blue",
              cursor: "pointer",
              border: "none",
            }}
          >
            Back to Login
          </button>
        </>
      )}
    </div>
  );
};

export default AuthPage;
