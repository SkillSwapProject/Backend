const jwt = require('jsonwebtoken');

const SECRET_KEY = "your_secret_key"; // ודא שזה תואם ליצירת הטוקן

function getLoggedInUserDetails(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    console.error("JWT Error:", err.message);
    return null;
  }
}

// Middleware שמכניס את פרטי המשתמש לתוך req
function authenticateUser(req, res, next) {
  const userDetails = getLoggedInUserDetails(req);
  if (userDetails) {
    req.user = userDetails;  // שמירת פרטי המשתמש בבקשה
    next(); // מעבר לפונקציה הבאה
  } else {
    res.status(401).json({ message: 'Unauthorized - Invalid or missing token' });
  }
}

module.exports = { getLoggedInUserDetails, authenticateUser };
