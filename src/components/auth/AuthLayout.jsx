import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AppShell from "../layout/AppShell";
import Card from "../ui/Card";

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkTo,
  footerLinkLabel,
}) {
  const MotionHeading = motion.h1;

  return (
    <AppShell contentClassName="flex min-h-screen items-center justify-center bg-white px-4 py-10">
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
    </AppShell>
  );
}

export default AuthLayout;
