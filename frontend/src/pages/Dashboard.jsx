import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import SummaryCard from "../components/SummaryCard";
import MetricChart from "../components/MetricChart";
import AlertTable from "../components/AlertTable";

import api from "../service/api";

import "./Dashboards.css";

function Dashboard(){

const [summary,setSummary]=useState({});
const [chart,setChart]=useState([]);
const [alerts,setAlerts]=useState([]);

useEffect(()=>{

loadDashboard();

},[]);


const loadDashboard=async()=>{

try{

const summaryRes=await api.get("/dashboard/summary");

const chartRes=await api.get("/costs/chart");

const alertRes=await api.get("/servers/alerts");


console.log("Dashboard Summary:", summaryRes.data);


setSummary(summaryRes.data);

setChart(chartRes.data);

setAlerts(alertRes.data);


}

catch(err){

console.log(err);

}

}


return(

<div className="dashboard">

<Sidebar/>

<div className="dashboard-main">

<Navbar/>


<div className="cards">


<SummaryCard

title="Total Cost"

value={`₹ ${summary.total_cost || 0}`}

/>


<SummaryCard

title="Running Servers"

value={summary.running_servers || 0}

/>


<SummaryCard

title="Average CPU"

value={`${summary.avg_cpu || 0}%`}

/>


<SummaryCard

title="Average Memory"

value={`${summary.avg_memory || 0}%`}

/>


</div>


<MetricChart

title="Cloud Cost"

data={chart}

dataKey="monthly_cost"

/>


<AlertTable

alerts={alerts}

/>


</div>

</div>

);

}

export default Dashboard;