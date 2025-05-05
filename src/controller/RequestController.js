const express = require('express');
const service = express();
const ServiceRequest = require('../models/servicereques'); // נניח שזה המודל של בקשת השירות
const requestModel = require('../models/user'); // נניח שזה המודל של המשתמש
const reques= {}

//שליחת בקשה להחלפת שירות

reques.requese = async (req, res) => {
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
        status: 'pending',
        contactDetails,
        requestDate: Date.now()
      });
      // 4. שמירת הבקשה במסד הנתונים
      const savedRequest = await newServiceRequest.save();
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

//קבלת כל הבקשות שלי
reques.getAll = async(req, res)=> {
    try {
        let data = await requestModel.find({})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500)
        res.send("<h1>error</h1>")
    }
}

//קבלת כל הבקשות
getUserServiceRequests: async (req, res) => {
    try {
      // 1. חילוץ מזהה המשתמש מהבקשה
      //    בהנחה ש middleware קודם הוסיף את פרטי המשתמש ל req.user
      const userId = req.user._id;

      // 2. שליפת בקשות השירות של המשתמש
      const serviceRequests = await ServiceRequest.find({ userId: userId });

      // 3. שליחת תגובה מוצלחת
      res.status(200).json(serviceRequests);
    } catch (error) {
      // 4. טיפול בשגיאות
      console.error('שגיאה בשליפת בקשות שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },

  //שליפת בקשה לפי מזהה

const requestServiceController = {
 
  getServiceRequestById: async (req, res) => {
    try {
      // 1. חילוץ מזהה הבקשה מהבקשה
      const requestId = req.params.requestId;

      // 2. שליפת בקשת השירות לפי המזהה
      const serviceRequest = await ServiceRequest.findById(requestId);

      // 3. טיפול במקרה שבו הבקשה לא נמצאה
      if (!serviceRequest) {
        return res.status(404).json({ message: 'בקשת שירות לא נמצאה' });
      }

      // 4. שליחת תגובה מוצלחת עם הבקשה
      res.status(200).json(serviceRequest);
    } catch (error) {
      // 5. טיפול בשגיאות
      console.error('שגיאה בשליפת בקשת שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },

  getUserServiceRequests: async (req, res) => {
    try {
      // 1. חילוץ מזהה המשתמש מהבקשה
      //    בהנחה ש middleware קודם הוסיף את פרטי המשתמש ל req.user
      const userId = req.user._id;

      // 2. שליפת בקשות השירות של המשתמש
      const serviceRequests = await ServiceRequest.find({ userId: userId });

      // 3. שליחת תגובה מוצלחת
      res.status(200).json(serviceRequests);
    } catch (error) {
      // 4. טיפול בשגיאות
      console.error('שגיאה בשליפת בקשות שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },
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
};


//אישור בקשה

approveServiceRequest: async (req, res) => {
    try {
      // 1. חילוץ מזהה הבקשה מהבקשה
      const requestId = req.params.requestId;

      // 2. שליפת בקשת השירות
      const serviceRequest = await ServiceRequest.findById(requestId);

      // 3. טיפול במקרה שבו הבקשה לא נמצאה
      if (!serviceRequest) {
        return res.status(404).json({ message: 'בקשת שירות לא נמצאה' });
      }

      // 4. בדיקה שהמשתמש המחובר הוא בעל השירות
      //    בהנחה ש req.user מכיל את פרטי המשתמש המחובר
      //    ושבקשת השירות יש שדה serviceProviderId
      if (serviceRequest.serviceProviderId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'אינך מורשה לאשר בקשה זו' });
      }

      // 5. עדכון סטטוס הבקשה ל'approved'
      serviceRequest.status = 'approved';
      const updatedRequest = await serviceRequest.save();

      // 6. שליחת תגובה מוצלחת
      res.status(200).json({ message: 'בקשת שירות אושרה', updatedRequest });
    } catch (error) {
      // 7. טיפול בשגיאות
      console.error('שגיאה באישור בקשת שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },

 // דחית בקשה
  rejectServiceRequest: async (req, res) => {
    try {
      // 1. חילוץ מזהה הבקשה מהבקשה
      const requestId = req.params.requestId;

      // 2. שליפת בקשת השירות
      const serviceRequest = await ServiceRequest.findById(requestId);

      // 3. טיפול במקרה שבו הבקשה לא נמצאה
      if (!serviceRequest) {
        return res.status(404).json({ message: 'בקשת שירות לא נמצאה' });
      }

      // 4. בדיקה שהמשתמש המחובר הוא בעל השירות
      //    בהנחה ש req.user מכיל את פרטי המשתמש המחובר
      //    ושבקשת השירות יש שדה serviceProviderId
      if (serviceRequest.serviceProviderId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'אינך מורשה לדחות בקשה זו' });
      }

      // 5. עדכון סטטוס הבקשה ל'rejected'
      serviceRequest.status = 'rejected';
      const updatedRequest = await serviceRequest.save();

      // 6. שליחת תגובה מוצלחת
      res.status(200).json({ message: 'בקשת שירות נדחתה', updatedRequest });
    } catch (error) {
      // 7. טיפול בשגיאות
      console.error('שגיאה בדחיית בקשת שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },

  //מחיקת בקשה עי המשתמש

  deleteServiceRequest: async (req, res) => {
    try {
      // 1. חילוץ מזהה הבקשה מהבקשה
      const requestId = req.params.requestId;

      // 2. שליפת בקשת השירות
      const serviceRequest = await ServiceRequest.findById(requestId);

      // 3. טיפול במקרה שבו הבקשה לא נמצאה
      if (!serviceRequest) {
        return res.status(404).json({ message: 'בקשת שירות לא נמצאה' });
      }

      // 4. בדיקה שהמשתמש המחובר הוא זה שיצר את הבקשה
      //    בהנחה ש req.user מכיל את פרטי המשתמש המחובר
      //    ושבקשת השירות יש שדה userId
      if (serviceRequest.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'אינך מורשה למחוק בקשה זו' });
      }

      // 5. מחיקת הבקשה
      const deletedRequest = await ServiceRequest.findByIdAndDelete(requestId);

      // 6. שליחת תגובה מוצלחת
      res.status(200).json({ message: 'בקשת שירות נמחקה בהצלחה', deletedRequest });
    } catch (error) {
      // 7. טיפול בשגיאות
      console.error('שגיאה במחיקת בקשת שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },

module.exports = reques