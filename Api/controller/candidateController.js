const candidate = require("../models/candidateModel");
const status = require("../config/status");

// Signup or Create candidate
exports.create = async (req, res) => {
    try {
        let candidateExists = await candidate.findOne({ candidate_email: req.body.candidate_email }).lean().exec();
        if (candidateExists) {
            return res.json({ success: false, status: status.INVALIDSYNTAX, msg: 'candidate already registered.' });
        }

        const candidateData = {
            candidate_id: req.body.candidate_id,
            candidate_first_name: req.body.candidate_first_name,
            candidate_last_name: req.body.candidate_last_name,
            candidate_mobile: req.body.candidate_mobile,
            candidate_alternate_mobile: req.body.candidate_alternate_mobile,
            candidate_email: req.body.candidate_email,
            candidate_skype: req.body.candidate_skype,
            candidate_linkedIn_profile: req.body.candidate_linkedIn_profile,
            candidate_skills: req.body.candidate_skills,
            candidate_experience: req.body.candidate_experience,
            candidate_expected_salary: req.body.candidate_expected_salary,
            candidate_expected_joining_date: req.body.candidate_expected_joining_date,
            candidate_marrital_status:req.body.candidate_marrital_status,
            interview_rounds: req.body.interview_rounds,
            candidate_selection_status: req.body.candidate_selection_status,
            candidate_feedback:req.body.candidate_feedback,
            source_of_candidate:req.body.source_of_candidate,
            candidate_address: req.body.candidate_address,
            candidate_document_proof:req.body.candidate_document_proof,
            tenth_percentage: req.body.tenth_percentage,
            twelfth_percentage:req.body.twelfth_percentage,
            graduationPercentage:req.body.graduationPercentage,
            postGraduationPercentage:req.body.postGraduationPercentage,
            profile:req.body.profile,
        };

        const newcandidate = new candidate(candidateData);
        let result = await newcandidate.save();
        res.json({ success: true, status: status.OK, msg: 'New candidate added successfully.' });

    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Save candidate failed.' });
    }
};

// Get All candidates
exports.getcandidates = async (req, res) => {
    try {
        const data = await candidate.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("The Error is " + err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get candidates failed.' });
    }
};

// Update candidate updateCandidate
exports.updateCandidate = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    try {
        let result = await candidate.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'candidate is updated successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'candidate Id not found' });
        }
    } catch (err) {
        console.log("The error is" + err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update candidate failed.' });
    }
};

