import React, { useState, useContext } from "react";
import "../styles/bookappointment.css";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";

const BookAppointment = ({ setModalOpen, ele }) => {
  const { bookAnAppointment } = useContext(GlobalMethodsContext);
  const [formDetails, setFormDetails] = useState({
    date: "",
    time: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const bookAppointment = async (e) => {
    e.preventDefault();
    try {
      const value = {
        doctorId: ele?.userId?._id,
        date: formDetails.date,
        time: formDetails.time,
        doctorname: `${ele?.userId?.name}`,
      };
      const res = await bookAnAppointment(value);
      if (res.status === 201) {
        toast.success(`${res.data.msg}`);
      } else if (res.status === 400) {
        toast.warning(`${res.data}`);
      } else {
        toast.warning(`Network response was not ok`);
      }
      setModalOpen(false);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <div className="modal flex-center">
        <div className="modal__content">
          <h2 className="page-heading">Book Appointment</h2>
          <IoMdClose
            onClick={() => {
              setModalOpen(false);
            }}
            className="close-btn"
          />
          <div className="register-container flex-center book">
            <form className="register-form">
              <input
                type="date"
                name="date"
                className="form-input"
                value={formDetails.date}
                onChange={inputChange}
              />
              <input
                type="time"
                name="time"
                className="form-input"
                value={formDetails.time}
                onChange={inputChange}
              />
              <button
                type="submit"
                className="btn form-btn"
                onClick={bookAppointment}
              >
                book
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookAppointment;
