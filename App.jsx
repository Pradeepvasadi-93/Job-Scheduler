// src/App.js
import React, { useState, useEffect } from "react";
import { jobsAPI } from "./services/api";
import StatisticsCards from "./Components/StatisticsCards";
import Filters from "./Components/Filters";
import JobTable from "./Components/JobTable";
import JobDetailPanel from "./Components/JobDetailsPanel";
import CreateJobModal from "./Components/CreateJobModal";

// Sample jobs for initial testing
const sampleJobs = [
  {
    id: 1,
    taskName: "Nightly Database Backup",
    priority: "High",
    status: "pending",
    createdAt: "2026-01-29T20:00:00Z",
    completedAt: null,
    payload: {
      database: "prod_db",
      backupType: "full",
      destination: "/backups/prod_db_2026_01_29.sql",
    },
  },
  {
    id: 2,
    taskName: "Send Weekly Newsletter",
    priority: "Medium",
    status: "completed",
    createdAt: "2026-01-28T08:30:00Z",
    completedAt: "2026-01-28T08:33:00Z",
    payload: {
      templateId: "newsletter_2026_w4",
      recipients: ["marketing_list"],
      schedule: "immediate",
    },
  },
  {
    id: 3,
    taskName: "Generate Sales Report",
    priority: "Low",
    status: "running",
    createdAt: "2026-01-29T19:45:00Z",
    completedAt: null,
    payload: {
      reportType: "monthly",
      region: "South Asia",
      format: "PDF",
    },
  },
];

export default function App() {
  const [jobs, setJobs] = useState(sampleJobs);
  const [filters, setFilters] = useState({ status: "", priority: "" });
  const [selectedJob, setSelectedJob] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // helper to apply filters consistently
  const applyFilters = (jobsList) => {
    return jobsList.filter((job) => {
      const statusMatch = filters.status
        ? job.status.toLowerCase() === filters.status.toLowerCase()
        : true;
      const priorityMatch = filters.priority
        ? job.priority.toLowerCase() === filters.priority.toLowerCase()
        : true;
      return statusMatch && priorityMatch;
    });
  };

  // Fetch jobs whenever filters change
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await jobsAPI.getJobs(filters);
        const merged = [...sampleJobs, ...(data || [])];
        setJobs(applyFilters(merged));
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setJobs(applyFilters(sampleJobs));
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [filters]);


  // Stats for dashboard cards
  const stats = {
    total: jobs.length,
    pending: jobs.filter((j) => j.status === "pending").length,
    running: jobs.filter((j) => j.status === "running").length,
    completed: jobs.filter((j) => j.status === "completed").length,
  };

  // Run job handler
  const handleRunJob = async (id) => {
    try {
      await jobsAPI.runJob(id);
      const data = await jobsAPI.getJobs(filters);
      setJobs(data);
    } catch (err) {
      console.error("Error running job:", err);
      alert("Failed to run job");
    }
  };

  // Delete job handler
  const handleDeleteJob = async (id) => {
  try {
    await jobsAPI.deleteJob(id);
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== id));
  } catch (err) {
    console.error("Error deleting job:", err);
    alert("Failed to delete job");
  }
  };


  // Create job handler
  const handleCreateJob = async (jobData) => {
    try {
      await jobsAPI.createJob(jobData);
      const data = await jobsAPI.getJobs(filters);
      setJobs([...jobs, ...data]);
    } catch (err) {
      console.error("Error creating job:", err);
      alert("Failed to create job");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] p-6">
      <h1 className="text-3xl font-bold mb-6 text-[var(--color-text-primary)]">
        Job Scheduler Dashboard
      </h1>

      {/* Statistics */}
      <StatisticsCards stats={stats} />

      {/* Filters + Create Job */}
      <div className="flex justify-between items-center mb-6">
        <Filters filters={filters} setFilters={setFilters} />
        <button
          onClick={() => setShowCreateForm(true)}
          className="bg-[var(--color-accent)] text-black px-4 py-2 rounded hover:opacity-90"
        >
          + Create Job
        </button>
      </div>

      {/* Jobs Table */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <JobTable
          jobs={jobs}
          onSelectJob={setSelectedJob}
          onRunJob={handleRunJob}
          onDeleteJob={handleDeleteJob}
        />
      )}

      {/* Job Detail Panel */}
      <JobDetailPanel job={selectedJob} onClose={() => setSelectedJob(null)} />

      {/* Create Job Modal */}
      {showCreateForm && (
        <CreateJobModal
          onClose={() => setShowCreateForm(false)}
          onCreate={handleCreateJob}
        />
      )}
    </div>
  );
}