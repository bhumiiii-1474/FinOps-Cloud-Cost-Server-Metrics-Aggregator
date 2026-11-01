const Recommendation = require("../models/Recommendation");



exports.getRecommendations = async(req,res)=>{


try{


const data = await Recommendation.getRecommendations();



res.json(data);



}

catch(error){


res.status(500).json({

message:error.message

});


}



};