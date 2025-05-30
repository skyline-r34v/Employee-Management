const Employee = require('../models/Employee');
const EmployeeHistory = require('../models/EmployeeHistory');
const { v4: uuidv4 } = require('uuid');

exports.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.getEmployee = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (!employee) return res.status(404).json({ message: 'Not found' });
  res.json(employee);
};

exports.createEmployee = async (req, res) => {
  const empId = uuidv4(); // Generate unique empId
  const employee = new Employee({ ...req.body, empId });
  await employee.save();
  res.status(201).json(employee);
};

exports.updateEmployee = async (req, res) => {
  const oldData = await Employee.findById(req.params.id);
  if (!oldData) return res.status(404).json({ message: 'Employee not found' });

  // Create history entry
  const history = new EmployeeHistory({
    empId: oldData.empId,
    name: oldData.name,
    email: oldData.email,
    address: oldData.address,
    experience: oldData.experience,
    lastWorkCompany: oldData.lastWorkCompany,
    resignationDate: oldData.resignationDate,
    joiningDate: oldData.joiningDate,
  });

  await history.save();

  // Update employee
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.json(updated);
};

exports.deleteEmployee = async (req, res) => {
  const deleted = await Employee.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Employee not found' });

  // Optionally delete history as well:
  // await EmployeeHistory.deleteMany({ empId: deleted.empId });

  res.json({ message: 'Employee deleted' });
};

exports.getEmployeeHistory = async (req, res) => {
  const history = await EmployeeHistory.find({ empId: req.params.empId }).sort({ updatedAt: -1 });
  res.json(history);
};
