const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExpensesSchema = new Schema({
    expenses_purpose: {
        type: String,
        required: true,
    },
    expenses_bill: {
        type: Number,
        required: true
    },
    expenses_amount: {
        // type: Number,
        type: String,
    },
    expenses_voucher: {
        type: String,
    },
    expenses_remark: {
        type: String,
    },
    expenses_by_cash: {
        type: String,
    },
    expenses_by_cheque: {
        type: String,
    },
    expenses_cash_recieved_by: {
        type: String,
    },
    date_of_expenses: {
        type: Date,
        default: Date.now
    },
    transaction_id: { type: String, required: true },
});
const Expenses = mongoose.model('expenses', ExpensesSchema);
module.exports = Expenses;
