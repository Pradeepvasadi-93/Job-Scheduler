import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

console.log("API URL:", API_URL);

export const jobsAPI = {
  createJob: async (jobData) => {
    const res = await axios.post(`${API_URL}/jobs`, jobData);
    return res.data.data;
  },
  getJobs: async (filters) => {
    const res = await axios.get(`${API_URL}/jobs`, { params: filters });
    return res.data.data;
  },
  getJobById: async (id) => {
    const res = await axios.get(`${API_URL}/jobs/${id}`);
    return res.data.data;
  },
  runJob: async (id) => {
    const res = await axios.post(`${API_URL}/run-job/${id}`);
    return res.data.data;
  }
};