import { Link } from "react-router-dom";
import AppShell from "../layout/AppShell";

function AuthLayout({
  title,
  subtitle,
  children,
  footerText,
  footerLinkTo,
  footerLinkLabel,
}) {
  return (
    <AppShell contentClassName="flex min-h-screen items-center justify-center bg-white p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-black">{title}</h1>
          <p className="text-gray-500">{subtitle}</p>
        </div>

        {children}

        <p className="text-center text-sm text-gray-500">
          {footerText}{" "}
          <Link to={footerLinkTo} className="font-bold text-[#00C950]">
            {footerLinkLabel}
          </Link>
        </p>
      </div>
    </AppShell>
  );
}

export default AuthLayout;
