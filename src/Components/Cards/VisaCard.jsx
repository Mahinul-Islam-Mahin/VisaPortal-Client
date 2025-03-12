import { Link } from "react-router-dom";
import { FiType } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCalendarCheck } from "react-icons/bs";
import { FaClipboardList } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import { motion } from "framer-motion";

const VisaCard = ({ visa }) => {
  const {
    countryImage,
    countryName,
    visaType,
    fee,
    validity,
    processingTime,
    applicationMethod,
  } = visa;
  const { theme } = useContext(AuthContext);

  const infoItem = `flex items-center gap-3 text-sm md:text-base ${
    theme === "dark" ? "text-gray-300" : "text-gray-700"
  } mb-2`;

  return (
    <div
      className={`relative overflow-hidden rounded-xl ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary"></div>
      </div>

      {/* Content */}
      <div className="relative">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={countryImage}
            alt={`${countryName} Visa`}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-0 left-0 right-0 p-4"
          >
            <h2 className="text-2xl font-bold text-white">
              {countryName}
            </h2>
            <p className="text-white/80 text-sm">{visaType}</p>
          </motion.div>
        </div>

        {/* Info Section */}
        <div className="p-5 space-y-4">
          {/* Details */}
          <div className="space-y-2">
            <div className={infoItem}>
              <BiTimeFive className="text-blue-500 text-xl flex-shrink-0" />
              <div>
                <span className="font-medium">Processing Time:</span>
                <span className="ml-1">{processingTime}</span>
              </div>
            </div>

            <div className={infoItem}>
              <RiMoneyDollarCircleLine className="text-green-500 text-xl flex-shrink-0" />
              <div>
                <span className="font-medium">Fee:</span>
                <span className="ml-1">${fee}</span>
              </div>
            </div>

            <div className={infoItem}>
              <BsCalendarCheck className="text-purple-500 text-xl flex-shrink-0" />
              <div>
                <span className="font-medium">Validity:</span>
                <span className="ml-1">{validity}</span>
              </div>
            </div>

            <div className={infoItem}>
              <FaClipboardList className="text-teal-500 text-xl flex-shrink-0" />
              <div>
                <span className="font-medium">Application:</span>
                <span className="ml-1">{applicationMethod}</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <Link
            to={`/visa-details/${visa._id}`}
            className="group relative inline-flex w-full items-center justify-center px-4 py-3 text-base font-medium text-white bg-primary rounded-lg overflow-hidden transition-all duration-300"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-80 group-hover:h-80 opacity-10"></span>
            <span className="relative flex items-center">
              Learn More
              <svg
                className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VisaCard;
