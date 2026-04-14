import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  simulatePasswordReset,
  resetAuthStatus,
} from "../store/slices/userSlice";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

function ForgotPassword () {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { forgotPasswordStatus, authError } = useSelector(
    (state) => state.user,
  );

  // Cleanup status when user leaves the page
  useEffect(() => {
    return () => dispatch(resetAuthStatus());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(simulatePasswordReset(email));
  };

  if (forgotPasswordStatus === "succeeded") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-zinc-950">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm dark:bg-zinc-900">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/20">
              <CheckCircle className="h-10 w-10 text-[#00C950]" />
            </div>
          </div>
          <h2 className="text-center text-2xl font-bold dark:text-white">
            Check your email
          </h2>
          <p className="mt-4 text-center text-gray-500 dark:text-zinc-400">
            We've sent a password recovery link to <br />
            <span className="font-semibold text-gray-900 dark:text-zinc-200">
              {email}
            </span>
          </p>
          <Link
            to="/login"
            className="mt-8 block w-full rounded-2xl bg-[#00C950] py-4 text-center font-bold text-white transition-opacity hover:opacity-90"
          >
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm">
        <Link
          to="/login"
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#00C950]"
        >
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <h2 className="text-3xl font-extrabold text-gray-900">
          Forgot Password
        </h2>
        <p className="mt-2 text-gray-500">
          Enter the email address you used when you joined and we'll send you
          instructions to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                required
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-4 pl-12 pr-4 outline-none transition-all focus:border-[#00C950] focus:ring-4 focus:ring-[#00C950]/10"
              />
            </div>
          </div>

          {authError && (
            <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600 dark:bg-red-900/20 dark:text-red-400">
              {authError}
            </div>
          )}

          <button
            type="submit"
            disabled={forgotPasswordStatus === "loading"}
            className="w-full rounded-2xl bg-[#00C950] py-4 text-lg font-bold text-white shadow-lg shadow-[#00C950]/20 transition-all active:scale-[0.98] disabled:opacity-70"
          >
            {forgotPasswordStatus === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin" size={20} /> Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
