import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h3>Contact Us</h3>
        <p><FaEnvelope className="icon" /> info@tembeakenya.com</p>
        <p><FaPhone className="icon" /> +254 700 000000</p>
      </div>

      <div className="footer-section">
        <h3>Partners</h3>
        <div className="partners">
          <div className="partner-logo">KWS</div>
          <div className="partner-logo">KTB</div>
          <div className="partner-logo">Magical Kenya</div>
        </div>
      </div>

      <div className="footer-section">
        <h3>Follow Us</h3>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Tembea Kenya. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;