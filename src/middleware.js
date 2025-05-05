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



//requests
const ServiceRequest = require('../models/serviceRequestModel'); // נניח שזה המודל של בקשת השירות
const User = require('../models/userModel'); // נניח שזה המודל של המשתמש

const requestServiceController = {
  /**
   * פונקציה לטיפול בבקשה להחלפת שירות באמצעות POST.
   *
   * @param {object} req - אובייקט הבקשה של Express.
   * @param {object} res - אובייקט התגובה של Express.
   * @returns {Promise<void>} - הבטחה שלא מחזירה ערך.
   */
  requestService: async (req, res) => {
    try {
      // 1. חילוץ נתונים מהבקשה
      const { userId, serviceType, description, contactDetails } = req.body;

      // 2. בדיקת קיום משתמש
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: 'משתמש לא קיים' });
      }

      // 3. יצירת בקשת שירות חדשה
      const newServiceRequest = new ServiceRequest({
        userId: user._id, // שמירת ה-ObjectId של המשתמש
        serviceType,
        description,
        status: 'pending', // סטטוס התחלתי
        contactDetails,
        requestDate: Date.now()
      });

      // 4. שמירת הבקשה במסד הנתונים
      const savedRequest = await newServiceRequest.save();

      // 5. שליחת תגובה מוצלחת
      res.status(201).json({
        message: 'בקשת שירות נוצרה בהצלחה',
        requestId: savedRequest._id, // החזרת ה-ID של הבקשה שנוצרה
      });
    } catch (error) {
      // 6. טיפול בשגיאות
      console.error('שגיאה ביצירת בקשת שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },

        }

        module.exports = { getLoggedInUserDetails, authenticateUser };
