import "./SummaryCard.css";

function SummaryCard({

title,

value,

icon,

color

}){

return(

<div
className="summary-card"
style={{
borderTop:`5px solid ${color}`
}}
>

<div>

<h4>

{title}

</h4>

<h2>

{value}

</h2>

</div>

<div
className="icon"
style={{
color
}}
>

{icon}

</div>

</div>

);

}

export default SummaryCard;