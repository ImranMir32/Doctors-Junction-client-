import React, { useContext, useEffect } from "react";
import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/doctors.css";

import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";
import { GlobalStateContext } from "../Context/Global_Context";

const Doctors = () => {
  const { getDoctorList } = useContext(GlobalMethodsContext);
  const { doctorList } = useContext(GlobalStateContext);

  const getAllDoc = async () => {
    try {
      await getDoctorList();
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllDoc();
    };

    fetchData(); // Immediately invoke the fetchData function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <>
      <Navbar />
      <section className="container doctors">
        <h2 className="page-heading">Our Doctors</h2>
        <div className="doctors-card-container">
          {doctorList.map((ele) => {
            return <DoctorCard ele={ele} key={ele._id} />;
          })}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Doctors;
