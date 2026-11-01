const pool = require("../config/db");


class Report {



static async getAll(){


const result = await pool.query(

`
SELECT

id,

report_name AS name,

generated_date AS date,

status,

file_name,

file_path

FROM reports

ORDER BY id DESC

`

);


return result.rows;


}



}


module.exports = Report;