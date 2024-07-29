import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import toast from "react-hot-toast";
import logo from "../assets/images/logo.png";

import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";

function Login() {
  const { Login } = useContext(GlobalMethodsContext);

  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = formDetails;
      if (!email || !password) {
        return toast.error("Input field should not be empty");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      }
      const values = {
        email,
        password,
      };
      const res = await Login(values);
      if (res.status === 200) {
        localStorage.setItem("token", res.data.access_token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        navigate("/");
      } else {
        toast.error("Wrong email or password !");
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <section className="register-section flex-center">
      <div className="register-container flex-center">
        <div className="logo-name">
          <img src={logo} alt="hero" className="logo" />
          <span className="project-name">Doctors🔗Junction</span>
        </div>
        <form onSubmit={formSubmit} className="register-form">
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
          <button type="submit" className="btn form-btn">
            sign in
          </button>
        </form>
        <p>
          Not a user?{" "}
          <NavLink className="login-link" to={"/register"}>
            Register
          </NavLink>
        </p>
      </div>
    </section>
  );
}

export default Login;
