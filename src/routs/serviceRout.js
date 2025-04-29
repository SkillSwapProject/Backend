const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');
const serviceOwnerMiddleware = require('../middleware/serviceOwnerMiddleware'); // דוגמה לmiddleware לבדיקת בעלות על שירות
const adminMiddleware = require('../middleware/adminMiddleware');

router.post('/', authMiddleware, serviceCtrl.createService);
router.get('/', serviceCtrl.getAllServices); // מאפשר גישה לא מאובטחת לחיפוש
router.get('/:id', serviceCtrl.getServiceById);
router.put('/:id', authMiddleware, serviceOwnerMiddleware, serviceCtrl.updateService);
router.delete('/:id', authMiddleware, (req, res, next) => { // דוגמה לשימוש במספר middleware
  serviceOwnerMiddleware(req, res, () => {
    adminMiddleware(req, res, next); // אם לא בעלים, בודק אם אדמין
  });
}, serviceCtrl.deleteService);

module.exports = router;