// Get candidate By ID
exports.getCandidateById = async (req, res) => {
    try {
        let candidateId = req.query._id;
        if (candidateId === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await candidate.findOne({ _id: candidateId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get candidate failed.' });
    }
};

// Delete candidate
exports.deleteCandidate = async (req, res) => {
    try {
        const ID = req.query._id;
        if (ID === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await candidate.findOneAndDelete({ _id: ID }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'candidate is deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'candidate Id not found' });
        }
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete candidate data failed.' });
    }
};

// Multi Delete candidates
exports.multiDeletecandidates = async (req, res) => {
    console.log("Request received for multi-delete", req.body);
    try {
        const ids = req.body.ids;
        if (!ids || ids.length === 0) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Ids Parameter Not Available' });
        }
        await candidate.deleteMany({ _id: { $in: ids } }).lean().exec();
        res.json({ success: true, status: status.OK, msg: 'Candidates deleted successfully.' });
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete candidates failed.' });
    }
};

// exports.multiDeletecandidates = async (req, res) => {
//     try {
//         const ids = req.body.ids;
//         if (!ids || ids.length === 0) {
//             return res.json({ success: false, status: status.NOTFOUND, msg: 'Ids Parameter Not Available' });
//         }
//         await candidate.deleteMany({ _id: { $in: ids } }).lean().exec();
//         res.json({ success: true, status: status.OK, msg: 'candidates are deleted successfully.' });
//     } catch (err) {
//         return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete candidates failed.' });
//     }
// };

// Search candidates
exports.searchCandidates = async (req, res) => {
    try {
        const query = req.query.search;
        if (!query) {
            return res.status(400).json({ error: 'No search query provided' });
        }

        const searchTerms = query.split(',').map(term => term.trim());

        const searchQuery = {
            $or: [
                { candidate_first_name: { $regex: new RegExp(query, "i") } },
                { candidate_last_name: { $regex: new RegExp(query, "i") } },
                { candidate_email: { $regex: new RegExp(query, "i") } },
                { candidate_city: { $regex: new RegExp(query, "i") } },
                { candidate_state: { $regex: new RegExp(query, "i") } }
            ]
        };

        searchTerms.forEach(term => {
            searchQuery.$or.push({
                candidate_skills: { $regex: new RegExp(term, "i") }
            });
        });

        const results = await candidate.find(searchQuery);
        res.json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
    }
};



























// const Candidate = require('../models/candidateModel');
// const status = require('../config/status');


// exports.create = async (req, res) => {
//     try {
//         var obj = {
//             candidate_first_name: req.body.candidate_first_name,
//             candidate_last_name: req.body.candidate_last_name,
//             candidate_mobile: req.body.candidate_mobile,
//             candidate_alternate_mobile: req.body.candidate_alternate_mobile,
//             candidate_email: req.body.candidate_email,
//             candidate_skype: req.body.candidate_skype,
//             candidate_profile: req.body.candidate_profile,
//             candidate_skills: req.body.candidate_skills,
//             candidate_experience: req.body.candidate_experience,
//             candidate_expected_salary: req.body.candidate_expected_salary,
//             candidate_expected_joining_date: req.body.candidate_expected_joining_date,
//             candidate_joining_immediate: req.body.candidate_joining_immediate,
//             candidate_marrital_status: req.body.candidate_marrital_status,
//             candidate_written_round: req.body.candidate_written_round,
//             candidate_machine_round: req.body.candidate_machine_round,
//             candidate_technical_interview_round: req.body.candidate_technical_interview_round,
//             candidate_hr_interview_round: req.body.candidate_hr_interview_round,
//             candidate_selection_status: req.body.candidate_selection_status,
//             candidate_feedback: req.body.candidate_feedback,
//             candidate_from_consultancy: req.body.candidate_from_consultancy,
           
//         }
//         const newmanageCandidateModel = new manageCandidateModel(req.body);
//         let result = await newmanageCandidateModel.save();
//         res.json({ success: true, status: status.OK, msg: 'Adding Candidate is successfully.' });
//     }
//     catch (err) {
//         if (err.code === 11000 && err.keyPattern && err.keyPattern.candidate_email) {
//             // If the error is due to a duplicate email (code 11000 is for duplicate key error)
//             return res.json({ success: false, status: status.BAD_REQUEST, msg: 'This email is already registered.' });
//         } else {
//             // For other errors
//             return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Adding Candidate failed.' });
//         }
//     }
// }


// // Create a new candidate
// // exports.createCandidate = async (req, res) => {
// //     try {
// //         const candidate = new Candidate(req.body);
// //         await candidate.save();
// //         res.status(201).json(candidate);
// //     } catch (error) {
// //         res.status(400).json({ message: error.message });
// //     }
// // };

// // Get all candidates
// exports.getCandidates = async (req, res) => {
//     try {
//         const candidates = await Candidate.find();
//         res.status(200).json(candidates);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Get a single candidate by ID
// exports.getCandidateById = async (req, res) => {
//     try {
//         const candidate = await Candidate.findOne({ candidate_id: req.params.id });
//         if (!candidate) {
//             return res.status(404).json({ message: 'Candidate not found' });
//         }
//         res.status(200).json(candidate);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update a candidate by ID
// exports.updateCandidate = async (req, res) => {
//     try {
//         const candidate = await Candidate.findOneAndUpdate(
//             { candidate_id: req.params.id },
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!candidate) {
//             return res.status(404).json({ message: 'Candidate not found' });
//         }
//         res.status(200).json(candidate);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// // Delete a candidate by ID
// exports.deleteCandidate = async (req, res) => {
//     try {
//         const candidate = await Candidate.findOneAndDelete({ candidate_id: req.params.id });
//         if (!candidate) {
//             return res.status(404).json({ message: 'Candidate not found' });
//         }
//         res.status(200).json({ message: 'Candidate deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.multidelete = async (req, res) => {
//     try {
//       // Extract the 'ids' parameter from the request body
//       const ids = req.body.ids;
  
//       // Check if 'ids' is not available, not an array, or if the array is empty
//       if (!ids || !Array.isArray(ids) || ids.length === 0) {
//         // Respond with a failure message if 'ids' is not valid
//         return res.status(400).json({ success: false, message: "IDs parameter not available or invalid" });
//       }
  
//       // Use the $in operator to match documents in the database with any of the provided 'ids'
//       // deleteMany is used to delete all documents that match the condition
//       const result = await Candidate.deleteMany({ candidate_id: { $in: ids } }).lean().exec();
  
//       // Check if any documents were deleted by checking the 'deletedCount' property of the result
//       if (result.deletedCount > 0) {
//         // If one or more documents were deleted, respond with a success message
//         res.status(200).json({ success: true, message: 'Candidates deleted successfully.' });
//       } else {
//         // If no documents were deleted (i.e., no matching documents were found), respond with a failure message
//         res.status(404).json({ success: false, message: 'No candidates found with the given IDs.' });
//       }
//     } catch (error) {
//       // If an error occurs (e.g., unauthorized access), respond with a 500 status and an error message
//       res.status(500).json({ success: false, message: error.message });
//     }
//   };

//   exports.searchCandidates = async (req, res) => {
//     try {
//         const query = req.query.search;

//         if (!query) {
//             return res.status(400).json({ error: 'No search query provided' });
//         }

//         const searchTerms = query.split(',').map(term => term.trim());
        
//         const searchQuery = {
//             $or: [
//                 { candidate_first_name: { $regex: new RegExp(query, "i") } },
//                 { candidate_last_name: { $regex: new RegExp(query, "i") } },
//                 { candidate_email: { $regex: new RegExp(query, "i") } },
//                 { candidate_mobile: { $regex: new RegExp(query, "i") } },
//                 { candidate_code: { $regex: new RegExp(query, "i") } },
//                 { candidate_address: { $regex: new RegExp(query, "i") } },
//                 { candidate_city: { $regex: new RegExp(query, "i") } },
//                 { candidate_state: { $regex: new RegExp(query, "i") } }
//                 // Note: Skip candidate_experience if it's numeric
//             ]
//         };

//         searchTerms.forEach(term => {
//             searchQuery.$or.push({
//                 candidate_skills: { $regex: new RegExp(term, "i") }
//             });
//         });

//         if (query.includes(' ')) {
//             const [firstName, lastName] = query.split(' ');
//             searchQuery.$or.push({
//                 $and: [
//                     { candidate_first_name: { $regex: new RegExp(firstName, "i") } },
//                     { candidate_last_name: { $regex: new RegExp(lastName, "i") } }
//                 ]
//             });
//         }

//         const results = await Candidate.find(searchQuery);
//         res.json(results);
//     } catch (err) {
//         console.error("Error in searchCandidates:", err.message);
//         return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error', error: err.message });
//     }
// };


// //   exports.searchCandidates = async (req, res) => {
// //     try {
// //         const query = req.query.search;

// //         if (!query) {
// //             return res.status(400).json({ error: 'No search query provided' });
// //         }

// //         const searchTerms = query.split(',').map(term => term.trim());
        
// //         const searchQuery = {
// //             $or: [
// //                 { candidate_first_name: { $regex: new RegExp(query, "i") } },
// //                 { candidate_last_name: { $regex: new RegExp(query, "i") } },
// //                 { candidate_email: { $regex: new RegExp(query, "i") } },
// //                 { candidate_mobile: { $regex: new RegExp(query, "i") } },
// //                 { candidate_code: { $regex: new RegExp(query, "i") } },
// //                 { candidate_address: { $regex: new RegExp(query, "i") } },
// //                 { candidate_city: { $regex: new RegExp(query, "i") } },
// //                 { candidate_state: { $regex: new RegExp(query, "i") } },
// //                 { candidate_experience: { $regex: new RegExp(query, "i") } }
// //             ]
// //         };

// //         searchTerms.forEach(term => {
// //             searchQuery.$or.push({
// //                 candidate_skills: { $regex: new RegExp(term, "i") }
// //             });
// //         });

// //         if (query.includes(' ')) {
// //             const [firstName, lastName] = query.split(' ');
// //             searchQuery.$or.push({
// //                 $and: [
// //                     { candidate_first_name: { $regex: new RegExp(firstName, "i") } },
// //                     { candidate_last_name: { $regex: new RegExp(lastName, "i") } }
// //                 ]
// //             });
// //         }

// //         const results = await Candidate.find(searchQuery);
// //         res.json(results);
// //     } catch (err) {
// //         console.error("Error in searchCandidates:", err.message);
// //         return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error', error: err.message });
// //     }
// // };

  

// //   // Search candidates
// // exports.searchCandidates = async (req, res) => {
// //     try {
// //         // Extract the search query from the request
// //         const query = req.query.search;
        
// //         // If no query is provided, return a 400 error
// //         if (!query) {
// //             return res.status(400).json({ error: 'No search query provided' });
// //         }

// //         // Split the query into an array of individual search terms (for skills)
// //         const searchTerms = query.split(',').map(term => term.trim());

// //         // Construct the search query for MongoDB using the $or operator
// //         const searchQuery = {
// //             $or: [
// //                 { candidate_first_name: { $regex: new RegExp(query, "i") } },
// //                 { candidate_last_name: { $regex: new RegExp(query, "i") } },
// //                 { candidate_email: { $regex: new RegExp(query, "i") } },
// //                 { candidate_mobile: { $regex: new RegExp(query, "i") } },
// //                 { candidate_code: { $regex: new RegExp(query, "i") } },
// //                 { candidate_address: { $regex: new RegExp(query, "i") } },
// //                 { candidate_city: { $regex: new RegExp(query, "i") } },
// //                 { candidate_state: { $regex: new RegExp(query, "i") } },
// //                 { candidate_experience: { $regex: new RegExp(query, "i") } }
// //             ]
// //         };

// //         // Add search conditions for each skill term
// //         searchTerms.forEach(term => {
// //             searchQuery.$or.push({
// //                 candidate_skills: { $regex: new RegExp(term, "i") }
// //             });
// //         });

// //         // Check if the query contains both first and last names separated by a space
// //         if (query.includes(' ')) {
// //             const [firstName, lastName] = query.split(' ');
            
// //             // Add a condition to match both first and last names together
// //             searchQuery.$or.push({
// //                 $and: [
// //                     { candidate_first_name: { $regex: new RegExp(firstName, "i") } },
// //                     { candidate_last_name: { $regex: new RegExp(lastName, "i") } }
// //                 ]
// //             });
// //         }

// //         // Execute the search query against the Candidate model
// //         const results = await Candidate.find(searchQuery);
        
// //         // Return the search results as JSON
// //         res.json(results);
// //     } catch (err) {
// //         console.error("Error:", err);
        
// //         // Return a 500 error response in case of an internal server error
// //         return res.status(500).json({ success: false, status: 500, msg: 'Internal Server Error' });
// //     }
// // };


