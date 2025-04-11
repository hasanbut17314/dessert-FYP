import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import { apiService } from "../../lib/axios";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields!");
      return;
    }
    if (!formData.email.includes("@")) {
      toast.error("Please provide a valid email!");
      return;
    }
    try {
      setLoading(true);
      const response = await apiService.post("/user/login", formData, { withAuth: false });
      console.log(response);
      const accessToken = response?.data?.data?.accessToken;
      const refreshToken = response?.data?.data?.refreshToken;
      const user = response?.data?.data?.user;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login successful!");
      const role = user?.role || "user";
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response?.status === 401) {
        toast.error(error.response.data.message || "Please Verify Your Email!");
      } else {
        toast.error("Invalid Credentials!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:my-0 my-5 mx-3 md:min-h-screen min-h-[90vh] flex items-center justify-center text-white">
      <form
        onSubmit={handleSubmit}
        className="w-full py-20 max-w-md bg-[#BA4374] p-8 rounded-lg shadow-lg"
        style={{
          background: "rgba(186, 67, 116, 0.8)"
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
          disabled={loading}
          className={`w-full mt-6 py-3 rounded-lg bg-black text-white font-bold transition duration-200 hover:bg-[#BA4374] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {loading ? <Loader className="animate-spin mx-auto" /> : "Login"}
        </button>
        <p className="mt-8">Don't have an account? <Link to="/register"
          className="text-[#BA4374] bg-black py-1 px-4 font-bold rounded-3xl">
          Register</Link> </p>
      </form>
    </div>
  );
}