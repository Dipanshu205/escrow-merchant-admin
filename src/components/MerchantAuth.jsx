import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function MerchantAuth() {
  // const { token, setToken, navigate, backendUrl } = useContext(Context);
  const navigate = useNavigate();
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [token, setToken] = useState("");

  const [loginForm, setLoginForm] = useState({
    merchantId: "",
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    acc_no: "",
    ifsc: "",
    bank_name: "",
    branch: "",
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
      const { merchantId, email, password } = loginForm;
      const res = await axios.post(backendUrl + "/api/panel/login", {
        merchantId,
        email,
        password,
      });
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
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
        password,
        phone,
        acc_no,
        ifsc,
        bank_name,
        branch,
        secretKey: "",
        signatureKey: ""
      });
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

//   useEffect(() => {
//   const savedToken = localStorage.getItem("token");
//   if (savedToken) {
//     setToken(savedToken);
//   }
// }, []); // empty dependency, only runs once


  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 px-4 py-6">
      <div className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl shadow-lg p-8">
        {/* Logo + Heading */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-blue-500 rounded-lg shadow-neon-blue flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-3">
            {mode === "signin" ? "Merchant Sign In" : "Create Merchant Account"}
          </h2>
          <p className="text-slate-400 text-sm">
            {mode === "signin"
              ? "Access your SecureMoney dashboard"
              : "Register your merchant account"}
          </p>
        </div>

        {/* Forms */}
        {mode === "signin" ? (
          <form onSubmit={handleLoginSubmit} className="space-y-5">
            <div>
              <label className="block text-slate-300 mb-1 text-sm">
                Merchant Id
              </label>
              <input
                type="text"
                name="merchantId"
                value={loginForm.merchantId}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Id"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="merchant@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-slate-300 mb-1 text-sm">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold text-white shadow-neon-blue transition-all duration-300 hover:shadow-neon-blue-lg"
            >
              Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit} className="space-y-5 ">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                ["fullName", "Full Name", "text", "Full Name"],
                ["email", "Email", "email", "Email"],
                ["password", "Password", "password", "••••••••"],
                ["phone", "Phone", "text", "XXXXX XXXXX"],
                ["acc_no", "Account Number", "text", "XXXXXXXXXXXXXXXX"],
                ["ifsc", "IFSC Code", "text", "_ _ _ _ _ _ _ _"],
                ["bank_name", "Bank Name", "text", "Bank Name"],
                ["branch", "Branch", "text", "Branch"],
              ].map(([name, label, type, placeholder], i) => (
                <div key={i} className={name === "branch" ? "sm:col-span-2" : ""}>
                  <label className="block text-slate-300 mb-2">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={signupForm[name]}
                    onChange={handleSignupChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-slate-800 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-neon-blue transition-all duration-300 hover:shadow-neon-blue-lg"
            >
              Create Account
            </button>
          </form>
        )}

        {/* Toggle */}
        <div className="flex justify-center mt-6 text-sm text-slate-400">
          {mode === "signin" ? (
            <p>
              Don’t have an account?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-blue-400 hover:text-blue-500 cursor-pointer"
              >
                Create Account
              </span>
            </p>
          ) : (
            <p>
              Already registered?{" "}
              <span
                onClick={() => setMode("signin")}
                className="text-blue-400 hover:text-blue-500 cursor-pointer"
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
