import React from "react";

export default function JobDetailPanel({ job, onClose }) {
  if (!job) return null;

  return (
    <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg p-6 animate-slide-in">
      <button onClick={onClose} className="text-red-500 mb-4">Close</button>
      <h2 className="text-xl font-bold mb-2">{job.taskName}</h2>
      <p>Status: {job.status}</p>
      <p>Priority: {job.priority}</p>
      <p>Created: {job.createdAt}</p>
      <p>Completed: {job.completedAt || "N/A"}</p>
      <pre className="bg-gray-100 p-4 rounded mt-4 font-mono text-sm">
        {JSON.stringify(job.payload, null, 2)}
      </pre>
    </div>
  );
}