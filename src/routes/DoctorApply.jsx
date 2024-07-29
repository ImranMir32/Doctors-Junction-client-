import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/doctorapply.css";

import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

function DoctorApply() {
  const { applyAsDoctor } = useContext(GlobalMethodsContext);
  const navigate = useNavigate();

  const [formDetails, setFormDetails] = useState({
    description: "",
    specialist: "",
    experience: "",
    fees: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { description, specialist, experience, fees } = formDetails;

      if (!description || !specialist || !experience || !fees) {
        return toast.error("Input field should not be empty");
      }

      const res = await applyAsDoctor(formDetails);
      if (res.status === 201) {
        toast.success(`${res.data}`);
        navigate("/");
      } else {
        toast.error("Check all your information carefully");
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      <br></br>
      <section className="apply-doctor-section flex-center">
        <div className="apply-doctor-container flex-center">
          <h2 className="form-heading">Apply As Doctor</h2>
          <form onSubmit={formSubmit} className="register-form">
            <input
              type="text"
              name="description"
              className="form-input"
              placeholder="Enter your description"
              value={formDetails.description}
              onChange={inputChange}
            />
            <input
              type="text"
              name="specialist"
              className="form-input"
              placeholder="Enter your specialist"
              value={formDetails.specialist}
              onChange={inputChange}
            />
            <input
              type="text"
              name="experience"
              className="form-input"
              placeholder="Enter your experience in years"
              value={formDetails.experience}
              onChange={inputChange}
            />
            <input
              type="text"
              name="fees"
              className="form-input"
              placeholder="Enter your fees per consultation in Taka"
              value={formDetails.fees}
              onChange={inputChange}
              defaultChecked="Timings"
            />

            <button type="submit" className="btn form-btn">
              apply
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default DoctorApply;
