import pool from '../database/connection.js';
import  sendWebhook  from './webhook.js';

export const createJob = async (taskName, priority, payload) => {
  const [result] = await pool.execute(
    'INSERT INTO jobs (taskName, priority, payload, status) VALUES (?, ?, ?, ?)',
    [taskName, priority, JSON.stringify(payload), 'pending']
  );

  return { id: result.insertId, taskName, priority, payload, status: 'pending' };
}

export const getJobs = async (filters = {}) => {
  let query = 'SELECT * FROM jobs WHERE 1=1';
  const params = [];

  if (filters.status) {
    query += ' AND status = ?';
    params.push(filters.status);
  }

  const [rows] = await pool.execute(query, params);
  return rows;
}

export const getJobById = async (id) => {
  const [rows] = await pool.execute('SELECT * FROM jobs WHERE id = ?', [id]);
  return rows[0];
}

export const runJob = async (id) => {
  const job = await getJobById(id);
  if (!job) throw new Error('Job not found');

  // Update status to running
  await pool.execute('UPDATE jobs SET status = ? WHERE id = ?', ['running', id]);
  console.log(`🚀 Job ${id} started`);

  // Simulate processing
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Update status to completed
  const completedAt = new Date();
  await pool.execute(
    'UPDATE jobs SET status = ?, completedAt = ? WHERE id = ?',
    ['completed', completedAt, id]
  );

  const updatedJob = await getJobById(id);
  console.log(`✅ Job ${id} completed`);

  // Send webhook
  await sendWebhook(updatedJob);

  return updatedJob;
}
export default {
  createJob,
  getJobs,
  getJobById,
  runJob,
};