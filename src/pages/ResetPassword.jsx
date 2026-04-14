import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Lock, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import { simulateResetSubmit } from "../store/slices/userSlice";

function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forgotPasswordStatus } = useSelector((state) => state.user);

  // For simulation, we'd usually get the email/token from the URL
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "user@example.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (formData.password.length < 6) {
      return setLocalError("Password must be at least 6 characters.");
    }
    if (formData.password !== formData.confirmPassword) {
      return setLocalError("Passwords do not match.");
    }

    const result = await dispatch(
      simulateResetSubmit({ email, newPassword: formData.password }),
    );
    if (simulateResetSubmit.fulfilled.match(result)) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-zinc-950">
        <Card className="w-full max-w-md text-center" padding="lg">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/20">
              <CheckCircle size={40} className="text-[#00C950]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold dark:text-white">
            Password Reset!
          </h2>
          <p className="mt-2 text-gray-500 dark:text-zinc-400">
            Your password has been updated successfully. You can now log in with
            your new password.
          </p>
          <Button
            className="mt-8 w-full py-4"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-zinc-950">
      <Card className="w-full max-w-md" padding="lg">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          New Password
        </h2>
        <p className="mt-2 text-gray-500 dark:text-zinc-400">
          Please enter a new password for{" "}
          <span className="text-gray-900 dark:text-gray-200 font-medium">
            {email}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* New Password */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-zinc-300">
              New Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-12 outline-none transition-all focus:border-[#00C950] focus:ring-4 focus:ring-[#00C950]/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-zinc-300">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 outline-none transition-all focus:border-[#00C950] focus:ring-4 focus:ring-[#00C950]/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                placeholder="••••••••"
              />
            </div>
          </div>

          {localError && (
            <div className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {localError}
            </div>
          )}

          <Button
            type="submit"
            className="w-full py-4 text-lg font-bold"
            disabled={forgotPasswordStatus === "loading"}
          >
            {forgotPasswordStatus === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} /> Updating...
              </span>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default ResetPassword;
