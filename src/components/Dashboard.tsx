import { useState, useEffect } from "react";
import { signOut, getCurrentUser } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getCurrentUser();
        setUserEmail(user.signInDetails?.loginId || "User");
      } catch {
        navigate("/signin"); // Redirect to Sign In if not logged in
      }
    }
    fetchUser();
  }, [navigate]);

  async function handleSignOut() {
    await signOut();
    navigate("/signin"); // Redirect to Sign In after sign out
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {userEmail}!</h1>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}
