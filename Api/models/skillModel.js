const mongoose = require('mongoose');
const { Schema } = mongoose;

const SkillSchema = new mongoose.Schema({
    skills: { type: String, required: true },
    profile: { type: Array, required: true },
    description: { type: String },
    profile_id: {
        type: Array,
        required: true
    },
});

const Skills = mongoose.model('skills', SkillSchema);
module.exports = Skills;
