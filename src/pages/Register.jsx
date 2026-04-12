import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import FormField from "../components/forms/FormField";
import Button from "../components/ui/Button";
import { registerUser } from "../store/slices/userSlice";

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

        <FormField
          required
          type="password"
          label="Password"
          value={formData.password}
          placeholder="********"
          onChange={handleFieldChange("password")}
        />

        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </AuthLayout>
  );
}

export default Register;
