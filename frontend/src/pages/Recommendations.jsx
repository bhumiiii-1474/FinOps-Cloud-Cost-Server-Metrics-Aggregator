import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import MetricChart from "../components/MetricChart";
import api from "../service/api";

import {
  MdSavings,
  MdWarning,
  MdCloud,
  MdCheckCircle,
  MdTrendingUp,
  MdStorage,
} from "react-icons/md";

import "./Recommendations.css";

function Recommendations() {

  const [recommendations, setRecommendations] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {

    try {

      const res = await api.get("/recommendations");

      setRecommendations(res.data);

      const chart = res.data.map((item) => ({
        name: item.server_name,
        cost: Number(item.monthly_cost),
      }));

      setChartData(chart);

    } catch (err) {

      console.log(err);

    }

  };

  const totalSaving = recommendations.reduce(
    (sum, item) => sum + Number(item.estimated_saving || 0),
    0
  );

  const idleServers = recommendations.filter(
    (item) => item.recommendation === "Shutdown Server"
  ).length;

  const upgradeServers = recommendations.filter(
    (item) => item.recommendation === "High Usage - Upgrade"
  ).length;

  const healthyServers = recommendations.filter(
    (item) => item.recommendation === "Running Normally"
  ).length;

  return (

    <div className="recommendation-page">

      <Sidebar />

      <div className="recommendation-content">

        <Navbar />

        <div className="recommendation-header">

          <h1>Cloud Optimization Recommendations</h1>

          <p>
            Intelligent recommendations generated using
            server utilization, cloud cost and resource
            consumption.
          </p>

        </div>

        <div className="recommendation-cards">

          <SummaryCard
            title="Potential Monthly Saving"
            value={`₹ ${totalSaving}`}
            icon={<MdSavings />}
            color="#16a34a"
          />

          <SummaryCard
            title="Idle Servers"
            value={idleServers}
            icon={<MdCloud />}
            color="#2563eb"
          />

          <SummaryCard
            title="Upgrade Required"
            value={upgradeServers}
            icon={<MdWarning />}
            color="#dc2626"
          />

          <SummaryCard
            title="Healthy Servers"
            value={healthyServers}
            icon={<MdCheckCircle />}
            color="#9333ea"
          />

        </div>

        <div className="chart-section">

          <MetricChart
            title="Monthly Cost Per Server"
            data={chartData}
            dataKey="cost"
            strokeColor="#2563eb"
          />

        </div>

        <div className="recommendation-summary">

          <div className="summary-box green">

            <MdTrendingUp size={35} />

            <div>

              <h3>Total Saving</h3>

              <h2>₹ {totalSaving}</h2>

            </div>

          </div>

          <div className="summary-box blue">

            <MdStorage size={35} />

            <div>

              <h3>Total Servers</h3>

              <h2>{recommendations.length}</h2>

            </div>

          </div>

        </div>

        <div className="recommendation-table">

          <table>

            <thead>

              <tr>

                <th>Server Name</th>
                <th>CPU</th>
                <th>Memory</th>
                <th>Disk</th>
                <th>Monthly Cost</th>
                <th>Recommendation</th>
                <th>Estimated Saving</th>

              </tr>

            </thead>

            <tbody>

              {
                recommendations.map((server) => (

                  <tr key={server.id}>

                    <td>{server.server_name}</td>

                    <td>{server.cpu_usage}%</td>

                    <td>{server.memory_usage}%</td>

                    <td>{server.disk_usage}%</td>

                    <td>₹ {server.monthly_cost}</td>

                    <td>

                      <span
                        className={
                          server.recommendation === "Shutdown"
                            ? "shutdown"
                            : server.recommendation === "Upgrade"
                            ? "upgrade"
                            : "healthy"
                        }
                      >

                        {server.recommendation}

                      </span>

                    </td>

                    <td>

                      ₹ {server.estimated_saving}

                    </td>

                  </tr>
                                  ))

              }

            </tbody>

          </table>

        </div>

        <div className="recommendation-notes">

          <h2>Optimization Suggestions</h2>

          <ul>

            <li>
              Shut down idle virtual machines that consistently use less than
              20% CPU to reduce unnecessary cloud expenses.
            </li>

            <li>
              Upgrade servers whose CPU usage stays above 85% to prevent
              performance bottlenecks.
            </li>

            <li>
              Enable auto-scaling for workloads with varying traffic patterns
              to optimize resource utilization.
            </li>

            <li>
              Use Reserved Instances or Savings Plans for workloads running
              continuously to reduce long-term costs.
            </li>

            <li>
              Archive infrequently accessed storage to lower-cost storage
              classes.
            </li>

            <li>
              Monitor cloud spending regularly and investigate sudden increases
              in resource usage.
            </li>

          </ul>

        </div>

      </div>

    </div>

  );

}

export default Recommendations;