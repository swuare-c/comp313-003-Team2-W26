import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: "API is running." })
})
app.post('/api/chat', (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // TEMP reply 
  return res.json({
    reply: {
      role: "assistant",
      content: `I hear you saying: "${message}". What part of that feels the hardest right now?`
    }
  });
});

app.listen(PORT, () => {
    console.log(`API is running on port: ${PORT}.`)
})