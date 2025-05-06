const express = require('express');
const service = express();
const ServiceRequestt = require('../models/serviceRequest'); // נניח שזה המודל של בקשת השירות
const RequesttModel = require('../models/user'); // נניח שזה המודל של המשתמש
const Request= {}

//שליחת בקשה להחלפת שירות

Request.Requeste = async (req, res) => {
    try {
      // 1. חילוץ נתונים מהבקשה
      const { userId, serviceType, description, contactDetails } = req.body;
      // 2. בדיקת קיום משתמש
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: 'משתמש לא קיים' });
      }
      // 3. יצירת בקשת שירות חדשה
      const newServiceRequestt = new ServiceRequestt({
        userId: user._id, // שמירת ה-ObjectId של המשתמש
        serviceType,
        description,
        status: 'pending',
        contactDetails,
        RequesttDate: Date.now()
      });
      // 4. שמירת הבקשה במסד הנתונים
      const savedRequestt = await newServiceRequestt.save();
      res.status(201).json({
        message: 'בקשת שירות נוצרה בהצלחה',
        RequesttId: savedRequestt._id, // החזרת ה-ID של הבקשה שנוצרה
      });
    } catch (error) {
      // 6. טיפול בשגיאות
      console.error('שגיאה ביצירת בקשת שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },

//קבלת כל הבקשות שלי
Request.getAll = async(req, res)=> {
    try {
        let data = await RequesttModel.find({})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500)
        res.send("<h1>error</h1>")
    }
}

//קבלת כל הבקשות
Request.getUserServiceRequestts= async (req, res) => {
    try {
      // 1. חילוץ מזהה המשתמש מהבקשה
      //    בהנחה ש middleware קודם הוסיף את פרטי המשתמש ל req.user
      const userId = req.user._id;

      // 2. שליפת בקשות השירות של המשתמש
      const serviceRequestts = await ServiceRequestt.find({ userId: userId });

      // 3. שליחת תגובה מוצלחת
      res.status(200).json(serviceRequestts);
    } catch (error) {
      // 4. טיפול בשגיאות
      console.error('שגיאה בשליפת בקשות שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },
  //שליפת בקשה לפי מזהה
 
    Request.getServiceRequesttById= async (req, res) => {
    try {
      // 1. חילוץ מזהה הבקשה מהבקשה
      const RequesttId = req.params.RequesttId;

      // 2. שליפת בקשת השירות לפי המזהה
      const serviceRequestt = await ServiceRequestt.findById(RequesttId);

      // 3. טיפול במקרה שבו הבקשה לא נמצאה
      if (!serviceRequestt) {
        return res.status(404).json({ message: 'בקשת שירות לא נמצאה' });
      }
      // 4. שליחת תגובה מוצלחת עם הבקשה
      res.status(200).json(serviceRequestt);
    } catch (error) {
      // 5. טיפול בשגיאות
      console.error('שגיאה בשליפת בקשת שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  

    Request.getUserServiceRequestts = async (req, res) => {
    try {
      // 1. חילוץ מזהה המשתמש מהבקשה
      //    בהנחה ש middleware קודם הוסיף את פרטי המשתמש ל req.user
      const userId = req.user._id;
      // 2. שליפת בקשות השירות של המשתמש
      const serviceRequestts = await ServiceRequestt.find({ userId: userId });
      // 3. שליחת תגובה מוצלחת
      res.status(200).json(serviceRequestts);
    } catch (error) {
      // 4. טיפול בשגיאות
      console.error('שגיאה בשליפת בקשות שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },
 
  Request.RequesttService = async (req, res) => {
    try {
      // 1. חילוץ נתונים מהבקשה
      const { userId, serviceType, description, contactDetails } = req.body;

      // 2. בדיקת קיום משתמש
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).json({ message: 'משתמש לא קיים' });
      }

      // 3. יצירת בקשת שירות חדשה
      const newServiceRequestt = new ServiceRequestt({
        userId: user._id, // שמירת ה-ObjectId של המשתמש
        serviceType,
        description,
        status: 'pending', // סטטוס התחלתי
        contactDetails,
        RequesttDate: Date.now()
      });

      // 4. שמירת הבקשה במסד הנתונים
      const savedRequestt = await newServiceRequestt.save();

      // 5. שליחת תגובה מוצלחת
      res.status(201).json({
        message: 'בקשת שירות נוצרה בהצלחה',
        RequesttId: savedRequestt._id, // החזרת ה-ID של הבקשה שנוצרה
      });
    } catch (error) {
      // 6. טיפול בשגיאות
      console.error('שגיאה ביצירת בקשת שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },

//אישור בקשה
Request.approveServiceRequestt = async (req, res) => {
    try {
      // 1. חילוץ מזהה הבקשה מהבקשה
      const RequesttId = req.params.RequesttId;
      const serviceRequestt = await ServiceRequestt.findById(RequesttId);
      if (!serviceRequestt) {
        return res.status(404).json({ message: 'בקשת שירות לא נמצאה' });
      }
      if (serviceRequestt.serviceProviderId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'אינך מורשה לאשר בקשה זו' });
      }
      // 5. עדכון סטטוס הבקשה ל'approved'
      serviceRequestt.status = 'approved';
      const updatedRequestt = await serviceRequestt.save();
      // 6. שליחת תגובה מוצלחת
      res.status(200).json({ message: 'בקשת שירות אושרה', updatedRequestt });
    } catch (error) {
      // 7. טיפול בשגיאות
      console.error('שגיאה באישור בקשת שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },

 // דחית בקשה
 Request.rejectServiceRequestt = async (req, res) => {
    try {
      const RequesttId = req.params.RequesttId;
      const serviceRequestt = await ServiceRequestt.findById(RequesttId);     
      if (!serviceRequestt) {
        return res.status(404).json({ message: 'בקשת שירות לא נמצאה' });
      }
      if (serviceRequestt.serviceProviderId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'אינך מורשה לדחות בקשה זו' });
      }
      serviceRequestt.status = 'rejected';
      const updatedRequestt = await serviceRequestt.save();
      res.status(200).json({ message: 'בקשת שירות נדחתה', updatedRequestt });
    } catch (error) {
      console.error('שגיאה בדחיית בקשת שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },

  //מחיקת בקשה עי המשתמש

  Request.deleteServiceRequestt = async (req, res) => {
    try {
      const RequesttId = req.params.RequesttId;
      const serviceRequestt = await ServiceRequestt.findById(RequesttId);
      if (!serviceRequestt) {
        return res.status(404).json({ message: 'בקשת שירות לא נמצאה' });
      }
      if (serviceRequestt.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'אינך מורשה למחוק בקשה זו' });
      }
      const deletedRequestt = await ServiceRequestt.findByIdAndDelete(RequesttId);
      res.status(200).json({ message: 'בקשת שירות נמחקה בהצלחה', deletedRequestt });
    } catch (error) {
      console.error('שגיאה במחיקת בקשת שירות:', error);
      res.status(500).json({ message: 'שגיאת שרת פנימית' });
    }
  },


module.exports = Request
    }