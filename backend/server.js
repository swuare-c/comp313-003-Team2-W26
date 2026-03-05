import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: "API is running." })
})

app.use("api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`API is running on port: ${PORT}.`)
})