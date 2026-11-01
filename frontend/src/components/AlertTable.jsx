import "./AlertTable.css";

function AlertTable({ alerts }) {

  return (

    <div className="alert-container">

      <h3>Recent Alerts</h3>

      <table>

        <thead>

          <tr>

            <th>Server</th>

            <th>Alert</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {alerts.map((alert) => (

            <tr key={alert.id}>

              <td>{alert.alert_type}</td>

              <td>{alert.message}</td>

              <td>

                <span
                  className={
    alert.severity === "Critical"
      ? "critical"
      : "warning"
}
                >
                  {alert.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default AlertTable;