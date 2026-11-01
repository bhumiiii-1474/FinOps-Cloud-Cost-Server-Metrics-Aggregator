import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../service/api";
import "./Reports.css";

function Reports() {

    const [reports, setReports] = useState([]);

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        try {

            const res = await api.get("/reports");

            setReports(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <div className="reports-page">

            <Sidebar />

            <div className="reports-content">

                <Navbar />

<h2>Generated Reports</h2>

<button
  className="download-btn"
  onClick={async () => {
    try {
      await api.get("/reports/generate");
      alert("Report Generated Successfully");
      loadReports();
    } catch (err) {
      console.log(err);
      alert("Failed to generate report");
    }
  }}
>
  Generate Report
</button>

                <table>

                    <thead>

                        <tr>

                            <th>ID</th>

                            <th>Report Name</th>

                            <th>Generated Date</th>

                            <th>Status</th>

                            <th>Download</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            reports.map((report) => (

                                <tr key={report.id}>

                                    <td>{report.id}</td>

                                    <td>{report.name}</td>

                                    <td>{report.date}</td>

                                    <td>

                                        <span

                                            className={

                                                report.status === "Available"

                                                    ? "available"

                                                    : "processing"

                                            }

                                        >

                                            {report.status}

                                        </span>

                                    </td>

                                    <td>

                                        <a
href={`http://localhost:5000${report.file_path}`}
download
className="download-btn"
>
Download
</a>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Reports;