import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Servers from "./pages/Servers";
import Costs from "./pages/Costs";
import Reports from "./pages/Reports";
import Recommendations from "./pages/Recommendations";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/servers" element={<Servers />} />

        <Route path="/costs" element={<Costs />} />

        <Route path="/reports" element={<Reports />} />

        <Route path="/recommendations" element={<Recommendations />} />

        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </BrowserRouter>

  );

}


export default App;