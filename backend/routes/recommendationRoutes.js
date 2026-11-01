const express = require("express");

const router = express.Router();


const {

    getRecommendations

} = require("../controllers/recommendationsController");



// AI Cost Optimization Recommendation

router.get("/", getRecommendations);



module.exports = router;