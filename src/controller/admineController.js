const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/users', authMiddleware, adminMiddleware, adminCtrl.getAllUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, adminCtrl.deleteUser);
router.get('/services', authMiddleware, adminMiddleware, adminCtrl.getAllServices);
router.delete('/services/:id', authMiddleware, adminMiddleware, adminCtrl.deleteService);

module.exports = router;