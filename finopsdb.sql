-- =====================================================
-- FinOps Cloud Cost & Server Metrics Aggregator
-- Final Multi User PostgreSQL Database
-- =====================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DROP TABLE IF EXISTS recommendations CASCADE;
DROP TABLE IF EXISTS alerts CASCADE;
DROP TABLE IF EXISTS server_history CASCADE;
DROP TABLE IF EXISTS daily_costs CASCADE;
DROP TABLE IF EXISTS reports CASCADE;
DROP TABLE IF EXISTS cloud_costs CASCADE;
DROP TABLE IF EXISTS servers CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- USERS
CREATE TABLE users(
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role VARCHAR(20) DEFAULT 'User',
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SERVERS
CREATE TABLE servers(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
server_name VARCHAR(100) NOT NULL,
provider VARCHAR(30),
region VARCHAR(50),
instance_type VARCHAR(50),
cpu_usage DECIMAL(5,2),
memory_usage DECIMAL(5,2),
disk_usage DECIMAL(5,2),
status VARCHAR(20),
monthly_cost DECIMAL(10,2),
last_used TIMESTAMP,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CLOUD COSTS
CREATE TABLE cloud_costs(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
provider VARCHAR(30),
service_name VARCHAR(100),
monthly_cost DECIMAL(10,2),
estimated_cost DECIMAL(10,2),
budget DECIMAL(10,2),
usage VARCHAR(100),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DAILY COSTS
CREATE TABLE daily_costs(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
service_name VARCHAR(100),
cost DECIMAL(10,2),
cost_date DATE
);

-- SERVER HISTORY
CREATE TABLE server_history(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
server_id INT REFERENCES servers(id) ON DELETE CASCADE,
cpu_usage DECIMAL(5,2),
memory_usage DECIMAL(5,2),
disk_usage DECIMAL(5,2),
recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ALERTS
CREATE TABLE alerts(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
server_id INT REFERENCES servers(id) ON DELETE CASCADE,
alert_type VARCHAR(100),
message TEXT,
severity VARCHAR(20),
status VARCHAR(20),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- RECOMMENDATIONS
CREATE TABLE recommendations(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
server_id INT REFERENCES servers(id) ON DELETE CASCADE,
recommendation TEXT,
estimated_saving DECIMAL(10,2),
status VARCHAR(30),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- REPORTS
CREATE TABLE reports(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) ON DELETE CASCADE,
report_name VARCHAR(100),
generated_date DATE,
status VARCHAR(30),
file_name VARCHAR(150),
file_path VARCHAR(250),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USERS DATA (bcrypt passwords)
INSERT INTO users(name,email,password,role)
VALUES
('Bhumika','bhumika14@gmail.com',crypt('123456',gen_salt('bf',10)),'Admin'),
('Admin','admin@gmail.com',crypt('admin123',gen_salt('bf',10)),'Admin');


-- SERVERS DATA
INSERT INTO servers(user_id,server_name,provider,region,instance_type,cpu_usage,memory_usage,disk_usage,status,monthly_cost,last_used)
VALUES
(1,'AWS-EC2-01','AWS','ap-south-1','t3.medium',65,72,54,'Running',4200,NOW()),
(1,'AWS-EC2-02','AWS','ap-south-1','t3.large',81,68,61,'Running',5200,NOW()-INTERVAL '5 day'),
(2,'Azure-VM-01','Azure','Central India','Standard_B2s',45,52,34,'Running',3500,NOW()-INTERVAL '2 day'),
(2,'Google-VM-01','Google Cloud','asia-south1','e2-medium',90,88,79,'Running',6100,NOW()),
(1,'Server-05','AWS','us-east-1','t2.micro',10,20,15,'Stopped',900,NOW()-INTERVAL '35 day');


-- CLOUD COST DATA
INSERT INTO cloud_costs(user_id,provider,service_name,monthly_cost,estimated_cost,budget,usage)
VALUES
(1,'AWS','EC2',5000,5400,7000,'120 Hours'),
(1,'AWS','S3',2000,2200,3000,'500 GB'),
(2,'Azure','Virtual Machine',3400,3600,5000,'85 Hours'),
(2,'Google Cloud','Compute Engine',2700,3000,4000,'90 Hours');


-- DAILY COST DATA
INSERT INTO daily_costs(user_id,service_name,cost,cost_date)
VALUES
(1,'EC2',700,'2026-07-17'),
(1,'EC2',850,'2026-07-18'),
(1,'EC2',900,'2026-07-19'),
(1,'EC2',820,'2026-07-20'),
(1,'EC2',980,'2026-07-21'),
(2,'EC2',1100,'2026-07-22'),
(2,'EC2',1200,'2026-07-23');


-- SERVER HISTORY DATA
INSERT INTO server_history(user_id,server_id,cpu_usage,memory_usage,disk_usage)
VALUES
(1,1,50,65,45),
(1,1,58,67,47),
(1,1,63,70,50),
(1,1,65,72,54),
(1,2,81,68,61),
(2,3,45,52,34),
(2,4,90,88,79);


-- ALERT DATA
INSERT INTO alerts(user_id,server_id,alert_type,message,severity,status)
VALUES
(2,4,'CPU','CPU usage above 90%','Critical','Open'),
(1,2,'Memory','Memory usage above 80%','High','Open'),
(1,5,'Inactive','Server unused for 35 days','Medium','Open'),
(1,1,'Disk','Disk utilization crossed 80%','Low','Resolved');


-- RECOMMENDATIONS DATA
INSERT INTO recommendations(user_id,server_id,recommendation,estimated_saving,status)
VALUES
(1,5,'Terminate unused server',900,'Pending'),
(1,2,'Resize instance to smaller type',1500,'Pending'),
(2,4,'Enable Auto Scaling',2000,'Approved');


-- REPORT DATA
INSERT INTO reports(user_id,report_name,generated_date,status,file_name,file_path)
VALUES
(1,'Weekly Cost Report','2026-07-18','Available','weekly_cost.pdf','/reports/weekly_cost.pdf'),
(1,'Monthly Cost Report','2026-07-20','Available','monthly_cost.pdf','/reports/monthly_cost.pdf'),
(2,'Cloud Utilization Report','2026-07-21','Available','utilization.pdf','/reports/utilization.pdf'),
(2,'Server Performance Report','2026-07-22','Available','performance.pdf','/reports/performance.pdf');

