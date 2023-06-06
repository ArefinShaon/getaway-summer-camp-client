
import { FaFacebook, FaTwitter, FaEnvelope } from "react-icons/fa";
import logo from "../../../assets/dark-logo-img.png";

const Footer = () => {
  return (
    <footer className="footer lg:h-72 p-10 bg-gray-200 text-base-content">
      <div>
        <img className="w-64" src={logo} alt="" />
        <p>
          ACME Industries Ltd.
          <br />
          Providing reliable tech since 1992
          <br />
          <br />
          @ Copyright Getaway
          <br />
          Built with Getaway by Arefin Shaon
        </p>
      </div>
      <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Press kit</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="icon" size={30} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="icon" size={30} />
        </a>
        <a href="mailto:example@gmail.com">
          <FaEnvelope className="icon" size={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;