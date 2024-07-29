// CustomArrows.js
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "../styles/CustomArrows.css"; // Import CSS for custom arrows

export const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow next" onClick={onClick}>
      <FaChevronRight />
    </div>
  );
};

export const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-arrow prev" onClick={onClick}>
      <FaChevronLeft />
    </div>
  );
};
