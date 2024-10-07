const Employee = require("../models/employeeModel");
const status = require("../config/status");

// Signup or Create Employee
exports.signup = async (req, res) => {
    try {
        let employeeExists = await Employee.findOne({ employee_email: req.body.employee_email }).lean().exec();
        if (employeeExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Employee already registered.' });
        }

        const employeeData = {
            employee_code: req.body.employee_code,
            employee_first_name: req.body.employee_first_name,
            employee_last_name: req.body.employee_last_name,
            employee_mobile: req.body.employee_mobile,
            employee_alternate_mobile: req.body.employee_alternate_mobile,
            employee_email: req.body.employee_email,
            employee_password: req.body.employee_password,
            employee_address: req.body.employee_address,
            employee_city: req.body.employee_city,
            employee_state: req.body.employee_state,
            employee_other_info: req.body.employee_other_info,
            employee_dob: req.body.employee_dob,
            employee_doj: req.body.employee_doj,
            employee_skills: req.body.employee_skills,
            employee_experience: req.body.employee_experience,
            employee_resume: req.body.employee_resume,
            employee_id_proof: req.body.employee_id_proof,
            employee_pan_card: req.body.employee_pan_card,
            employee_marksheet: req.body.employee_marksheet,
            employee_experience_letter: req.body.employee_experience_letter,
            employee_permanant_address_proof: req.body.employee_permanant_address_proof,
            employee_local_address_proof: req.body.employee_local_address_proof,
            employee_reference_one_name: req.body.employee_reference_one_name,
            employee_reference_one_mobile: req.body.employee_reference_one_mobile,
            employee_reference_two_name: req.body.employee_reference_two_name,
            employee_reference_two_mobile: req.body.employee_reference_two_mobile,
            image: req.body.image,
        };

        const newEmployee = new Employee(employeeData);
        let result = await newEmployee.save();
        res.json({ success: true, status: status.OK, msg: 'New employee added successfully.' });

    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save employee failed.' });
    }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
    try {
        const data = await Employee.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("The Error is " + err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get Employees failed.' });
    }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    try {
        let result = await Employee.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
        ).lean().exec();

        if (result) {
            // res.json({ success: true, status: status.OK, msg: 'Employee is updated successfully.' });
            res.json({ success: true, status: status.OK, msg: 'Employee is updated successfully.', data: result });

        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Employee Id not found' });
        }
    } catch (err) {
        console.log("The error is" + err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update Employee failed.' });
    }
};

// Get Employee By ID
exports.getEmployeeById = async (req, res) => {
    try {
        let employeeId = req.query._id;
        if (employeeId === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await Employee.findOne({ _id: employeeId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get Employee failed.' });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const ID = req.query._id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await Employee.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Employee is deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Employee Id not found' });
        }
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Employee data failed.' });
    }
};

// Multi Delete Employees
exports.multiDeleteEmployees = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Ids Parameter Not Available' });
        }
        await Employee.deleteMany({ _id: { $in: ids } }).lean().exec();
        res.json({ success: true, status: status.OK, msg: 'Employees are deleted successfully.' });
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete Employees failed.' });
    }
};

// Search Employees
exports.searchEmployees = async (req, res) => {
    try {
        const query = req.query.search;
        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }

        const searchTerms = query.split(',').map(term => term.trim());

        const searchQuery = {
            $or: [
                { employee_first_name: { $regex: new RegExp(query, "i") } },
                { employee_last_name: { $regex: new RegExp(query, "i") } },
                { employee_email: { $regex: new RegExp(query, "i") } },
                { employee_city: { $regex: new RegExp(query, "i") } },
                { employee_state: { $regex: new RegExp(query, "i") } }
            ]
        };

        searchTerms.forEach(term => {
            searchQuery.$or.push({
                employee_skills: { $regex: new RegExp(term, "i") }
            });
        });

        const results = await Employee.find(searchQuery);
        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
};
