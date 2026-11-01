const express = require("express");

const router = express.Router();


const {
getReports
} = require("../controllers/reportController");


const {
generateReport
} = require("../controllers/reportGeneratorController");



router.get("/",getReports);


// generate PDF
router.get("/generate",generateReport);



module.exports = router;