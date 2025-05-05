const express = require('express');
 const users = express();
 const UserModel = require("../models/user")
 const { getLoggedInUserDetails } = require('../middleware');
 const { getLoggedInUserDetails, authenticateUser } = require('../middleware');


 //שליפת פרטי המשתמש המחובר
 users.get('/profile', (req, res) => {
    const userDetails = getLoggedInUserDetails(req);
    if (userDetails) {
      res.json(userDetails);
    } else {
      res.status(401).json({ message: 'Unauthorized - User not logged in' });
    }
  });
// פרופיל - רק למשתמשים מחוברים
users.get('/profile', authenticateUser, (req, res) => {
  res.json(req.user); // מגיע מ־req.user שהוזן ע"י ה־middleware
});

  //עדכון פרטי משתמש
  users.updateProfile = async(req, res)=> {
    let codeProfile = req.params.username
    let editProfile = req.body
    try {
        let isOk = await userModel.updateOne({code:codeProfile}, editProfile)
        if (isOk)
        {
            let data = await UserModel.find({})
            res.status(200).json(data)
        }
        else
            res.status(500).send({error:"error"})
    } catch (error) {
        res.status(500)
        res.send("<h1>error</h1>")
    }
}
//שליפת פרופיל משתמש אחר לפי מזהה
async function getUserProfileById(userId, db) {
  try {
    const userProfile = await db.collection('users').findOne({ _id: userId }); // שימוש ב-userId ישירות
    if (!userProfile) {
      return null; 
    }
    return userProfile;
  } catch (error) {
    console.error('שגיאה בשליפת פרופיל משתמש:', error);
    throw error; 
  }
}
//שליפת לכ המשתמשים עי אדמין
const getAllUsersByAdmin = {
  getAllUsers: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "לא מאושר: משתמש לא מחובר" });
      }
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "אסור: אין לך הרשאות אדמין" });
      }
      const allUsers = await User.find({});
      res.status(200).json(allUsers);
    } catch (error) {
      console.error("שגיאה בשליפת משתמשים:", error);
      res.status(500).json({ message: "שגיאת שרת פנימית" });
    }
  },
}

//מחיקת משתמש עי האדמין
const deleteUser = {
  deleteUser: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "לא מאושר: משתמש לא מחובר" });
      }
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "אסור: אין לך הרשאות אדמין" });
      }
      // 3. קבלת מזהה המשתמש למחיקה
      const userId = req.params.userId; 
      // 4. מחיקת המשתמש
      //    הנחה שקיים מודל בשם User
      const deletedUser = await User.findByIdAndDelete(userId);
      // 5. טיפול במקרה שמשתמש לא נמצא
      if (!deletedUser) {
        return res.status(404).json({ message: "משתמש לא נמצא" });
      }
      // 6. החזרת הודעת הצלחה
      res.status(200).json({ message: "משתמש נמחק בהצלחה", deletedUser }); 
    } catch (error) {
      console.error("שגיאה במחיקת משתמש:", error);
      res.status(500).json({ message: "שגיאת שרת פנימית" });
    }
  },
}

  module.exports = users  