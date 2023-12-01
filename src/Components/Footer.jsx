import React from "react";
import { Link } from "react-router-dom";
import "../style/Footer.css";
import { ReactComponent as Logo } from "../Assets/Logo.svg";
import { FaPhone, FaEnvelope, FaMapLocationDot } from "react-icons/fa6";
const Footer = () => {
  return (
    <footer>
      <Logo style={{ fill: "var(--primary-color)" }} />
      <div>
        <span>
          <h3>University of North Texas</h3>
          <Link to="https://dining.unt.edu/">UNT dining services</Link> <br />
          <br />
          <Link to="https://www.unt.edu/">University of North Texas</Link>/
        </span>
        <span>
          <h3>Contact us</h3>
          <p>
            <FaPhone />
            123-123-1234
          </p>
          <p>
            {" "}
            <FaEnvelope />
            untcanteen@gmail.edu
          </p>
        </span>
      </div>
      <div>
        <h3>UNT Canteen </h3>
        <a href="https://www.google.com/maps/place/Discovery+Park/@33.2544317,-97.1511113,15.7z/data=!4m6!3m5!1s0x864db595faebd6e7:0x522282b77f411583!8m2!3d33.2537918!4d-97.1526031!16s%2Fg%2F11f2wdnwgl?entry=ttu">
          <FaMapLocationDot /> Unt Canteen
        </a>
        <p>3940 N Elm St, Denton, Tx 76207</p>
      </div>
    </footer>
  );
};
export default Footer;
