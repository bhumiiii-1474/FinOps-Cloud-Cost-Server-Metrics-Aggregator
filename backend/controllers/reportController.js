const Report = require("../models/Report");



exports.getReports = async(req,res)=>{


try{


const reports = await Report.getAll();


res.json(reports);



}

catch(error){


res.status(500).json({

message:error.message

});


}



};