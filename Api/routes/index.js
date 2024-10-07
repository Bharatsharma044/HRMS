const express = require('express');
const userRoute = require('../routes/userRoute');
const candidateRoute = require('../routes/candidateRoute');
// const employeeRoute = require('../routes/employeeRoute');
const employeeRoutes = require('../routes/employeeRoutes');
const expensesRoute = require('../routes/expensesRoute');
const helpCenterRoutes = require('../routes/helpCenterRoutes');
const consultancyRoute = require('../routes/consultancyRoute');
const skillRoute = require('../routes/skillRoute');
const profileRoute = require('../routes/profileRoute');
const router = express.Router(); // Create a new router instance

// Define specific routes
router.use("/user", userRoute);
router.use("/candidate", candidateRoute);
router.use("/employee", employeeRoutes);
router.use("/helpcenter", helpCenterRoutes);
router.use("/expenses",expensesRoute);
router.use("/consultancy",consultancyRoute);
router.use("/skills", skillRoute);
router.use("/profile", profileRoute);



module.exports = router; // Export the router to use in app.js

