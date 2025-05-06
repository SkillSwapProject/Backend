const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
import { authenticateUser } from '../middleware';
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/users', authenticateUser, adminMiddleware, adminCtrl.getAllUsers);
router.delete('/users/:id', authenticateUser, adminMiddleware, adminCtrl.deleteUser);
router.get('/services', authenticateUser, adminMiddleware, adminCtrl.getAllServices);
router.delete('/services/:id', authenticateUser, adminMiddleware, adminCtrl.deleteService);

module.exports = router;