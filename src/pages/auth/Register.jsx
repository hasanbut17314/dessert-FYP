import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Link } from "react-router";
import { apiService } from "../../lib/axios"
import { toast } from "sonner";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill all fields!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      await apiService.post("/user/register", formData, { withAuth: false });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      toast.success("Registration successful! Please check your email to verify your account.");
    } catch (error) {
      console.error(error);
      if (error.response?.status === 403) {
        toast.error(error.response.data.message || "Invalid Email! Please provide a valid email.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex my-5 sm:my-7 mx-3 items-center sm:min-h-screen min-h-[90vh] justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full py-14 max-w-md bg-[#BA4374] p-8 rounded-lg shadow-lg"
        style={{
          background: "rgba(186, 67, 116, 0.8)"
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 rounded-lg text-black"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 rounded-lg text-black border border-gray-300"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg text-black border border-gray-300"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg text-black border border-gray-300"
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-lg text-black border border-gray-300 "
              required
            />
            <button
              type="button"
              className="absolute right-3 top-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 p-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800"
        >
          {loading ? <Loader className="animate-spin mx-auto" /> : "Register"}
        </button>
        <p className="mt-4">Already have an account? <Link to="/login"
          className="text-[#BA4374] bg-black py-1 px-4 font-bold rounded-3xl"
        >Login</Link></p>
      </form>
    </div>
  );
}
