import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8080;

// חיבור למונגוDB
mongoose.connect('mongodb://localhost:27017/skill-swap-db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// הגדרת route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// התחלת השרת
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});