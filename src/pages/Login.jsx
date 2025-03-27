import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registered Data:", formData);
  };

  return (
    <div className="my-8 flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full py-20 max-w-md bg-[#BA4374] p-8 rounded-lg shadow-lg"
        style={{
            background : "rgba(186, 67, 116, 0.8)"
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-gray-300 text-black"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 text-black"
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
        </div>
        <button
          type="submit"
          className="w-full mt-6 p-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800"
        >
          Login
        </button>
        <p className="mt-8">Don't have an account? <Link to="/register" 
        className="text-[#BA4374] bg-black py-1 px-4 font-bold rounded-3xl">
        Register</Link> </p>
      </form>
    </div>
  );
}
