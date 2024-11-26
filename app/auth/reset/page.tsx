"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "@/lib/firebase";

const ResetPassword = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Get the reset code from the URL
  const query = new URLSearchParams(window.location.search);
  const oobCode = query.get("oobCode");

  const handlePasswordReset = async () => {
    if (!oobCode) {
      setError("Invalid or missing password reset code.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (!auth) {
        throw new Error("Firebase auth is not initialized");
      }

      // Verify the password reset code and get the user's email
      const verifiedEmail = await verifyPasswordResetCode(auth, oobCode);
      setEmail(verifiedEmail);

      // Confirm the password reset
      await confirmPasswordReset(auth, oobCode, newPassword);
      setMessage(
        "Password has been reset successfully. Redirecting to login..."
      );

      // Redirect to login page after a short delay
      setTimeout(() => router.push("/auth"), 1000);
    } catch (err: any) {
      setError(err.message || "Failed to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h1>Reset Password</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {!message && (
        <>
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
          <button
            onClick={handlePasswordReset}
            disabled={loading}
            style={{ display: "block", width: "100%" }}
          >
            {loading ? "Resetting Password..." : "Reset Password"}
          </button>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
