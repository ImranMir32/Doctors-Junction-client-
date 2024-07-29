import React, { useEffect, useContext } from "react";
import "../../styles/user.css";
import { GlobalMethodsContext } from "../../Context/GlobalMethodsContext";
import { GlobalStateContext } from "../../Context/Global_Context";
import toast from "react-hot-toast";

const AdminApplicants = () => {
  const { getApplicantdoctors, acceptDoctor, rejectDoctor } =
    useContext(GlobalMethodsContext);
  const { applicationList } = useContext(GlobalStateContext);

  const getAllApp = async () => {
    try {
      await getApplicantdoctors();
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const acceptUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to accept?");
      if (confirm) {
        console.log(userId);
        const res = await acceptDoctor(userId);
        if (res === 200) {
          toast.success(`${res.data}`);
        }
        getAllApp();
      }
    } catch (error) {
      return error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to Delete?");
      if (confirm) {
        console.log(userId);
        const res = await rejectDoctor(userId);
        if (res === 200) {
          toast.success(`${res.data}`);
        }
        getAllApp();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllApp();
    };

    fetchData(); // Immediately invoke the fetchData function

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <>
      <section className="user-section">
        <h3 className="home-sub-heading">All Applications</h3>
        {applicationList.length > 0 ? (
          <div className="user-container">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Specialist</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Experience</th>
                  <th>Fees</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applicationList?.map((ele, i) => {
                  return (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          className="user-table-pic"
                          src={
                            ele?.userId?.imageUrl ||
                            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                          }
                          alt={ele?.userId?.firstname}
                        />
                      </td>
                      <td>{ele?.userId?.name}</td>
                      <td>{ele?.description}</td>
                      <td>{ele?.specialist}</td>
                      <td>{ele?.userId?.email}</td>
                      <td>{ele?.userId?.phone}</td>
                      <td>{ele?.experience}</td>
                      {/* <td>jsdhjkhdskfhsjahj.klzbfs.jkgvsvkdrbgl/ksnh</td> */}
                      <td>{ele?.fees}</td>

                      <td className="select">
                        <button
                          className="btn user-btn accept-btn"
                          onClick={() => {
                            acceptUser(ele?.userId?._id);
                          }}
                        >
                          Accept
                        </button>
                        <button
                          className="btn user-btn"
                          onClick={() => {
                            deleteUser(ele?.userId?._id);
                          }}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No applications</p>
        )}
      </section>
    </>
  );
};

export default AdminApplicants;
