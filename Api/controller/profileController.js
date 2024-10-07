const Profile = require('../models/profileModule');
const status = require('../config/status');


// Create a new profile
exports.createProfile = async (req, res) => {
    try {
        const profileData = {
            profile: req.body.profile,
            profile_id: req.body.profile_id,
        };

        const newProfile = new Profile(profileData);
        await newProfile.save();
        res.json({ success: true, status: status.OK, msg: 'Profile created successfully.', data: newProfile });
    } catch (err) {
        console.error("Error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Profile creation failed.' });
    }
};

// Get all profiles
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find({}).lean().exec();
        return res.json({ data: profiles, success: true, status: status.OK });
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get profiles failed.' });
    }
};

// Get a profile by ID
exports.getProfileById = async (req, res) => {
    try {
        const profileId = req.query.id;
        if (!profileId) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
        }

        const profile = await Profile.findOne({ _id: profileId }).lean().exec();
        return res.json({ data: profile, success: true, status: status.OK });
    } catch (err) {
        console.error("Error in getting profile by ID:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get profile failed.' });
    }
};

// Update a profile by ID
exports.updateProfile = async (req, res) => {
    const id = req.body._id;
    if (!id) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
    }

    try {
        let result = await Profile.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            { new: true } // Return the updated document
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Profile updated successfully.', data: result });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile ID not found' });
        }
    } catch (err) {
        console.error("Error in updating profile:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update profile failed.' });
    }
};

// Delete a profile by ID
exports.deleteProfile = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID parameter not available' });
        }

        let result = await Profile.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Profile deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile ID not found' });
        }
    } catch (err) {
        console.error("Error in deleting profile:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete profile failed.' });
    }
};

// Multi-delete profiles by array of IDs
exports.multiDeleteProfiles = async (req, res) => {
    try {
        const ids = req.body.ids;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, msg: 'IDs parameter not available or invalid' });
        }

        const result = await Profile.deleteMany({ _id: { $in: ids } }).lean().exec();

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, status: status.OK, msg: 'Profiles deleted successfully.' });
        } else {
            res.status(404).json({ success: false, status: status.NOTFOUND, msg: 'No profiles found with the given IDs.' });
        }
    } catch (error) {
        console.error("Error in multi-delete:", error);
        res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: error.message });
    }
};

// Search profiles by query
exports.searchProfiles = async (req, res) => {
    try {
        const query = req.query.search;

        if (!query) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, msg: 'No search query provided' });
        }

        const searchQuery = {
            $or: [
                { profile: { $regex: new RegExp(query, "i") } },
                { profile_id: { $regex: new RegExp(query, "i") } }
            ]
        };

        const results = await Profile.find(searchQuery).lean().exec();
        res.json({ success: true, status: status.OK, data: results });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Internal Server Error' });
    }
};








// // Create a new profile
// exports.createProfile = async (req, res) => {
//     try {
//         const profileExists = await Profile.findOne({ profile_id: req.body.profile_id }).lean().exec();
//         if (profileExists) {
//             return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'Profile ID already exists.' });
//         }
//         const newProfile = new Profile({
//             profile: req.body.profile,
//             profile_id: req.body.profile_id,
//         });
//         const result = await newProfile.save();
//         res.json({ success: true, status: status.OK, msg: 'Profile created successfully.', data: result });
//     } catch (err) {
//         console.error("Error in createProfile:", err);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Error creating profile.', error: err });
//     }
// };

// // Get all profiles
// exports.getProfiles = async (req, res) => {
//     try {
//         const profiles = await Profile.find({}).lean().exec();
//         res.json({ success: true, status: status.OK, data: profiles });
//     } catch (err) {
//         console.error("Error in getProfiles:", err);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Error getting profiles.', error: err });
//     }
// };

// // Get profile by ID
// exports.getProfileById = async (req, res) => {
//     try {
//         const profileId = req.query.id;
//         const profile = await Profile.findOne({ profile_id: profileId }).lean().exec();
//         if (!profile) {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile not found.' });
//         }
//         res.json({ success: true, status: status.OK, data: profile });
//     } catch (err) {
//         console.error("Error in getProfileById:", err);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Error fetching profile by ID.', error: err });
//     }
// };

// // Search profiles by profile name
// exports.searchProfile = async (req, res) => {
//     try {
//         const query = req.query.q;
//         const profiles = await Profile.find({
//             profile: { $regex: query, $options: 'i' }
//         }).lean().exec();

//         if (profiles.length === 0) {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'No profiles found.' });
//         }
//         res.json({ success: true, status: status.OK, data: profiles });
//     } catch (err) {
//         console.error("Error in searchProfile:", err);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Error searching profiles.', error: err });
//     }
// };

// // Update profile by ID
// exports.updateProfile = async (req, res) => {
//     try {
//         const profileId = req.body.profile_id;
//         const updatedProfile = await Profile.findOneAndUpdate(
//             { profile_id: profileId },
//             {
//                 $set: {
//                     profile: req.body.profile
//                 }
//             },
//             { new: true }
//         ).lean().exec();

//         if (!updatedProfile) {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile not found.' });
//         }
//         res.json({ success: true, status: status.OK, msg: 'Profile updated successfully.', data: updatedProfile });
//     } catch (err) {
//         console.error("Error in updateProfile:", err);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Error updating profile.', error: err });
//     }
// };

// // Multi-delete profiles by IDs
// exports.multiDeleteProfiles = async (req, res) => {
//     try {
//         const profileIds = req.body.profile_ids;
//         const result = await Profile.deleteMany({ profile_id: { $in: profileIds } }).lean().exec();

//         if (result.deletedCount === 0) {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'No profiles found for deletion.' });
//         }
//         res.json({ success: true, status: status.OK, msg: `${result.deletedCount} profiles deleted successfully.` });
//     } catch (err) {
//         console.error("Error in multiDeleteProfiles:", err);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Error deleting profiles.', error: err });
//     }
// };

// // Delete profile by ID
// exports.deleteProfile = async (req, res) => {
//     try {
//         const profileId = req.query.id;
//         const deletedProfile = await Profile.findOneAndDelete({ profile_id: profileId }).lean().exec();
//         if (!deletedProfile) {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'Profile not found.' });
//         }
//         res.json({ success: true, status: status.OK, msg: 'Profile deleted successfully.' });
//     } catch (err) {
//         console.error("Error in deleteProfile:", err);
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, msg: 'Error deleting profile.', error: err });
//     }
// };
