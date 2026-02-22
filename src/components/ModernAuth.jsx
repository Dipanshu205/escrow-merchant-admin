import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function MerchantAuth() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [token, setToken] = useState("");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const {email, password } = loginForm;
      const res = await axios.post(backendUrl + "/api/panel/login", {
        email,
        password,
      });
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/verification";
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const { fullName, email, password, phone, acc_no, ifsc, bank_name, branch } = signupForm;
      const res = await axios.post(backendUrl + "/api/panel/register", {
        fullName,
        email,
        password
      });
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/verification";
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-900 p-4">

      {/* Background Animated Shapes */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/40 blur-[200px] rounded-full top-[-200px] left-[-200px] animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] bg-blue-600/40 blur-[200px] rounded-full bottom-[-200px] right-[-200px] animate-pulse"></div>

      {/* WRAPPER (200% width for slide effect) */}
      <div
        className="
          relative w-full max-w-5xl h-[550px] 
          bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden
        "
      >
        {/* SLIDER CONTAINER */}
        <div
          className="flex h-full transition-all duration-700"
          style={{
            width: "200%",
            transform: mode === "signup" ? "translateX(-50%)" : "translateX(0)",
          }}
        >
          {/* LOGIN PANEL */}
          <div className="w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-8">Login</h2>

            <form onSubmit={handleLoginSubmit}  >
              <div className="relative mb-6">
                <input
                  type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                  required
                  className="w-full bg-transparent border-b border-white/40 text-white p-2 focus:outline-none"
                />
                <label className="absolute top-[-12px] left-0 text-white text-sm">
                  Email
                </label>
                <FaUser className="absolute right-0 top-3 text-white" />
              </div>

              <div className="relative mb-8">
                <input
                  type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                  required
                  className="w-full bg-transparent border-b border-white/40 text-white p-2 focus:outline-none"
                />
                <label className="absolute top-[-12px] left-0 text-white text-sm">
                  Password
                </label>
                <FaLock className="absolute right-0 top-3 text-white" />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-bluele-700 text-white py-3 rounded-lg transition"
              >
                Login
              </button>

              <p className="text-white mt-6 text-center">
                Don’t have an account?
                <br />
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-blue-300 underline mt-2"
                >
                  Sign Up
                </button>
              </p>
            </form>
          </div>

          {/* SIGNUP PANEL */}
          <div className="w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-white mb-8">Register</h2>

            <form onSubmit={handleSignupSubmit} autoComplete="off">
              <div className="relative mb-6">
                <input
                  type={"text"}
                    name={"fullName"}
                    value={signupForm["Full Name"]}
                    onChange={handleSignupChange}
                  required
                  className="w-full bg-transparent border-b border-white/40 text-white p-2 focus:outline-none"
                />
                <label className="absolute top-[-12px] left-0 text-white text-sm">
                  Username
                </label>
                <FaUser className="absolute right-0 top-3 text-white" />
              </div>

              <div className="relative mb-6">
                <input
                  type="email"
                  name={"email"}
                    value={signupForm["email"]}
                    onChange={handleSignupChange}
                  required
                  className="w-full bg-transparent border-b border-white/40 text-white p-2 focus:outline-none"
                />
                <label className="absolute top-[-12px] left-0 text-white text-sm">
                  Email
                </label>
                <FaEnvelope className="absolute right-0 top-3 text-white" />
              </div>

              <div className="relative mb-8">
                <input
                  type="password"
                  name={"password"}
                    value={signupForm["password"]}
                    onChange={handleSignupChange}
                  required
                  className="w-full bg-transparent border-b border-white/40 text-white p-2 focus:outline-none"
                />
                <label className="absolute top-[-12px] left-0 text-white text-sm">
                  Password
                </label>
                <FaLock className="absolute right-0 top-3 text-white" />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-purple-700 text-white py-3 rounded-lg transition"
              >
                Register
              </button>

              <p className="text-white mt-6 text-center">
                Already have an account?
                <br />
                <button
                  type="button"
                  onClick={() => setMode("signin")}
                  className="text-blue-300 underline mt-2"
                >
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>

      <p className="text-white mt-6">
        Powered by{" "}
        <a href="#" className="underline">
          Shark Pay
        </a>
      </p>
    </div>
  );
}
