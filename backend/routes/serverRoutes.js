const express = require("express");

const router = express.Router();


const {
    getServers,
    getCPU,
    getAlerts

} = require("../controllers/serverController");



// All servers
router.get("/", getServers);


// CPU usage chart
router.get("/cpu", getCPU);


// Server alerts
router.get("/alerts", getAlerts);



module.exports = router;