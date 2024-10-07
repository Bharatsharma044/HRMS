const express = require('express');
const expensesController = require('../controller/expensesController');
const router = express.Router();

// Route to create a new expense
router.post('/create', expensesController.createExpense);

// Route to get all expenses
router.get('/getAll', expensesController.getExpenses);

// Route to get a single expense by ID
router.get('/getById', expensesController.getExpenseById);

// Route to update an expense
router.put('/update', expensesController.updateExpense);

// Route to delete an expense by ID
router.delete('/delete', expensesController.deleteExpense);

// Route to search for expenses
router.get('/search', expensesController.searchExpenses);

// Route to delete multiple expenses
router.delete('/multiDelete', expensesController.multiDeleteExpenses);

module.exports = router;




// const express = require('express');
// const router = express.Router();
// const expensesController = require('../controller/expensesController');

// router.route('/list').get(expensesController.list);

// router.route('/create').post(expensesController.create);

// router.route('/edit').put(expensesController.edit);

// router.route('/delete').delete(expensesController.delete);

// router.route('/multi-delete').delete(expensesController.multidelete);

// router.route('/get').get(expensesController.getExpensesById);

// router.route('/search').get(expensesController.search);

// module.exports = router;