const express = require('express');
const router = express.Router();
const requestCtrl = require('../controllers/requestController');
import { authenticateUser } from '../middleware';
const serviceOwnerMiddleware = require('../middleware/serviceOwnerMiddleware'); // שימוש חוזר במידת הצורך

router.post('/', authenticateUser, requestCtrl.createRequest);
router.get('/', authenticateUser, requestCtrl.getUserRequests);
router.get('/:id', authenticateUser, requestCtrl.getRequestById);
router.put('/:id/accept', authenticateUser, serviceOwnerMiddleware, requestCtrl.acceptRequest);
router.put('/:id/reject', authenticateUser, serviceOwnerMiddleware, requestCtrl.rejectRequest);
router.delete('/:id', authenticateUser, requestCtrl.deleteRequest);

module.exports = router;