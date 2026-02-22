import React from "react";
import { Verify } from "./verify";
import { logout } from "./Logout";

const Navbar = () => {
  return (
  <>
    <Verify />
    <header className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-semibold text-blue-400">Panel</h1>
      <div className="flex items-center gap-4">
        <button onClick={logout} className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-neon-blue transition-all duration-300">
          Logout
        </button>
      </div>
    </header>
    </>
  );
};

export default Navbar;
