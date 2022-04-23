import "./Footer.css";
import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="footer">
          <p>&copy; Copyright {(new Date()).getFullYear()} Shudipto Kumar Roy | All right reserved.</p>
      </footer>
    </>
  );
};

export default Footer;
