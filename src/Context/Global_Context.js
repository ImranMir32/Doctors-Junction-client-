import React, { createContext, useState, useEffect } from "react";

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  // Load data from local storage when the component mounts
  const initialToken = localStorage.getItem("token") || "";
  const initialUser = JSON.parse(localStorage.getItem("user")) || {};
  const initialDoctorList =
    JSON.parse(localStorage.getItem("doctorList")) || [];
  const initialUserList = JSON.parse(localStorage.getItem("userList")) || [];
  const initialReload = JSON.parse(localStorage.getItem("reload")) || false;
  const initialApplicationList =
    JSON.parse(localStorage.getItem("applicationList")) || [];
  const initialPerosonalAppoinmentList =
    JSON.parse(localStorage.getItem("perosonalAppoinmentList")) || [];
  const initialRequestAppoinmentList =
    JSON.parse(localStorage.getItem("RequestAppoinmentList")) || [];
  const initialNotificationtList =
    JSON.parse(localStorage.getItem("notificationtList")) || [];

  const [token, setToken] = useState(initialToken);
  const [user, setUser] = useState(initialUser);
  const [doctorList, setDoctorList] = useState(initialDoctorList);
  const [userList, setUserList] = useState(initialUserList);
  const [reload, setReload] = useState(initialReload);
  const [notificationtList, setNotificationtList] = useState(
    initialNotificationtList
  );
  const [perosonalAppoinmentList, setPerosonalAppoinmentList] = useState(
    initialPerosonalAppoinmentList
  );

  const [requestAppoinmentList, setRequestAppoinmentList] = useState(
    initialRequestAppoinmentList
  );

  const [applicationList, setApplicationList] = useState(
    initialApplicationList
  );

  // Update local storage whenever state changes
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("doctorList", JSON.stringify(doctorList));
  }, [doctorList]);

  useEffect(() => {
    localStorage.setItem("userList", JSON.stringify(userList));
  }, [userList]);

  useEffect(() => {
    localStorage.setItem("reload", JSON.stringify(reload));
  }, [reload]);

  useEffect(() => {
    localStorage.setItem("applicationList", JSON.stringify(applicationList));
  }, [applicationList]);

  useEffect(() => {
    localStorage.setItem(
      "perosonalAppoinmentList",
      JSON.stringify(perosonalAppoinmentList)
    );
  }, [perosonalAppoinmentList]);

  useEffect(() => {
    localStorage.setItem(
      "requestAppoinmentList",
      JSON.stringify(requestAppoinmentList)
    );
  }, [requestAppoinmentList]);

  useEffect(() => {
    localStorage.setItem(
      "notificationtList",
      JSON.stringify(notificationtList)
    );
  }, [notificationtList]);

  return (
    <GlobalStateContext.Provider
      value={{
        user,
        token,
        doctorList,
        reload,
        applicationList,
        userList,
        perosonalAppoinmentList,
        requestAppoinmentList,
        notificationtList,
        setUser,
        setToken,
        setDoctorList,
        setReload,
        setApplicationList,
        setUserList,
        setPerosonalAppoinmentList,
        setRequestAppoinmentList,
        setNotificationtList,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
