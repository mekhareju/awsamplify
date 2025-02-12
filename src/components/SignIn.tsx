import { useState } from "react";
import { signIn } from "aws-amplify/auth";
import { useNavigate, Link } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSignIn() {
    try {
      await signIn({ username: formData.email, password: formData.password });
      navigate("/dashboard"); // Navigate to Dashboard
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />
      <button onClick={handleSignIn}>Sign In</button>
      {error && <p className="error">{error}</p>}
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}
