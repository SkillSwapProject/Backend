const express = require('express');
const router = express.Router();
const requestCtrl = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');
const serviceOwnerMiddleware = require('../middleware/serviceOwnerMiddleware'); // שימוש חוזר במידת הצורך

router.post('/', authMiddleware, requestCtrl.createRequest);
router.get('/', authMiddleware, requestCtrl.getUserRequests);
router.get('/:id', authMiddleware, requestCtrl.getRequestById);
router.put('/:id/accept', authMiddleware, serviceOwnerMiddleware, requestCtrl.acceptRequest);
router.put('/:id/reject', authMiddleware, serviceOwnerMiddleware, requestCtrl.rejectRequest);
router.delete('/:id', authMiddleware, requestCtrl.deleteRequest);

module.exports = router;