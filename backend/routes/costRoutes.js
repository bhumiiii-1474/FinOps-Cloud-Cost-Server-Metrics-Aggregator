const express = require("express");

const router = express.Router();


const {

    getCostChart,
    getServices

} = require("../controllers/costController");



// Cost chart data
router.get("/chart", getCostChart);


// Service wise cost
router.get("/services", getServices);



module.exports = router;