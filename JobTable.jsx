import React from "react";
import { FaTrash } from "react-icons/fa"; // using react-icons for a trash icon

export default function JobTable({ jobs, onSelectJob, onRunJob, onDeleteJob }) {
  return (
    <table className="min-w-full border rounded-lg shadow bg-white">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2">ID</th>
          <th className="p-2">Task Name</th>
          <th className="p-2">Priority</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job, index) => (
          <tr
            key={job.id}
            className="border-t cursor-pointer hover:bg-gray-50"
            onClick={() => onSelectJob(job)}
          >
            <td className="px-4 py-3 text-center">{index+1}</td>
            <td className="px-4 py-3 text-center">{job.taskName}</td>
            <td className="px-4 py-3 text-center">{job.priority}</td>
            <td className="px-4 py-3 text-center">
              <span
                className={`px-2 py-1 rounded text-white ${
                  job.status === "pending"
                    ? "bg-yellow-500"
                    : job.status === "running"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              >
                {job.status}
              </span>
            </td>
            <td className="px-4 py-3 flex justify-around items-center">
              {job.status === "pending" && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRunJob(job.id);
                  }}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  Run
                </button>
              )}
            </td>
            <td>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteJob(job.id);
                }}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 h-7.5 flex items-center gap-1"
              >
                <FaTrash size={14} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}