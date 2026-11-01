const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

exports.generateReport = async (req, res) => {

    try {

        const servers = await pool.query(`
            SELECT
            server_name,
            cpu_usage,
            memory_usage,
            disk_usage,
            status,
            monthly_cost
            FROM servers
        `);

        const costs = await pool.query(`
            SELECT
            service_name,
            monthly_cost
            FROM cloud_costs
        `);

        const fileName = `FinOps_Report_${Date.now()}.pdf`;

        const folderPath = path.join(__dirname, "../reports");

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        const filePath = path.join(folderPath, fileName);

        const doc = new PDFDocument();

        const stream = fs.createWriteStream(filePath);

        doc.pipe(stream);

        doc.fontSize(20).text("FinOps Cloud Cost Report");

        doc.moveDown();

        doc.fontSize(14).text("Server Performance");

        doc.moveDown();

        servers.rows.forEach(server => {

            doc.fontSize(11).text(
`Server: ${server.server_name}
CPU: ${server.cpu_usage}%
Memory: ${server.memory_usage}%
Disk: ${server.disk_usage}%
Status: ${server.status}
Monthly Cost: ₹${server.monthly_cost}

`
            );

        });

        doc.moveDown();

        doc.fontSize(14).text("Cloud Cost Details");

        costs.rows.forEach(cost => {

            doc.fontSize(11).text(
`Service: ${cost.service_name}
Cost: ₹${cost.monthly_cost}

`
            );

        });

        doc.end();

        stream.on("finish", async () => {

            await pool.query(
                `
                INSERT INTO reports
                (
                    user_id,
                    report_name,
                    generated_date,
                    status,
                    file_name,
                    file_path
                )
                VALUES
                (
                    1,
                    'Generated FinOps Report',
                    CURRENT_DATE,
                    'Available',
                    $1,
                    $2
                )
                `,
                [
                    fileName,
                    "/reports/" + fileName
                ]
            );

            res.json({
                message: "Report Generated Successfully",
                file: "/reports/" + fileName
            });

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message
        });

    }

};