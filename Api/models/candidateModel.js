const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    candidate_id: { type: String, required: true, unique: true },
    candidate_first_name: { type: String, required: true },
    candidate_last_name: { type: String, required: true },
    candidate_mobile: { type: String, required: true },
    candidate_alternate_mobile: { type: String },
    candidate_email: { type: String, required: true, unique: true },
    candidate_skype: { type: String },
    candidate_linkedIn_profile: { type: String },
    candidate_skills: { type: [String], required: true },
    candidate_experience: { type: String, required: true }, // in years
    candidate_expected_salary: { type: Number, required: true },
    candidate_expected_joining_date: { type: Date },
    candidate_marrital_status: { type: String, enum: ['Single', 'Married', 'Divorced', 'Widowed'] },
    interview_rounds: { type: Number, default: 0 },
    candidate_selection_status: { type: String, enum: ['Applied', 'Interviewing', 'Selected', 'Rejected'], default: 'Applied' },
    candidate_feedback: { type: String },
    source_of_candidate: { type: String },
    candidate_address: { type: String },
    candidate_document_proof: { type: String },
    tenth_percentage: { type: Number },
    twelfth_percentage: { type: Number },
    graduationPercentage: { type: Number },
    postGraduationPercentage: { type: Number },
    profile: { type: String }
});

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;