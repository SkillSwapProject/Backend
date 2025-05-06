const express = require("express")
const admine = {}
const AdminModel = require("../models/user")

// שליפה של כל המשתמשים
admine.getAll = async(req, res)=> {
    try {
        let data = await AdminModel.find({})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500)
        res.send("<h1>error</h1>")
    }
}
//מחיקה של משתמש לפי שם
admine.deleteUser = async (req, res) => {
    try {
      await AdminModel.deleteOne(req.params.userName);
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error deleting task' });
    }
  }
  
  // שליפה כל השירותים
  admine.getAllServices = async(req, res)=> {
    try {
        let data = await AdminModel.find({})
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500)
        res.send("<h1>error</h1>")
    }
      }

    //מחיקת שירות
    admine.deleteService = async (req, res) => {
        try {
          await AdminModel.deleteOne(req.params.userId);
          res.json({ message: 'Task deleted successfully' });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Error deleting task' });
        }
      }
      
module.exports = admine
