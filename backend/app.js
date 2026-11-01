const express = require("express");
const cors = require("cors");


const authRoutes = require("./routes/authRoutes");
const serverRoutes = require("./routes/serverRoutes");
const costRoutes = require("./routes/costRoutes");
const reportRoutes = require("./routes/reportRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


const app = express();


// Middleware

app.use(cors());

app.use(express.json());



// APIs

app.use("/api/auth", authRoutes);

app.use("/api/servers", serverRoutes);

app.use("/api/costs", costRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/recommendations", recommendationRoutes);

app.use("/api/dashboard", dashboardRoutes);


// Serve generated PDF reports

app.use("/reports", express.static("reports"));



// Test API

app.get("/",(req,res)=>{

    res.json({

        message:"FinOps Backend Running"

    });

});


module.exports = app;