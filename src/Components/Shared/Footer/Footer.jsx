import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../../../Contexts/AuthContext/AuthProvider';

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  const { theme } = useContext(AuthContext);
  return (
    <div className={`py-10 ${theme == 'dark' ? 'text-white' : ''}`}>
      <div className="container mx-auto z-0">
        <div data-aos="fade-down" className="text-center z-0">
          <h3 className="flex justify-center items-center gap-3 font-bold text-3xl mb-3">
            Visa<span className="text-primary">Portal</span>
          </h3>
          <p className="font-medium text-base">
            Simplifying the visa application process with smart and efficient
            solutions.
          </p>
        </div>

        <div data-aos="fade-down" className="divider my-5"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div
            data-aos="fade-up"
            className="flex mx-auto items-center md:items-start flex-col gap-2"
          >
            <h2 className="mb-3 font-bold text-xl ">Navigation</h2>
            <Link className="hover:text-primary hover:font-semibold" to="/home">
              Home
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/all-visas"
            >
              All Visas
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/add-visa"
            >
              Add Visa
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/my-visas"
            >
              My Visas
            </Link>
          </div>

          <div
            data-aos="fade-up"
            className="flex flex-col mx-auto items-center md:items-start gap-2"
          >
            <h2 className="mb-3 font-bold text-xl ">Company</h2>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/about"
            >
              About Us
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/contact"
            >
              Contact Us
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/careers"
            >
              Careers
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/privacy-policy"
            >
              Privacy Policy
            </Link>
          </div>

          <div
            data-aos="fade-up"
            className="flex flex-col mx-auto items-center md:items-start gap-2"
          >
            <h2 className="mb-3 font-bold text-xl ">Resources</h2>
            <Link className="hover:text-primary hover:font-semibold" to="/faq">
              FAQs
            </Link>
            <Link className="hover:text-primary hover:font-semibold" to="/blog">
              Blog
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/support"
            >
              Support Center
            </Link>
            <Link
              className="hover:text-primary hover:font-semibold"
              to="/guides"
            >
              Visa Guides
            </Link>
          </div>

          <div
            data-aos="fade-up"
            className="flex flex-col mx-auto items-center md:items-start gap-2"
          >
            <h2 className="mb-3 font-bold text-xl ">Follow Us</h2>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/mahinuladru/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-primary"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-primary"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-primary"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-primary"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <p className="text-center mt-10">
          &copy; {new Date().getFullYear()} VisaPortal. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
