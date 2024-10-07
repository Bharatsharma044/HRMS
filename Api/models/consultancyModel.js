const mongoose = require('mongoose');
const { Schema } = mongoose;
const ConsultancySchema = new Schema({
    consultancy_name: {
        type: String,
        required: true,
    },
    consultancy_email: {
        type: String,
        required: true,
        unique: true
    },
    consultancy_website_url: {
        type: String,
    },

    consultancy_mobile: {
        type: String,
    },
    consultancy_alternate_mobile: {
        type: String,
    },
    consultancy_city: {
        type: String,
    },
    consultancy_state: {
        type: String,
    },
    consultancy_address: {
        type: String,
        required: true
    },
    contract_agreement: {
        type: String,
    },
    contract_person_name: {
        type: String,
    },
    contract_linkedIn_Profile: {
        type: String,
    }
});
const Consultancy = mongoose.model("consultancy", ConsultancySchema);
module.exports = Consultancy;

