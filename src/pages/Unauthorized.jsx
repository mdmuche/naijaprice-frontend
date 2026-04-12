import { Link } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";

function Unauthorized() {
  return (
    <AppShell contentClassName="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-md space-y-4 rounded-3xl border border-red-100 bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
        <p className="text-sm text-gray-500">
          You do not have permission to view this page.
        </p>
        <Link to="/" className="block">
          <Button className="w-full">Home</Button>
        </Link>
      </div>
    </AppShell>
  );
}

export default Unauthorized;
