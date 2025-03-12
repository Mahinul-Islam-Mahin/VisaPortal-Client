import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisaCard from "../../../Cards/VisaCard";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import { motion } from "framer-motion";
import { FaPassport } from "react-icons/fa";
import { MdOutlineVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../../../../config';

const LatestVisas = () => {
  const [visas, setVisas] = useState([]);
  const navigate = useNavigate();
  const { theme, Toast } = useContext(AuthContext);

  useEffect(() => {
    fetch(`${API_BASE_URL}/Visa`)
      .then((res) => res.json())
      .then((data) => {
        const latestVisas = [...data].reverse().slice(0, 6);
        setVisas(latestVisas);
      })
      .catch((err) => Toast(err.message, "error"));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section className={`py-20 ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <FaPassport className="text-4xl text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              Latest Visa Opportunities
            </h2>
          </div>
          <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} max-w-2xl mx-auto`}>
            Stay informed with the most up-to-date visa information, including requirements, fees,
            and application details.
          </p>
        </motion.div>

        {/* Visa Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {visas.map((visa) => (
            <motion.div
              key={visa._id}
              variants={cardVariants}
              whileHover="hover"
              className={`rounded-2xl overflow-hidden ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-lg`}
            >
              {/* Card Header with Flag */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={visa.image}
                  alt={visa.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {visa.name}
                </h3>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Processing Time */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <MdOutlineVerified className="text-primary text-xl" />
                    </div>
                    <div>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Processing Time
                      </p>
                      <p className="font-medium">{visa.processingTime}</p>
                    </div>
                  </div>

                  {/* Fee */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">$</span>
                    </div>
                    <div>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Fee
                      </p>
                      <p className="font-medium">${visa.fee}</p>
                    </div>
                  </div>

                  {/* Validity */}
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-bold">✓</span>
                    </div>
                    <div>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                        Validity
                      </p>
                      <p className="font-medium">{visa.validity}</p>
                    </div>
                  </div>
                </div>

                {/* Learn More Button */}
                <Link to={`/visa-details/${visa._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 btn-primary"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Explore All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate("/all-visas")}
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white bg-primary rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
            <span className="relative">Explore All Visas</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestVisas;
