import React from "react";
import Contact from "../components/Contact";
import AboutUs from "../components/AboutUs";
import Footer from "../components/Footer";
import HeroSlider from "../components/HeroSlider";
import Navbar from "../components/Navbar";
import HomeCircles from "../components/HomeCircles";

const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <AboutUs />
      <HomeCircles />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
