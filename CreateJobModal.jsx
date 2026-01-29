import React, { useState } from "react";

export default function CreateJobModal({ onClose, onCreate }) {
  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState("Low");
  const [payload, setPayload] = useState("{}");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    try {
      const parsedPayload = JSON.parse(payload);
      onCreate({ taskName, priority, payload: parsedPayload });
      onClose();
    } catch {
      setError("Invalid JSON payload");
    }
  };

  return (
    <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-300 p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Create Job</h2>
        <input
          type="text"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          rows="7"
          className="w-full border p-2 rounded font-mono mb-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}