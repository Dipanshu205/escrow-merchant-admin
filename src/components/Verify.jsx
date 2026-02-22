// // verify.js
import { useEffect } from "react";
import axios from "axios";

export const Verify = () => {

  useEffect(() => {
    const token = localStorage.getItem("token"); // stored after login
    if (!token) {
      window.location.href = "/auth"; // redirect if no token
    }
  }); // run once on mount

  return null; // no UI, just redirect logic
};


export const Verification = () => {

  useEffect( async() => {
    const res = await axios.get(backendUrl + "/api/panel/verify-token");

    if (!res) {
      window.location.href = "/auth"; // redirect if no token
    }
  }); // run once on mount

  return null;
}