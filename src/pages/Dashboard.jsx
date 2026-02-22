import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-400 mb-6">Dashboard</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-neon-blue hover:-translate-y-1 transition-all">
          <h3 className="text-lg font-semibold">Total Orders</h3>
          <p className="text-2xl font-bold text-blue-400">1,245</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-neon-blue hover:-translate-y-1 transition-all">
          <h3 className="text-lg font-semibold">Revenue</h3>
          <p className="text-2xl font-bold text-green-400">$54,320</p>
        </div>
        {/* <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-neon-blue hover:-translate-y-1 transition-all">
          <h3 className="text-lg font-semibold">Costumers</h3>
          <p className="text-2xl font-bold text-purple-400">3,210</p>
        </div>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-neon-blue hover:-translate-y-1 transition-all">
          <h3 className="text-lg font-semibold">Products</h3>
          <p className="text-2xl font-bold text-orange-400">872</p>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
