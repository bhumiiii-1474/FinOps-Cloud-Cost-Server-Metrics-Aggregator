const Cost = require("../models/Cost");



// COST CHART

exports.getCostChart = async(req,res)=>{


try{


const data = await Cost.getChart();


res.json(data);



}

catch(error){


res.status(500).json({

message:error.message

});


}


};





// SERVICE COST


exports.getServices = async(req,res)=>{


try{


const services = await Cost.getServices();


res.json(services);



}

catch(error){


res.status(500).json({

message:error.message

});


}



};