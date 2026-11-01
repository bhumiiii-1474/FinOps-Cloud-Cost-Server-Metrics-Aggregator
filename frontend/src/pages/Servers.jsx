import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import api from "../service/api";
import "./Servers.css";

function Servers() {

const [servers,setServers]=useState([]);

useEffect(()=>{

loadServers();

},[]);

const loadServers=async()=>{

try{

const res=await api.get("/servers");

setServers(res.data);

}

catch(err){

console.log(err);

}

};

return(

<div className="servers-page">

<Sidebar/>

<div className="servers-content">

<Navbar/>

<h2>Server Metrics</h2>

<table>

<thead>

<tr>

<th>Server</th>

<th>CPU</th>

<th>Memory</th>

<th>Disk</th>

<th>Status</th>

</tr>

</thead>

<tbody>

{

servers.map(server=>(

<tr key={server.id}>

<td>{server.server_name}</td>

<td>{server.cpu_usage}%</td>

<td>{server.memory_usage}%</td>

<td>{server.disk_usage}%</td>

<td>

<span

className={

server.status==="Running"

?

"running"

:

"offline"

}

>

{server.status}

</span>

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

export default Servers;