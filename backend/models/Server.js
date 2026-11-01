const pool = require("../config/db");


class Server {


static async getAll(){

const result = await pool.query(

`
SELECT *
FROM servers
ORDER BY id
`

);

return result.rows;

}



static async getCPU(){

const result = await pool.query(

`
SELECT
server_name,
cpu_usage
FROM servers
`

);

return result.rows;

}




static async getAlerts(){

const result = await pool.query(

`
SELECT

alert_type,
message,
severity,
status

FROM alerts

ORDER BY id DESC

`

);

return result.rows;

}


}   // <-- THIS WAS MISSING


module.exports = Server;