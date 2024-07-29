import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HeroSlider.css";

import { NextArrow, PrevArrow } from "../helper/CustomArrows"; // Import custom arrow components

import heart from "../assets/slides/heart.jpg";
import slide3 from "../assets/slides/slide3.jpg";
import bone from "../assets/slides/bone.jpeg";
import child from "../assets/slides/child.jpg";
import brain from "../assets/slides/brain.jpg";
import cancer from "../assets/slides/cancer.jpg";
import skin from "../assets/slides/skin.jpeg";

const HeroSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const slides = [
    {
      image: heart,
      title: "Heart Specialists",
      description:
        "Our cardiologists are experts in diagnosing and treating heart diseases and conditions. They provide comprehensive care to keep your heart healthy.",
    },

    {
      image: brain,
      title: "Brain and Nervous System Care",
      description:
        "Our neurologists diagnose and treat disorders of the brain and nervous system, including stroke, epilepsy, and multiple sclerosis.",
    },
    {
      image: child,
      title: "Child Health Specialists",
      description:
        "Our pediatricians are dedicated to the health and well-being of infants, children, and adolescents, providing compassionate and comprehensive care.",
    },
    {
      image: bone,
      title: "Bone and Joint Experts",
      description:
        "Our orthopedic surgeons specialize in the diagnosis, treatment, and rehabilitation of musculoskeletal conditions, helping you regain mobility and strength.",
    },
    {
      image: slide3,
      title: "Digestive Health Specialists",
      description:
        "Our gastroenterologists focus on the digestive system and its disorders, offering treatments for conditions like IBS, GERD, and liver diseases.",
    },
    {
      image: cancer,
      title: "Cancer Care Experts",
      description:
        "Our oncologists provide comprehensive cancer care, from diagnosis to treatment and support, using the latest therapies and technologies.",
    },
    {
      image: skin,
      title: "Skin Care Experts",
      description:
        "Our dermatologists specialize in skin health, offering treatments for various skin conditions, from acne to severe dermatological issues.",
    },
  ];

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.image} alt={slide.title} className="slide-image" />
            <div className="slide-content">
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
