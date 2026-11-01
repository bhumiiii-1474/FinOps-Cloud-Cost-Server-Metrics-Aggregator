# FinOps Cloud Cost & Server Metrics Aggregator

A professional, full-stack FinOps analytics platform designed to aggregate, track, and cross-reference virtual server performance metrics against operational infrastructure cloud costs. The application operates on a completely decoupled architecture, providing an intuitive tracking console to monitor system utilization, identify idle capacity, and trace cloud spending vectors.

## 🚀 Core Features
*   **Infrastructure Metrics Aggregation:** Visualizes core computing performance indexes including CPU utilization, memory distribution, and storage overhead.
*   **Financial Cost Analytics:** Maps server operating assets directly to corresponding pricing line items for clear cost-per-service auditing.
*   **Proactive Optimization Warnings:** Alerts administrators to underutilized resources and idle instances to mitigate waste.
*   **Asynchronous REST Architecture:** Decoupled layout utilizing API controllers to isolate business management algorithms from frontend representation components.

## 🛠️ Technology Stack
*   **Frontend User Interface:** React.js, JavaScript (ES6+), Modular CSS Layouts
*   **Interactive Visualizations:** Recharts Data Plotting Framework
*   **Backend Application Layer:** Node.js, Express.js Engine
*   **Database Management:** Relational Schema Architecture (`.sql`)
*   **Local Staging Strategy:** Programmed around isolated simulated data pools to prevent unauthorized live AWS endpoint exposure during core engineering diagnostics.

## 📁 Repository Organization
```text
FinOps-Cloud-Cost-Server-Metrics-Aggregator/
├── backend/          # Express API server, schema controllers, routes, and DB layers
├── frontend/         # React SPA interface, UI dashboard modules, and visualization views
├── .gitignore        # Workspace safety policy profile (hiding node_modules and secrets)
└── finopsdb.sql      # Structural relational database schema initialization blueprint
```

## ⚙️ Project Installation & Execution

### 1. Database Setup
1. Open your local relational database management console.
2. Initialize a clean instance schema workspace.
3. Import the system baseline file from the repository root to build out core entities:
   ```bash
   source finopsdb.sql
   ```

### 2. Backend Service Staging
1. Move your workspace terminal focus into the backend system container:
   ```bash
   cd backend
   ```
2. Download required system module packages:
   ```bash
   npm install
   ```
3. Create a local environment variables profile (`.env`) inside the `backend/` folder to manage database access safely (this profile is automatically ignored by Git policies):
   ```text
   DB_HOST=localhost
   DB_USER=your_local_database_user
   DB_PASSWORD=your_local_database_password
   DB_NAME=your_initialized_database_name
   PORT=5000
   ```
4. Start up the backend service listener:
   ```bash
   npm start
   ```

### 3. Frontend Interface Execution
1. Open a parallel terminal panel and move focus into the client directory:
   ```bash
   cd frontend
   ```
2. Build local client module assets:
   ```bash
   npm install
   ```
3. Initialize the high-speed local development engine workspace:
   ```bash
   npm run dev
   ```

## 🔒 Professional Architecture Note
This workspace structure is deliberately constructed following enterprise cloud scaling practices. Rather than coupling directly to specific vendor infrastructure, the system consumes data packages from standardized endpoint channels. This allows developers to drop the simulated data feeds and hook into the live **AWS SDK (AWS CloudWatch and AWS Cost Explorer)** simply by updating backend controller layers, keeping presentation states cleanly intact.
