const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/', adminController.createAdmins);
router.get('/', adminController.getAllAdmin);
router.get('/:adminId', adminController.getAdminById);
router.put('/:adminId', adminController.updateAdmin);
router.delete('/:adminId', adminController.deleteAdmin);

module.exports = router;