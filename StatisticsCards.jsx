import React from "react";

export default function StatisticsCards({ stats }) {
  const cards = [
    { label: "Total Jobs", value: stats.total, color: "bg-gray-200" },
    { label: "Pending", value: stats.pending, color: "bg-yellow-500 text-white" },
    { label: "Running", value: stats.running, color: "bg-blue-500 text-white" },
    { label: "Completed", value: stats.completed, color: "bg-green-500 text-white" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => (
        <div key={i} className={`p-4 rounded shadow hover:scale-105 transition ${card.color}`}>
          <h3 className="text-lg font-bold">{card.label}</h3>
          <p className="text-2xl">{card.value}</p>
        </div>
      ))}
    </div>
  );
}