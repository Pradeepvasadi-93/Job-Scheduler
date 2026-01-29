import express from 'express';
const router = express.Router();
import jobController from '../controllers/jobController.js';

router.post('/jobs', jobController.createJob);
router.get('/jobs', jobController.getJobs);
router.get('/jobs/:id', jobController.getJobById);
router.post('/run-job/:id', jobController.runJob);

export default router;