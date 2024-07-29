import "../styles/doctorcard.css";
import React, { useState, useContext } from "react";
import BookAppointment from "./BookAppointment";
import { toast } from "react-hot-toast";
import { GlobalStateContext } from "../Context/Global_Context";

const DoctorCard = ({ ele }) => {
  const { token } = useContext(GlobalStateContext);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => {
    if (token === "") {
      return toast.error("You must log in first");
    }
    setModalOpen(true);
  };

  return (
    <div className={`card`}>
      <div className={`card-img flex-center`}>
        <img
          src={
            ele?.userId?.imageUrl ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="profile"
        />
      </div>
      <h3 className="card-name">Dr. {ele?.userId?.name}</h3>
      <p className="specialization">
        <strong>Description: </strong>
        {ele?.description}
      </p>
      <p className="specialization">
        <strong>Specialist: </strong>
        {ele?.specialist}
      </p>

      <p className="experience">
        <strong>Experience: </strong>
        {ele?.experience} years
      </p>
      <p className="fees">
        <strong>Fees per consultation: </strong>৳ {ele?.fees}
      </p>
      <p className="phone">
        <strong>Phone: </strong>
        {ele?.userId?.phone}
      </p>
      <button className="btn appointment-btn" onClick={handleModal}>
        Book Appointment
      </button>
      {modalOpen && <BookAppointment setModalOpen={setModalOpen} ele={ele} />}
    </div>
  );
};

export default DoctorCard;
