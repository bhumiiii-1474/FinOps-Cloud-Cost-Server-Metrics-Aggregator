import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
MdDashboard,
MdStorage,
MdAttachMoney,
MdAssessment
} from "react-icons/md";

function Sidebar(){

return(

<div className="sidebar">

<h2 className="logo">

FinOps

</h2>

<NavLink to="/dashboard">

<MdDashboard/>

Dashboard

</NavLink>

<NavLink to="/servers">

<MdStorage/>

Servers

</NavLink>

<NavLink to="/costs">

<MdAttachMoney/>

Cloud Cost

</NavLink>

<NavLink to="/reports">

<MdAssessment/>

Reports

</NavLink>

</div>

);

}

export default Sidebar;