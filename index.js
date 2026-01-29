import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';    

import jobRoutes from './routes/jobRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());


// Health check
app.get('/health', (req, res) => res.json({ success: true, message: 'API is healthy' }));

// Routes
app.use('/api', jobRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});