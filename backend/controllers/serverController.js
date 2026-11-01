const Server = require("../models/Server");



// GET ALL SERVERS

exports.getServers = async(req,res)=>{


try{


const servers = await Server.getAll();


res.json(servers);


}

catch(error){


res.status(500).json({

message:error.message

});


}



};





// CPU DATA

exports.getCPU = async(req,res)=>{


try{


const cpu = await Server.getCPU();


res.json(cpu);


}

catch(error){


res.status(500).json({

message:error.message

});


}



};





// ALERTS

exports.getAlerts = async(req,res)=>{


try{


const alerts = await Server.getAlerts();


res.json(alerts);


}

catch(error){


res.status(500).json({

message:error.message

});


}


};