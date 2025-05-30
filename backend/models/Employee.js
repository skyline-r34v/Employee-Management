const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empId: { type: String, required: true, unique: true }, // Unique ID to link to history
  name: { type: String, unique: true },
  email: { type: String, unique: true },
  address: { type: String, required: true, unique: true },
  experience: { type: String, required: true, unique: true },
  lastWorkCompany: { type: String, required: true, unique: true },
  resignationDate: Date,
  joiningDate: Date,
});

module.exports = mongoose.model('Employee', employeeSchema);
