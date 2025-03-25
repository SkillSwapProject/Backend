const express = require('express');
const app = express();

// מדמה מסד נתונים של משתמשים
const users = {
  1: { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  2: { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
};

// מידלוור לאימות משתמשים (לדוגמה)
function authenticateUser(req, res, next) {
 
  req.userId = 1;
  next();
}

app.get('/user', authenticateUser, (req, res) => {
  const user = users[req.userId];
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});