import jobService from '../services/jobService.js';

export const createJob = async (req, res) => {
  try {
    const { taskName, priority, payload } = req.body;
    if (!taskName || !priority) {
      return res
        .status(400)
        .json({ success: false, message: 'taskName and priority are required' });
    }

    const job = await jobService.createJob(taskName, priority, payload);
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to create job' });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await jobService.getJobs(req.query);
    res.json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch jobs' });
  }
};

export const getJobById = async (req, res) => {
  try {
    const job = await jobService.getJobById(req.params.id);
    if (!job) {
      return res
        .status(404)
        .json({ success: false, message: 'Job not found' });
    }
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch job' });
  }
};

export const runJob = async (req, res) => {
  try {
    const job = await jobService.runJob(req.params.id);
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export default {
  createJob,
  getJobs,
  getJobById,
  runJob,
};