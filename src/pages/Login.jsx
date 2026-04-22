import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/forms/FormField";
import Button from "../components/ui/Button";
import { loginUser } from "../store/slices/userSlice";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usersList = useSelector((state) => state.user.usersList);
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const user = usersList.find(
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
        <div className="relative">
          <FormField
            required
            type={showPassword ? "text" : "password"}
            label="Password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-9.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex justify-end mt-2">
          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-[#00C950] hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Login;
