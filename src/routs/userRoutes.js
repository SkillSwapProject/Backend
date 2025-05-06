const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
import { authenticateUser } from '../middleware';

// const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/profile', authenticateUser, userCtrl.getProfile);
router.put('/profile', authenticateUser, userCtrl.updateProfile);
router.get('/:id', authenticateUser, userCtrl.getUserById);
router.get('/', authenticateUser, adminMiddleware, userCtrl.getAllUsers);
router.delete('/:id', authenticateUser, adminMiddleware, userCtrl.deleteUser);

module.exports = router;