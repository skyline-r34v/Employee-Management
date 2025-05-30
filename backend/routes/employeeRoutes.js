const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const { body } = require('express-validator');
const {
  getEmployees, getEmployee,
  createEmployee, updateEmployee, deleteEmployee
} = require('../controllers/employeeController');

const router = express.Router();

const employeeValidation = [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('address').notEmpty(),
  body('experience').notEmpty(),
  body('lastWorkCompany').notEmpty(),
  body('joiningDate').isISO8601(),
];

router.get('/', verifyToken, getEmployees);
router.get('/:id', verifyToken, getEmployee);
router.post('/', verifyToken, employeeValidation, validate, createEmployee);
router.put('/:id', verifyToken, employeeValidation, validate, updateEmployee);
router.delete('/:id', verifyToken, deleteEmployee);

module.exports = router;
