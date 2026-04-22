import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/forms/FormField";
import Button from "../components/ui/Button";
import { registerUser } from "../store/slices/userSlice";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Password Validation Logic
  const requirements = useMemo(
    () => [
      { label: "At least 8 characters", test: (pw) => pw.length >= 8 },
      { label: "Contains a number", test: (pw) => /\d/.test(pw) },
      {
        label: "Lowercase & Uppercase",
        test: (pw) => /[a-z]/.test(pw) && /[A-Z]/.test(pw),
      },
      {
        label: "Special character (@$!%*?&)",
        test: (pw) => /[@$!%*?&]/.test(pw),
      },
    ],
    [],
  );

  const validationResults = requirements.map((req) => ({
    label: req.label,
    isPassed: req.test(formData.password),
  }));

  const isPasswordStrong = validationResults.every((res) => res.isPassed);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isPasswordStrong) return; // Prevent submission if weak
    dispatch(registerUser(formData));
    navigate("/login");
  };

  const handleFieldChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the community of market scouts"
      footerText="Already have an account?"
      footerLinkTo="/login"
      footerLinkLabel="Log In"
      isWide={true}
      passwordValue={formData.password}
      validationResults={validationResults}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          required
          label="Full Name"
          value={formData.name}
          placeholder="e.g. John Doe"
          onChange={handleFieldChange("name")}
        />
        <FormField
          required
          type="email"
          label="Email Address"
          value={formData.email}
          placeholder="name@example.com"
          onChange={handleFieldChange("email")}
        />
        <FormField
          required
          label="Location (City, State)"
          value={formData.location}
          placeholder="e.g. Minna, Niger"
          onChange={handleFieldChange("location")}
        />
        <div className="relative">
          <FormField
            required
            type={showPassword ? "text" : "password"}
            label="Password"
            value={formData.password}
            placeholder="********"
            onChange={handleFieldChange("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-9.5 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Register;
