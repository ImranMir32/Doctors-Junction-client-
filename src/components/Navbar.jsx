import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";

import logo from "../assets/images/logo.png";

import { GlobalStateContext } from "../Context/Global_Context";
import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";

const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const navigate = useNavigate();

  const { user, token } = useContext(GlobalStateContext);
  const { clearAllData } = useContext(GlobalMethodsContext);

  const logoutFunc = async () => {
    await clearAllData();
    navigate("/");
  };

  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink className="navbar-brand" to="/">
            <img src={logo} alt="hero" className="logo" />
            <span className="project-name">Doctors🔗Junction</span>
          </NavLink>
        </h2>
        <ul className="nav-links">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/doctors"}>Doctors</NavLink>
          </li>
          {token && user.isAdmin && (
            <li>
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
            </li>
          )}
          {token && !user.isAdmin && (
            <>
              <li>
                <NavLink to={"/appointments"}>Appointments</NavLink>
              </li>
              {token && user.isDoctor && (
                <li>
                  <NavLink to={"/requests"}>Request</NavLink>
                </li>
              )}
              <li>
                <NavLink to={"/notifications"}>Notifications</NavLink>
              </li>
              <li>
                <NavLink to={"/apply"}>Apply for doctor</NavLink>
              </li>
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
            </>
          )}
          {!token ? (
            <>
              <li>
                <NavLink className="btn" to={"/login"}>
                  Login
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span className="btn" onClick={logoutFunc}>
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>
      <div className="menu-icons">
        {!iconActive && (
          <FiMenu
            className="menu-open"
            onClick={() => {
              setIconActive(true);
            }}
          />
        )}
        {iconActive && (
          <RxCross1
            className="menu-close"
            onClick={() => {
              setIconActive(false);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
