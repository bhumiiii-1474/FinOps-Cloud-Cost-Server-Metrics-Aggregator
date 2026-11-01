const pool = require("../config/db");


class Cost {



static async getChart(){

const result = await pool.query(

`
SELECT

service_name AS name,

monthly_cost

FROM cloud_costs

`

);

return result.rows;

}




static async getServices(){


const result = await pool.query(

`
SELECT *

FROM cloud_costs

`

);


return result.rows;


}



}


module.exports = Cost;