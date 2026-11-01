const pool = require("../config/db");


exports.getSummary = async(req,res)=>{

try{

const result = await pool.query(`

SELECT

SUM(monthly_cost) AS total_cost,

COUNT(*) FILTER (WHERE status='Running') AS running_servers,

AVG(cpu_usage) AS avg_cpu,

AVG(memory_usage) AS avg_memory

FROM servers

`);


const data=result.rows[0];


res.json({

total_cost:Number(data.total_cost || 0),

running_servers:Number(data.running_servers || 0),

avg_cpu:Number(data.avg_cpu || 0).toFixed(2),

avg_memory:Number(data.avg_memory || 0).toFixed(2)

});


}

catch(error){

console.log(error);

res.status(500).json({

message:"Dashboard summary failed"

});

}


};