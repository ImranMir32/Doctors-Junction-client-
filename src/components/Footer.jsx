import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-bottom">
          © {new Date().getFullYear()}
          {", "}All rights reserved by{" "}
          <a
            href="https://www.linkedin.com/in/md-imran-mir/"
            target="_blank"
            rel="noreferrer"
          >
            Md Imran Mir
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
