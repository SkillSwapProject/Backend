import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const app = express();
const port = 8080;

// ייבוא קבצי הנתיבים
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const requestRoutes = require('./routes/requestRoutes');
const adminRoutes = require('./routes/adminRoutes');

// חיבור למונגוDB
mongoose.connect('mongodb://localhost:27017/skill-swap-db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Middleware גלובלי (לדוגמה, לטיפול ב-JSON)
app.use(express.json());

// חיבור ה-Routes לשרת
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);

// הגדרת route ברירת מחדל (אם צריך)
app.get('/', (req: Request, res: Response) => {
  res.send('Skill Swap API is running!');
});

// התחלת השרת
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});