import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

export default function Register() {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Registered Data:", formData);
  };

  return (
    <div className="flex my-8 items-center justify-center text-white">
       <form
              onSubmit={handleSubmit}
        className="w-full py-20 max-w-md bg-[#BA4374] p-8 rounded-lg shadow-lg"
        style={{
            background : "rgba(186, 67, 116, 0.8)"
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
          className="w-full mt-6 p-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800"
        >
          Register
        </button>
        <p className="mt-4">Already have an account? <Link to="/login"
        className="text-[#BA4374] bg-black py-1 px-4 font-bold rounded-3xl"
        >Login</Link></p>
      </form>
    </div>
  );
}
