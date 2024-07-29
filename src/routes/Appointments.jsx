import React, { useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import "../styles/user.css";

import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";
import { GlobalStateContext } from "../Context/Global_Context";

const Appointments = () => {
  const { getAllperosonalAppoinment } = useContext(GlobalMethodsContext);
  const { user, perosonalAppoinmentList } = useContext(GlobalStateContext);

  const getAllAppoint = async (e) => {
    try {
      await getAllperosonalAppoinment();
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };

  const complete = async (ele) => {
    // const value = {
    //   appointid: ele?._id,
    //   doctorId: ele?.doctorId?._id,
    //   doctorname: ele?.userId?.name,
    // };
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllAppoint();
    };

    fetchData(); // Immediately invoke the fetchData function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <>
      <Navbar />

      <section className="container notif-section">
        <h2 className="page-heading">Your Appointments</h2>

        {perosonalAppoinmentList.length > 0 ? (
          <div className="appointments">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Doctor</th>
                  <th>Patient</th>
                  <th>Appointment Date</th>
                  <th>Appointment Time</th>
                  <th>Booking Date</th>
                  <th>Booking Time</th>
                  <th>Status</th>
                  {console.log(user.id)}
                  {user.id === perosonalAppoinmentList[0].doctorId?._id ? (
                    <th>Action</th>
                  ) : (
                    <></>
                  )}
                </tr>
              </thead>
              <tbody>
                {perosonalAppoinmentList?.map((ele, i) => {
                  return (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>{ele?.doctorId?.name}</td>
                      <td>{ele?.userId?.name}</td>
                      <td>{ele?.date}</td>
                      <td>{ele?.time}</td>
                      <td>{ele?.createdAt.split("T")[0]}</td>
                      <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                      <td>{ele?.status}</td>
                      {user.id === ele?.doctorId?._id ? (
                        <td>
                          <button
                            className={`btn user-btn accept-btn ${
                              ele?.status === "Accepted" ? "disable-btn" : ""
                            }`}
                            disabled={ele?.status === "Accepted"}
                            onClick={() => complete(ele)}
                          >
                            Accept
                          </button>
                        </td>
                      ) : (
                        <></>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Appointments</p>
        )}
      </section>
    </>
  );
};
export default Appointments;
