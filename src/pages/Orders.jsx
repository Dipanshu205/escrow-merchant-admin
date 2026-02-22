import React from "react";

const Orders = () => {
  const orders = [
    { id: 1, product: "iPhone 15 Pro", amount: "$999", status: "Pending" },
    { id: 2, product: "MacBook Pro", amount: "$2499", status: "Completed" },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-blue-400 mb-6">Orders</h2>
      <table className="w-full text-left border border-slate-700 rounded-lg overflow-hidden">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            <th className="px-6 py-3">Order ID</th>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-t border-slate-700 hover:bg-slate-800"
            >
              <td className="px-6 py-3">{order.id}</td>
              <td className="px-6 py-3">{order.product}</td>
              <td className="px-6 py-3">{order.amount}</td>
              <td className="px-6 py-3 text-blue-400">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
