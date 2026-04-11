import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Btn from "../components/Btn";
import { registerUser } from "../store/slices/userSlice";
import Navigation from "../components/Navigation";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />
      <div className="w-full flex flex-col gap-4 mt-14 lg:mt-0 md:ml-64 overflow-y-auto">
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-black">Create Account</h1>
              <p className="text-gray-500 mt-2">
                Join the community of market scouts
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">Full Name</label>
                <input
                  required
                  className="p-3 border-2 border-gray-100 rounded-xl focus:border-[#00C950] outline-none transition-all"
                  placeholder="e.g. John Doe"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">Email Address</label>
                <input
                  required
                  type="email"
                  className="p-3 border-2 border-gray-100 rounded-xl focus:border-[#00C950] outline-none transition-all"
                  placeholder="name@example.com"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">
                  Location (City, State)
                </label>
                <input
                  required
                  className="p-3 border-2 border-gray-100 rounded-xl focus:border-[#00C950] outline-none transition-all"
                  placeholder="e.g. Minna, Niger"
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label className="text-sm font-bold">Password</label>
                <input
                  required
                  type="password"
                  className="p-3 border-2 border-gray-100 rounded-xl focus:border-[#00C950] outline-none transition-all"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="mt-4">
                <Btn btnText="Register" type="submit" />
              </div>
            </form>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                title="Login"
                to="/login"
                className="text-[#00C950] font-bold"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
