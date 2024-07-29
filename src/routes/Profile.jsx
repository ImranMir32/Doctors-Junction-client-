import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import "../styles/profile.css";
import toast, { Toaster } from "react-hot-toast";
import { GlobalStateContext } from "../Context/Global_Context";
import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";

function Profile() {
  const { user } = useContext(GlobalStateContext);
  const { updateUserInfo } = useContext(GlobalMethodsContext);
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    gender: "neither",
    address: "",
    password: "",
    confpassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormDetails({
        name: user.name || "",
        email: user.email || "",
        age: user.age || "",
        phone: user.phone || "",
        gender: user.gender || "neither",
        address: user.address || "",
        password: "",
        confpassword: "",
      });
    }
  }, [user]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const { name, email, age, phone, address, gender, password, confpassword } =
      formDetails;

    if (!email) {
      return toast.error("Email should not be empty");
    } else if (name.length < 3) {
      return toast.error("First name must be at least 3 characters long");
    } else if (password.length < 5) {
      return toast.error("Password must be at least 5 characters long");
    } else if (password !== confpassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const values = {
        name,
        email,
        gender,
        phone,
        age,
        address,
        password,
      };
      const response = await updateUserInfo(values);
      if (response.status === 200) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Unable to update profile");
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <section className="register-section flex-center">
        <div className="profile-container flex-center">
          <h2 className="form-heading">Profile</h2>
          <img src={user?.imageUrl} alt="profile" className="profile-pic" />
          <form onSubmit={formSubmit} className="register-form">
            <div className="form-same-row">
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Enter your first name"
                value={formDetails.name}
                onChange={inputChange}
              />
            </div>
            <div className="form-same-row">
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Enter your email"
                value={formDetails.email}
                onChange={inputChange}
              />
              <select
                name="gender"
                value={formDetails.gender}
                className="form-input"
                id="gender"
                onChange={inputChange}
              >
                <option value="neither">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="form-same-row">
              <input
                type="text"
                name="age"
                className="form-input"
                placeholder="Enter your age"
                value={formDetails.age}
                onChange={inputChange}
              />
              <input
                type="text"
                name="phone"
                className="form-input"
                placeholder="Enter your phone number"
                value={formDetails.phone}
                onChange={inputChange}
              />
            </div>
            <textarea
              type="text"
              name="address"
              className="form-input"
              placeholder="Enter your address"
              value={formDetails.address}
              onChange={inputChange}
              rows="2"
            ></textarea>
            <div className="form-same-row">
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formDetails.password}
                onChange={inputChange}
              />
              <input
                type="password"
                name="confpassword"
                className="form-input"
                placeholder="Confirm your password"
                value={formDetails.confpassword}
                onChange={inputChange}
              />
            </div>
            <button type="submit" className="btn form-btn">
              Update
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
