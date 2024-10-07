const HelpCenter = require("../models/helpCenterModel");
const status = require("../config/status");

exports.createTicket = async (req, res) => {
    try {
        const ticketData = {
            helpcenter_ticket_id: req.body.helpcenter_ticket_id,
            helpcenter_employee_id: req.body.helpcenter_employee_id,
            helpcenter_employee_code: req.body.helpcenter_employee_code,
            helpcenter_ticket_description: req.body.helpcenter_ticket_description,
            helpcenter_ticket_priority: req.body.helpcenter_ticket_priority,
            helpcenter_ticket_department: req.body.helpcenter_ticket_department,
            helpcenter_ticket_status: req.body.helpcenter_ticket_status,
            helpcenter_ticket_solved_by: req.body.helpcenter_ticket_solved_by,
            helpcenter_ticket_managed_by: req.body.helpcenter_ticket_managed_by,
            helpcenter_solve_duration: req.body.helpcenter_solve_duration
        };

        const newTicket = new HelpCenter(ticketData);
        let result = await newTicket.save();
        res.json({ success: true, status: status.OK, msg: 'Ticket created successfully.' });
    } catch (err) {
        console.log("Error", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Ticket creation failed.' });
    }
};

exports.getTickets = async (req, res) => {
    try {
        const data = await HelpCenter.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log(`Error: ${err}`);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Get tickets failed.' });
    }
};

exports.updateTicket = async (req, res) => {
    var id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
    }
    try {
        let result = await HelpCenter.findOneAndUpdate(
            { _id: id },
            { $set: req.body }
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Ticket updated successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Ticket Id not found' });
        }
    } catch (err) {
        console.log(err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Update ticket failed.' });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        const id = req.query.id;
        if (id === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        let result = await HelpCenter.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Ticket deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Ticket Id not found' });
        }
    } catch (err) {
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Delete ticket failed.' });
    }
};

exports.getTicketById = async (req, res) => {
    try {
        let ticketId = req.query.id;
        if (ticketId === undefined) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Id Parameter Not Available' });
        }
        const data = await HelpCenter.findOne({ _id: ticketId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("Error", err);
        return res.json({ success: false, status: status.INVALIDSYNTAX, err: err, msg: 'Get ticket failed.' });
    }
};

exports.multiDelete = async (req, res) => {
    try {
        const ids = req.body.ids;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, message: "IDs parameter not available or invalid" });
        }

        const result = await HelpCenter.deleteMany({ _id: { $in: ids } }).lean().exec();

        if (result.deletedCount > 0) {
            res.status(200).json({ success: true, message: 'Tickets deleted successfully.' });
        } else {
            res.status(404).json({ success: false, message: 'No tickets found with the given IDs.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.searchHelpCenter = async (req, res) => {
    try {
        // Extract the search query from the request
        const query = req.query.search;

        // If no query is provided, return a 400 error
        if (!query) {
            return res.status(400).json({ success: false, status: status.INVALIDSYNTAX, message: 'No search query provided' });
        }

        // Construct the search query for MongoDB using the $or operator
        const searchQuery = {
            $or: [
                { helpcenter_ticket_id: { $regex: new RegExp(query, "i") } },
                { helpcenter_employee_id: { $regex: new RegExp(query, "i") } },
                { helpcenter_employee_code: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_description: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_priority: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_department: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_status: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_solved_by: { $regex: new RegExp(query, "i") } },
                { helpcenter_ticket_managed_by: { $regex: new RegExp(query, "i") } }
            ]
        };

        // Execute the search query against the HelpCenter model
        const results = await HelpCenter.find(searchQuery).lean().exec();

        // Return the search results as JSON
        res.json({ success: true, status: status.OK, data: results });
    } catch (err) {
        console.error("Error:", err);

        // Return a 500 error response in case of an internal server error
        return res.status(500).json({ success: false, status: status.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' });
    }
};