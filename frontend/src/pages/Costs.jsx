import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import MetricChart from "../components/MetricChart";
import api from "../service/api";
import "./Costs.css";

function Costs() {

  const [services, setServices] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    loadCosts();
  }, []);

  const loadCosts = async () => {

    try {

      const serviceRes = await api.get("/costs/services");
      const chartRes = await api.get("/costs/chart");

      setServices(serviceRes.data);
      setChartData(chartRes.data);

    } catch (err) {

      console.log(err);

    }

  };

  const totalCost = services.reduce(
    (sum, item) => sum + Number(item.monthly_cost),
    0
  );

  return (

    <div className="cost-page">

      <Sidebar />

      <div className="cost-content">

        <Navbar />

        <h2>Cloud Cost Analysis</h2>

        <div className="summary-boxes">

          <div className="box">

            <h3>Total Monthly Cost</h3>

            <h1>₹ {totalCost}</h1>

          </div>

          <div className="box">

            <h3>Total Services</h3>

            <h1>{services.length}</h1>

          </div>

        </div>

        <MetricChart
          title="Monthly Cost"
          data={chartData}
          dataKey="monthly_cost"
        />

        <h3>Cloud Services</h3>

        <table>

          <thead>

            <tr>

              <th>Service</th>

              <th>Monthly Cost</th>

              <th>Usage</th>

            </tr>

          </thead>

          <tbody>

            {

              services.map(service => (

                <tr key={service.id}>

                  <td>{service.service_name}</td>

                  <td>₹ {service.monthly_cost}</td>

                  <td>{service.usage}</td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Costs;