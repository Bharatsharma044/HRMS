const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProfileSchema = new Schema({
    profile: {
        type: String,
        required: true,
    },
    profile_id: {
        type: String,
        unique: true,
     },
});
const Profile = mongoose.model('profile', ProfileSchema);
module.exports = Profile;
 