import Employee from '../models/empModels.js';

// create employee
export const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all employees
export const getAll = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get employee by the id
export const getEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(404).send('Employee does not exist');
    }
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// update employee by the id
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    initials,
    displayName,
    gender,
    dob,
    email,
    mobile,
    designation,
    empType,
    joinedDate,
    exp,
    salary,
    note,
  } = req.body;

  try {
    const employee = await Employee.findByIdAndUpdate(
      id,
      {
        name,
        initials,
        displayName,
        gender,
        dob,
        email,
        mobile,
        designation,
        empType,
        joinedDate,
        exp,
        salary,
        note,
      },
      {
        new: true,
      },
    );
    if (!employee) {
      return res.status(404).send('Employee does not exist');
    }
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// delete employee by the id
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).send('Employee does not exist');
    }
    return res.status(200).send(`Employee with ID: ${id} deleted successfully`);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
