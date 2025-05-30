const mongoose = require('mongoose');

const employeeHistorySchema = new mongoose.Schema({
  empId: { type: String, required: true }, // Link to Employee
  name: String,
  email: String,
  address: String,
  experience: String,
  lastWorkCompany: String,
  resignationDate: Date,
  joiningDate: Date,
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmployeeHistory', employeeHistorySchema);
