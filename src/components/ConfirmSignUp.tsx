import { useState } from "react";
import { confirmSignUp, signIn } from "aws-amplify/auth";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function ConfirmSignUp() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email, password } = location.state || {}; // Get email and password from SignUp

  async function handleConfirmSignUp() {
    try {
      await confirmSignUp({ username: email, confirmationCode: code });
      // Auto Sign-In after confirmation using the actual password
      await signIn({ username: email, password });
      alert("Account verified and signed in!");
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="auth-container">
      <h2>Confirm Sign Up</h2>
      <input
        type="text"
        placeholder="Verification Code"
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleConfirmSignUp}>Confirm</button>
      {error && <p className="error">{error}</p>}
      <p>
        Already confirmed? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
}
