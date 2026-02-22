import { useNavigate } from "react-router-dom";

// export const logout = () => {
//   const navigate = useNavigate
//     navigate("/auth");
//     localStorage.removeItem("token");
//     setToken("");
//   };

// Logout.js
// Logout.js
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/auth"; // force redirect
};
