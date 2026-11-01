import "./Navbar.css";

function Navbar() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="navbar">

      <div>
        <h2>FinOps Dashboard</h2>
        <p>Cloud Cost & Server Metrics Aggregator</p>
      </div>


      <div className="profile">

        <img
          src={`https://ui-avatars.com/api/?name=${user?.name || "Admin"}`}
          alt="profile"
        />


        <div>

          <h4>
            {user?.name || "Administrator"}
          </h4>


          <span>
            {user?.role || "Cloud Admin"}
          </span>

        </div>

      </div>

    </div>
  );
}

export default Navbar;