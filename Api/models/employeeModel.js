const mongoose = require('mongoose');
const { Schema } = mongoose;
const EmployeeSchema = new Schema({
    employee_code: {
        type: String,
        required: true,
        unique: true
    },
    employee_first_name: {
        type: String,
        required: true
    },
    employee_last_name: {
        type: String,
        required: true
    },
    employee_mobile: {
        type: String,
        required: true,
    },
    employee_alternate_mobile: {
        type: String,
    },
    employee_email: {
        type: String,
        required: true,
        unique: true
    },
    employee_password: {
        type: String,
        required: true
    },
    employee_address: {
        type: String,
    },
    employee_city: {
        type: String,
    },
    employee_state: {
        type: String,
    },
    employee_other_info: {
        type: String,
    },
    employee_dob: {
        type: Date,
        default: Date.now
    },
    employee_doj: {
        type: Date,
        default: Date.now
    },
    employee_skills: {
        type: Array,
        required: true
    },
    employee_experience: {
        type: String,
        required: true
    },
    employee_resume: {
        type: String,
    },
    employee_id_proof: {
        type: String,
    },
    employee_pan_card: {
        type: String,
    },
    employee_marksheet: {
        type: String,
    },
    employee_experience_letter: {
        type: String,
    },
    employee_permanant_address_proof: {
        type: String,
    },
    employee_local_address_proof: {
        type: String,
    },
    employee_reference_one_name: {
        type: String,
    },
    employee_reference_one_mobile: {
        type: String,
    },
    employee_reference_two_name: {
        type: String,
    },
    employee_reference_two_mobile: {
        type: String,
    },
    image: {
        type: String,
    },
},
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
    });
const Employee = mongoose.model('employee', EmployeeSchema);

module.exports = Employee;