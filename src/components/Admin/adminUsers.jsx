import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import "../../styles/user.css";
import { GlobalMethodsContext } from "../../Context/GlobalMethodsContext";
import { GlobalStateContext } from "../../Context/Global_Context";

const Users = () => {
  const { getUserList, deleteUser } = useContext(GlobalMethodsContext);
  const { userList } = useContext(GlobalStateContext);

  const getAllUsers = async () => {
    try {
      await getUserList();
    } catch (error) {
      console.error("Error fetching applicants:", error);
    }
  };

  const delUser = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to Delete?");
      if (confirm) {
        console.log(id);
        const res = await deleteUser(id);
        if (res === 200) {
          toast.success(`${res.data}`);
        }
        getAllUsers();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
    };

    fetchData(); // Immediately invoke the fetchData function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <>
      <section className="user-section">
        <h3 className="home-sub-heading">All Users</h3>
        {userList.length > 0 ? (
          <div className="user-container">
            <table>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile No.</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Is Doctor</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {userList?.map((ele, i) => {
                  return (
                    <tr key={ele?._id}>
                      <td>{i + 1}</td>
                      <td>
                        <img
                          className="user-table-pic"
                          src={ele?.imageUrl}
                          alt={ele?.name}
                        />
                      </td>
                      <td>{ele?.name}</td>
                      <td>{ele?.email}</td>
                      <td>{ele?.phone}</td>
                      <td>{ele?.age}</td>
                      <td>{ele?.gender}</td>
                      <td>{ele?.isDoctor ? "Yes" : "No"}</td>
                      <td className="select">
                        <button
                          className="btn user-btn"
                          onClick={() => {
                            delUser(ele?._id);
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
          <p>No Users</p>
        )}
      </section>
    </>
  );
};

export default Users;
