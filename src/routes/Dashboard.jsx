import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/admin/dashboard.css";
import Navbar from "../components/Navbar";
import AdminApplicants from "../components/Admin/adminApplicants";
import AdminUsers from "../components/Admin/adminUsers";
import AdminDoctors from "../components/Admin/adminDoctors";
import AdminAppointments from "../components/Admin/adminAppointments";

const Dashboard = () => {
  const [page, setPage] = useState("Applications");

  const handleButtonClick = (param) => {
    setPage(param);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <h1>Admin Dashboard</h1>
        <nav className="dashboard-nav">
          <Link onClick={() => handleButtonClick("Applications")}>
            Doctor Applicants
          </Link>
          <Link onClick={() => handleButtonClick("Users")}>User's List</Link>
          <Link onClick={() => handleButtonClick("Doctors")}>
            Doctor's List
          </Link>
          <Link onClick={() => handleButtonClick("Appointment")}>
            Appointment List
          </Link>
        </nav>
      </div>
      {page === "Applications" && <AdminApplicants />}
      {page === "Users" && <AdminUsers />}
      {page === "Doctors" && <AdminDoctors />}
      {page === "Appointment" && <AdminAppointments />}

      <div className="free-space"></div>
    </>
  );
};

export default Dashboard;
