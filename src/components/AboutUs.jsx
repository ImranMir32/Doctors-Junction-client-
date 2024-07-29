import React from "react";
import logo from "../assets/images/logo.png";
import "../styles/aboutus.css"; // Import the CSS file

const AboutUs = () => {
  return (
    <>
      <section className="container">
        <h2 className="page-heading about-heading">About Us</h2>
        <div className="about">
          <div className="about-img">
            <img src={logo} alt="logo" />
          </div>
          <div className="about-content">
            <p>
              Doctors-Junction is your go-to platform for hassle-free medical
              appointments. Users can effortlessly schedule appointments with
              specialist doctors from our extensive panel and manage their
              information with ease. Doctors can request to join our panel,
              expanding their patient base. Our robust notification system
              ensures that both doctors and users stay informed about
              appointments and updates. Experience efficient, convenient, and
              top-notch healthcare services with Doctors-Junction.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
