import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/forms/FormField";
import Button from "../components/ui/Button";
import { loginUser } from "../store/slices/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const usersDb = JSON.parse(localStorage.getItem("naijaprice_users_db")) || [];
    const user = usersDb.find(
      (entry) => entry.email === email && entry.password === password,
    );

    if (!user) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    dispatch(loginUser(user));
    navigate(user.role === "admin" ? "/admin" : "/profile");
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue scouting"
      footerText="Don't have an account?"
      footerLinkTo="/register"
      footerLinkLabel="Create one"
    >
      <form onSubmit={handleLogin} className="space-y-4">
        {error && (
          <p className="rounded-lg border border-red-100 bg-red-50 p-3 text-sm text-red-500">
            {error}
          </p>
        )}

        <FormField
          required
          type="email"
          label="Email Address"
          value={email}
          placeholder="yourname@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormField
          required
          type="password"
          label="Password"
          value={password}
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Login;
