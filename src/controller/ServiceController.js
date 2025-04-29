const express = require('express');

const service = express();

service.use(express.json()); // Middleware לניתוח JSON
const serviceModel = require("../models/service")

//יצירת שירות חדשה

service.postNew('/services', (req, res) => {
  const { name, description } = req.body;
  // בדיקת קלט
  if (!name || !description) {
    return res.status(400).json({ message: 'שם ותיאור שירות נדרשים' });
  }
  const newService = {
    id: services.length + 1, // מזהה ייחודי
    name,
    description,
  };

  services.push(newService);
  res.status(201).json(newService);
});

//קבלת רשימת כל השירותים
service.getAll = async (req, res) => {
  try {
    let data = await serviceModel.find({})
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500)
    res.send("<h1>error</h1>")
  }

}

//קבלת פרטי שירות לפי מזהה
service.getbyid = async (req, res) => {
  let name = req.params.id
  try {
    let cat = await serviceModel.find({ id: name })
    res.json(cat)
  } catch (error) {
    res.status(500)
    res.send("<h1>error</h1>")
  }
}
//עדכון שרות לפי שם
service.updateservice = async (req, res) => {
  try {
    const service = await service.findOne({ id: req.params.id });

    if (!service) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const userIdFromAuth = req.userId;

    if (service.ownerId !== userIdFromAuth) {
      return res.status(403).json({ message: 'Unauthorized: You are not the owner of this task' });
    }

    // אם הבדיקה עברה, ניתן לעדכן את המשימה
    const updateservice = await service.findOneAndUpdate(
      { code: req.params.code },
      req.body,
      { new: true }
    );
    res.json(updateservice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating task' });
  }
};


//a function that eraes a service
service.deleteservice = async (req, res) => {
  try {
    const service = await service.findOne({ id: req.params.id });

    if (!service) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const userIdFromAuth = req.userId;

    // בדיקה שהמשתמש המנסה למחוק הוא בעל המשימה
    if (service.ownerId !== userIdFromAuth) {
      return res.status(403).json({ message: 'Unauthorized: You are not the owner of this task' });
    }

    const deleteservice = await service.findOneAndDelete({ code: req.params.code });

    if (!deleteservice) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting task' });
  }
};



service.get('/user', authenticateUser, (req, res) => {
  const user = users[req.userId];
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

