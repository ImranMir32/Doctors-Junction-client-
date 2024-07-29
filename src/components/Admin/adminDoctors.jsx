import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import "../../styles/user.css";
import { GlobalMethodsContext } from "../../Context/GlobalMethodsContext";
import { GlobalStateContext } from "../../Context/Global_Context";

const AdminDoctors = () => {
  const { getDoctorList, deleteDoctor } = useContext(GlobalMethodsContext);
  const { doctorList } = useContext(GlobalStateContext);

  const getAllDoc = async () => {
    try {
      await getDoctorList();
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const delUser = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to Delete?");
      if (confirm) {
        console.log(id);
        const res = await deleteDoctor(id);
        if (res === 200) {
          toast.success(`${res.data}`);
        }
        getAllDoc();
      }
    } catch (error) {
      return error;
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
      <section className="user-section">
        <h3 className="home-sub-heading">All Doctors</h3>
        {doctorList.length > 0 ? (
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
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {doctorList?.map((ele, i) => {
                  return (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          className="user-table-pic"
                          src={ele?.userId?.imageUrl}
                          alt={ele?.userId?.name}
                        />
                      </td>
                      <td>{ele?.userId?.name}</td>

                      <td>{ele?.description}</td>
                      <td>{ele?.specialist}</td>
                      <td>{ele?.userId?.email}</td>
                      <td>{ele?.userId?.phone}</td>
                      <td>{ele?.experience}</td>
                      <td>{ele?.fees}</td>
                      <td className="select">
                        <button
                          className="btn user-btn"
                          onClick={() => {
                            delUser(ele?.userId?._id);
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No Doctors</p>
        )}
      </section>
    </>
  );
};

export default AdminDoctors;
