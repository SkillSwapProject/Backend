const express = require("express")
const router = express.Router

const serviceCtrl = require("../controller/ServiceController")



router.post("/postNew", serviceCtrl.postNew)
router.get("/getall", serviceCtrl.getAll)
router.get("/getbyid", serviceCtrl.getbyid)
router.get("/updateservice", serviceCtrl.getAll)
router.get("/deleteservice", serviceCtrl.deleteservice)