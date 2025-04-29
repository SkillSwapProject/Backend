const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

router.get('/profile', authMiddleware, userCtrl.getProfile);
router.put('/profile', authMiddleware, userCtrl.updateProfile);
router.get('/:id', authMiddleware, userCtrl.getUserById);
router.get('/', authMiddleware, adminMiddleware, userCtrl.getAllUsers);
router.delete('/:id', authMiddleware, adminMiddleware, userCtrl.deleteUser);

module.exports = router;