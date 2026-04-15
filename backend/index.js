import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import bookRouter from './routes/book.route.js';
import userRouter from './routes/user.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS FIX (PRODUCTION READY)
app.use(cors({
  origin: "https://own-web-frontend.onrender.com",
  credentials: true
}));

app.use(express.json());

// routes
app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);

// test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// DB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));