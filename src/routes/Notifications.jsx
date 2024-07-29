import React, { useEffect, useContext } from "react";
import "../styles/notification.css";

import Navbar from "../components/Navbar";
import "../styles/user.css";

import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";
import { GlobalStateContext } from "../Context/Global_Context";

const Notifications = () => {
  const { getAllNotifications } = useContext(GlobalMethodsContext);
  const { notificationtList } = useContext(GlobalStateContext);

  const getAllNotif = async (e) => {
    try {
      await getAllNotifications();
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllNotif();
    };

    fetchData(); // Immediately invoke the fetchData function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <>
      <Navbar />

      <section className="container notif-section">
        <h2 className="page-heading">Your Notifications</h2>

        {notificationtList.length > 0 ? (
          <div className="notifications">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Content</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {notificationtList?.map((ele, i) => {
                  return (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>{ele?.content}</td>
                      <td>{ele?.updatedAt.split("T")[0]}</td>
                      <td>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Notifications</p>
        )}
      </section>
    </>
  );
};

export default Notifications;
