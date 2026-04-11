import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Btn from "../components/Btn";
import { loginUser } from "../store/slices/userSlice";
import Navigation from "../components/Navigation";

function Login() {
  // 1. Capture both Email and Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // 2. USE THE DATA: Pull the registered user from LocalStorage
    const usersDb = JSON.parse(localStorage.getItem("naijaprice_users_db"));

    const user = usersDb.find(
      (u) => u.email === email && u.password === password,
    );

    // 3. VALIDATION LOGIC
    if (user) {
      dispatch(loginUser(user));

      // REDIRECT LOGIC:
      // If the user has the admin role, send them straight to the dashboard
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />
      <div className="w-full flex flex-col gap-4 mt-14 lg:mt-0 md:ml-64 overflow-y-auto">
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
          <div className="w-full max-w-md flex flex-col gap-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Welcome Back</h1>
              <p className="text-gray-500 mt-2">Sign in to continue scouting</p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              {error && (
                <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">Email Address</label>
                <input
                  required
                  type="email"
                  value={email}
                  className="p-3 border-2 border-gray-100 rounded-xl outline-none focus:border-[#00C950] transition-all"
                  placeholder="yourname@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  className="p-3 border-2 border-gray-100 rounded-xl outline-none focus:border-[#00C950] transition-all"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-2">
                <Btn btnText="Log In" type="submit" />
              </div>
            </form>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="text-[#00C950] font-bold">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
