import { GlobalStateContext } from "./Global_Context";
import React, { createContext, useContext, useEffect } from "react";
import axios from "axios";

const GlobalMethodsContext = createContext();

const GlobalMethodsProvider = ({ children }) => {
  const {
    user,
    token,
    setToken,
    setUser,
    setApplicationList,
    setUserList,
    setDoctorList,
    setPerosonalAppoinmentList,
    setNotificationtList,
    setRequestAppoinmentList,
  } = useContext(GlobalStateContext);

  // Load token and user data from local storage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setToken, setUser]);

  // Update local storage whenever token or user changes
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const Login = async (values) => {
    try {
      const url = "https://doctors-junction-server.onrender.com/api/user/login";
      const response = await axios({
        method: "POST",
        url,
        data: values,
      });

      console.log(response);
      setToken(response.data.access_token);
      setUser(response.data.user);
      // const params = response.data.access_token;
      // await getAllContacts(params);
      return response;
    } catch (error) {
      return 401;
    }
  };

  const Register = async (values) => {
    try {
      const url =
        "https://doctors-junction-server.onrender.com/api/user/register";
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("image", values.imageUrl); // Change this to 'image'

      const response = await axios({
        method: "POST",
        url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        validateStatus: (status) => {
          return status >= 200 && status <= 400; // Customize this condition as needed
        },
      });

      return response;
    } catch (error) {
      return error.message;
    }
  };

  const updateUserInfo = async (values) => {
    try {
      const url = `https://doctors-junction-server.onrender.com/api/user/${user._id}`;
      const response = await axios({
        method: "PUT",
        url,
        data: values,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => {
          // Return true if the status is within the 2xx range (successful)
          // Return false if you want to treat certain status codes as errors
          return status >= 200 && status <= 401; // Customize this condition as needed
        },
      });

      if (response.status === 200) setUser(response.data);

      return response;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const applyAsDoctor = async (formDetails) => {
    try {
      const url =
        "https://doctors-junction-server.onrender.com/api/doctor/apply";
      const response = await axios({
        method: "POST",
        url,
        data: formDetails,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      // const params = response.data.access_token;
      // await getAllContacts(params);
      return response;
    } catch (error) {
      return 401;
    }
  };

  const getApplicantdoctors = async () => {
    try {
      const url =
        "https://doctors-junction-server.onrender.com/api/doctor/applicant-doctors";
      const response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplicationList(response.data);
      console.log(response.data);
      return;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const acceptDoctor = async (id) => {
    try {
      const url = `https://doctors-junction-server.onrender.com/api/doctor/accept-doctor/${id}`;
      const response = await axios({
        method: "PUT",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => {
          // Return true if the status is within the 2xx range (successful)
          // Return false if you want to treat certain status codes as errors
          return status >= 200 && status <= 401; // Customize this condition as needed
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const rejectDoctor = async (id) => {
    try {
      const url = `https://doctors-junction-server.onrender.com/api/doctor/reject-doctor/${id}`;
      const response = await axios({
        method: "DELETE",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => {
          // Return true if the status is within the 2xx range (successful)
          // Return false if you want to treat certain status codes as errors
          return status >= 200 && status <= 401; // Customize this condition as needed
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const getUserList = async () => {
    try {
      const url = "https://doctors-junction-server.onrender.com/api/user/";
      const response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserList(response.data);
      console.log(response.data);
      return;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const deleteUser = async (id) => {
    try {
      const url = `https://doctors-junction-server.onrender.com/api/user/${id}`;
      const response = await axios({
        method: "DELETE",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => {
          // Return true if the status is within the 2xx range (successful)
          // Return false if you want to treat certain status codes as errors
          return status >= 200 && status <= 401; // Customize this condition as needed
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const getDoctorList = async () => {
    try {
      const url = "https://doctors-junction-server.onrender.com/api/doctor/";
      const response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDoctorList(response.data);
      console.log(response.data);
      return;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const deleteDoctor = async (id) => {
    try {
      const url = `https://doctors-junction-server.onrender.com/api/doctor/${id}`;
      const response = await axios({
        method: "DELETE",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => {
          // Return true if the status is within the 2xx range (successful)
          // Return false if you want to treat certain status codes as errors
          return status >= 200 && status <= 401; // Customize this condition as needed
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const bookAnAppointment = async (value) => {
    try {
      const url =
        "https://doctors-junction-server.onrender.com/api/appointment/";
      const response = await axios({
        method: "POST",
        url,
        data: value,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response);
      // const params = response.data.access_token;
      // await getAllContacts(params);
      return response;
    } catch (error) {
      return 401;
    }
  };

  const getAllperosonalAppoinment = async () => {
    try {
      console.log(user._id);
      const url = `https://doctors-junction-server.onrender.com/api/appointment/${user._id}`;
      const response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPerosonalAppoinmentList(response.data);
      console.log(response.data);
      return;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const getAllAppoinment = async () => {
    try {
      console.log(user._id);
      const url = `https://doctors-junction-server.onrender.com/api/appointment/`;
      const response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPerosonalAppoinmentList(response.data);
      console.log(response.data);
      return;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const getRequestAppoinment = async () => {
    try {
      console.log(user._id);
      const url = `https://doctors-junction-server.onrender.com/api/appointment/requests/${user._id}`;
      const response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequestAppoinmentList(response.data);
      console.log(response.data);
      return;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const acceptAppointment = async (value) => {
    try {
      const url = `https://doctors-junction-server.onrender.com/api/appointment/`;
      const response = await axios({
        method: "PUT",
        url,
        data: value,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const getAllNotifications = async () => {
    try {
      const url = `https://doctors-junction-server.onrender.com/api/notifications`;
      const response = await axios({
        method: "GET",
        url,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNotificationtList(response.data);
      console.log(response.data);
      return;
    } catch (error) {
      console.log(error.message);
      return 500;
    }
  };

  const clearAllData = () => {
    setToken("");
    setUser("");
  };

  return (
    <GlobalMethodsContext.Provider
      value={{
        clearAllData,
        Login,
        Register,
        updateUserInfo,
        applyAsDoctor,
        getApplicantdoctors,
        acceptDoctor,
        rejectDoctor,
        getUserList,
        deleteUser,
        getDoctorList,
        deleteDoctor,
        bookAnAppointment,
        getAllperosonalAppoinment,
        getAllNotifications,
        getAllAppoinment,
        acceptAppointment,
        getRequestAppoinment,
      }}
    >
      {children}
    </GlobalMethodsContext.Provider>
  );
};
export { GlobalMethodsContext, GlobalMethodsProvider };
