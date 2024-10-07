// const ExpensesModel = require("../models/expensesModel");
const Expenses = require('../models/expensesModel');
const status = require("../config/status");

exports.createExpense = async (req, res) => {
    try {
        const newExpense = new Expenses({
            expenses_purpose: req.body.expenses_purpose,
            expenses_bill: req.body.expenses_bill,
            expenses_amount: req.body.expenses_amount,
            expenses_voucher: req.body.expenses_voucher,
            expenses_remark: req.body.expenses_remark,
            expenses_by_cash: req.body.expenses_by_cash,
            expenses_by_cheque: req.body.expenses_by_cheque,
            expenses_cash_recieved_by: req.body.expenses_cash_recieved_by,
            transaction_id: req.body.transaction_id,
        });

        let result = await newExpense.save();
        res.json({ success: true, status: status.OK, msg: 'New expense added successfully.', data: result });
    } catch (err) {
        console.log("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Failed to add expense.' });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const data = await Expenses.find({}).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Failed to retrieve expenses.' });
    }
};

exports.updateExpense = async (req, res) => {
    const id = req.body._id;
    if (id === undefined) {
        return res.json({ success: false, status: status.NOTFOUND, msg: 'ID Parameter Not Available' });
    }

    try {
        let result = await Expenses.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    expenses_purpose: req.body.expenses_purpose,
                    expenses_bill: req.body.expenses_bill,
                    expenses_amount: req.body.expenses_amount,
                    expenses_voucher: req.body.expenses_voucher,
                    expenses_remark: req.body.expenses_remark,
                    expenses_by_cash: req.body.expenses_by_cash,
                    expenses_by_cheque: req.body.expenses_by_cheque,
                    expenses_cash_recieved_by: req.body.expenses_cash_recieved_by,
                    date_of_expenses: req.body.date_of_expenses,
                    transaction_id: req.body.transaction_id,
                }
            },
            { new: true }
        ).lean().exec();

        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Expense updated successfully.', data: result });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Expense ID not found' });
        }
    } catch (err) {
        console.log("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Failed to update expense.' });
    }
};

exports.getExpenseById = async (req, res) => {
    try {
        const expenseId = req.query.id;
        if (!expenseId) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID Parameter Not Available' });
        }
        const data = await Expenses.findOne({ _id: expenseId }).lean().exec();
        return res.json({ data: data, success: true, status: status.OK });
    } catch (err) {
        console.log("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Failed to retrieve expense.' });
    }
};
  

exports.deleteExpense = async (req, res) => {
    try {
        const id = req.query.id;
        if (!id) {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'ID Parameter Not Available' });
        }
        let result = await Expenses.findOneAndDelete({ _id: id }).lean().exec();
        if (result) {
            res.json({ success: true, status: status.OK, msg: 'Expense deleted successfully.' });
        } else {
            return res.json({ success: false, status: status.NOTFOUND, msg: 'Expense ID not found' });
        }
    } catch (err) {
        console.log("Error:", err);
        return res.json({ success: false, status: status.INTERNAL_SERVER_ERROR, err: err, msg: 'Failed to delete expense.' });
    }
};

exports.searchExpenses = async (req, res) => {
    try {
        const query = req.query.search;
        if (!query) {
            return res.status(400).json({ success: false, msg: 'No search query provided' });
        }

        const searchTerms = query.split(' ').map(term => term.trim());

        const searchQuery = {
            $or: [
                { expenses_purpose: { $regex: new RegExp(query, "i") } },
                { expenses_voucher: { $regex: new RegExp(query, "i") } },
                { expenses_remark: { $regex: new RegExp(query, "i") } },
                { expenses_cash_recieved_by: { $regex: new RegExp(query, "i") } }
            ]
        };

        searchTerms.forEach(term => {
            searchQuery.$or.push({
                $or: [
                    { expenses_purpose: { $regex: new RegExp(term, "i") } },
                    { expenses_voucher: { $regex: new RegExp(term, "i") } },
                    { expenses_remark: { $regex: new RegExp(term, "i") } },
                    { expenses_cash_recieved_by: { $regex: new RegExp(term, "i") } }
                ]
            });
        });

        const results = await Expenses.find(searchQuery);
        res.json({ success: true, data: results });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).json({ success: false, msg: 'Internal Server Error' });
    }
};

exports.multiDeleteExpenses = async (req, res) => {
    try {
        const ids = req.body.ids; // Expecting an array of IDs

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ success: false, msg: 'No IDs provided for deletion.' });
        }

        // Validate IDs format if necessary
        // Example: check if all IDs are valid ObjectId strings
        // const isValidIds = ids.every(id => mongoose.Types.ObjectId.isValid(id));
        // if (!isValidIds) {
        //     return res.status(400).json({ success: false, msg: 'Invalid ID format.' });
        // }

        const result = await Expenses.deleteMany({ _id: { $in: ids } });

        if (result.deletedCount > 0) {
            res.json({ success: true, msg: `${result.deletedCount} expenses deleted successfully.` });
        } else {
            res.json({ success: false, msg: 'No expenses found with the provided IDs.' });
        }
    } catch (err) {
        console.error("Error in multiDeleteExpenses:", err);
        return res.status(500).json({ success: false, msg: 'Internal Server Error', error: err.message });
    }
};


// exports.multiDeleteExpenses = async (req, res) => {
//     try {
//         const ids = req.body.ids; // Expecting an array of IDs

//         if (!ids || !Array.isArray(ids) || ids.length === 0) {
//             return res.status(400).json({ success: false, msg: 'No IDs provided for deletion.' });
//         }

//         const result = await Expenses.deleteMany({ _id: { $in: ids } });

//         if (result.deletedCount > 0) {
//             res.json({ success: true, msg: `${result.deletedCount} expenses deleted successfully.` });
//         } else {
//             res.json({ success: false, msg: 'No expenses found with the provided IDs.' });
//         }
//     } catch (err) {
//         console.error("Error:", err);
//         return res.status(500).json({ success: false, msg: 'Internal Server Error' });
//     }
// };
