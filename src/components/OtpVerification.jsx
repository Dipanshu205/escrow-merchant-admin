import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { Verify } from "./verify";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");


  // SEND OTP
  const sendOtp = async () => {
    try {
      if(token === null){
        toast.error("Please login again.");
      }
        const res = await axios.post(
        `${backendUrl}/api/panel/send-otp`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(token);
      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
      console.error(error);
    }
  };

  // VERIFY OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/panel/verify-otp`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (res.data.success) {
        toast.success("OTP verified successfully");
        navigate("/dashboard");
      } else {
        toast.error(res.data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Verify />

    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-900 p-4">
      {/* Background Animated Shapes */}
      <div className="absolute w-[600px] h-[600px] bg-blue-500/40 blur-[200px] rounded-full top-[-200px] left-[-200px] animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] bg-blue-600/40 blur-[200px] rounded-full bottom-[-200px] right-[-200px] animate-pulse"></div>

      {/* OTP CARD */}
      <div className="relative w-full max-w-md h-[420px] bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          OTP Verification
        </h2>

        <p className="text-white/70 text-sm text-center mb-8">
          Enter the 6-digit OTP sent to your registered email
        </p>

        <form onSubmit={verifyOtp}>
          <div className="relative mb-8">
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(e.target.value.replace(/\D/g, ""))
              }
              className="w-full text-center tracking-[0.5em] text-lg bg-transparent border-b border-white/40 text-white p-3 focus:outline-none"
              placeholder="______"
              required
            />
            <FaLock className="absolute right-0 top-4 text-white" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-60 text-white py-3 rounded-lg transition"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <button
          type="button"
          onClick={sendOtp}
          className="text-blue-300 underline text-sm mt-4 text-center"
        >
          Resend OTP
        </button>

        <button
          type="button"
          onClick={() => navigate("/auth")}
          className="text-blue-300 underline text-sm mt-4 text-center"
        >
          Back to Login
        </button>
      </div>

      <p className="text-white mt-6">
        Powered by{" "}
        <a href="#" className="underline">
          Shark Pay
        </a>
      </p>
    </div>
    </>
  );
}
