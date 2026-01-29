import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


const sendWebhook = async (jobs) => {
  try {
    const payload = {
      event: 'job.completed',
      timestamp: new Date().toISOString(),
      data: jobs,
    };

    await axios.post(process.env.WEBHOOK_URL, payload);
    console.log('✅ Webhook sent:', payload);
    return { success: true };
  } catch (err) {
    console.error('❌ Webhook failed:', err.response?.data || err.message);
    return { success: false, error: err.message };
  }
};

export default sendWebhook;
