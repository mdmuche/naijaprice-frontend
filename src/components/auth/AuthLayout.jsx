import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Card from "../ui/Card";
import { Check, X } from "lucide-react";

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkTo,
  footerLinkLabel,
  isWide = false,
  validationResults = [],
  passwordValue = "",
}) {
  const MotionHeading = motion.h1;

  // Progress logic
  const passedCount = validationResults.filter((r) => r.isPassed).length;
  const totalCount = validationResults.length;
  const isPasswordStrong = totalCount > 0 && passedCount === totalCount;

  return (
    <AppShell
      contentClassName={`flex min-h-screen items-center justify-center bg-white px-4 py-10 ${
        isWide
          ? "flex-col lg:flex-row lg:items-center lg:gap-12 lg:max-w-6xl mx-auto"
          : "flex-col"
      }`}
    >
      <Card className="w-full max-w-md" padding="lg">
        <div className="space-y-2 text-center">
          <MotionHeading
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.24 }}
            className="text-3xl font-bold tracking-tight text-gray-900"
          >
            {title}
          </MotionHeading>
          <p className="text-sm text-gray-500 md:text-base">{subtitle}</p>
        </div>

        <div className="mt-8">{children}</div>

        <p className="mt-6 text-center text-sm text-gray-500">
          {footerText}{" "}
          <Link to={footerLinkTo} className="font-bold text-[#00C950]">
            {footerLinkLabel}
          </Link>
        </p>
      </Card>
      {/* Side Content - Only renders on Register because isWide is true there
       */}
      {isWide && validationResults.length > 0 && (
        <div className="w-full max-w-xs bg-white p-6 rounded-[32px] border border-gray-100 shadow-xl transition-all lg:mt-0 mt-8">
          <h3 className="text-sm font-bold text-gray-900 mb-4">
            Password Security
          </h3>
          <ul className="space-y-3">
            {validationResults.map((res, index) => (
              <li
                key={index}
                className={`flex items-center gap-3 text-sm transition-colors ${
                  passwordValue.length === 0
                    ? "text-gray-400"
                    : res.isPassed
                      ? "text-[#00C950]"
                      : "text-red-500"
                }`}
              >
                <div
                  className={`p-1 rounded-full ${
                    passwordValue.length === 0
                      ? "bg-gray-100"
                      : res.isPassed
                        ? "bg-[#00C950]/10"
                        : "bg-red-50"
                  }`}
                >
                  {res.isPassed ? <Check size={14} /> : <X size={14} />}
                </div>
                {res.label}
              </li>
            ))}
          </ul>

          <div className="mt-6 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${isPasswordStrong ? "bg-[#00C950]" : "bg-yellow-400"}`}
              style={{ width: `${(passedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      )}
    </AppShell>
  );
}

export default AuthLayout;
