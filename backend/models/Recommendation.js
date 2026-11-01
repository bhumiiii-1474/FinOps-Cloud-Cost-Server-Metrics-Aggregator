const pool = require("../config/db");


class Recommendation {



static async getRecommendations(){



const result = await pool.query(

`

SELECT


server_name,

cpu_usage,

memory_usage,

disk_usage,


CASE


WHEN cpu_usage < 20

AND memory_usage < 30

THEN 'Shutdown Server'


WHEN cpu_usage > 85

THEN 'High Usage - Upgrade'


ELSE 'Running Normally'


END AS recommendation



FROM servers



`

);



return result.rows;



}



}



module.exports = Recommendation;