import React from "react";

export default function Filters({ filters, setFilters }) {
  return (
    <div className="flex gap-4 mb-6">
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="running">Running</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
        className="border p-2 rounded"
      >
        <option value="">All Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
}