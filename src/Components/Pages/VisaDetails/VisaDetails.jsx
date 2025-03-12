import { useState, useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { FiType } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCalendarCheck } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "aos/dist/aos.css";
import Aos from "aos";
import { API_BASE_URL } from '../../../config';

const VisaDetails = () => {
  const visaData = useLoaderData();
  const { user, Toast, theme } = useContext(AuthContext);
  const [visa, setVisa] = useState(visaData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    appliedDate: new Date().toISOString().split("T")[0],
    fee: visaData.fee || "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 500 });
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const { _id, ...visaWithoutId } = visa;
    const applicationData = {
      ...formData,
      visaId: _id,
      ...visaWithoutId,
    };
    fetch(`${API_BASE_URL}/Applications`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Application submitted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsModalOpen(false);
        } else {
          if (res.status === 400) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Application already exists",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Failed to submit application",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      })
      .catch((error) => {
        Toast(error.message, "error");
      });
  };

  return (
    <div
      className={`container mx-auto max-w-3xl px-4 py-8 ${
        theme == "dark" ? "text-white" : "text-black"
      }`}
    >
      <Helmet>
        <title>VisaPortal | Visa-Details | {visa._id}</title>
      </Helmet>
      <h1
        data-aos="zoom-in"
        className="text-3xl text-center font-bold mb-6 text-primary"
      >
        {visa.countryName} Visa Details
      </h1>
      <div className={`shadow ${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl overflow-hidden`}>
        {/* Country Flag Banner */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={visa.countryImage}
            alt={visa.countryName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl font-bold text-white">Apply for {visa.countryName} Visa</h2>
          </div>
        </div>

        {/* Visa Details Grid */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
            <div className="flex items-center gap-3 mb-2">
              <FiType className="text-2xl text-primary" />
              <h3 className="font-semibold">Visa Type</h3>
            </div>
            <p className="ml-9">{visa.visaType}</p>
          </div>

          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
            <div className="flex items-center gap-3 mb-2">
              <BiTimeFive className="text-2xl text-primary" />
              <h3 className="font-semibold">Processing Time</h3>
            </div>
            <p className="ml-9">{visa.processingTime}</p>
          </div>

          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
            <div className="flex items-center gap-3 mb-2">
              <AiOutlineFileText className="text-2xl text-primary" />
              <h3 className="font-semibold">Required Documents</h3>
            </div>
            <ul className="ml-9 list-disc list-inside space-y-1">
              {visa.requiredDocuments.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>

          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
            <div className="flex items-center gap-3 mb-2">
              <FaBirthdayCake className="text-2xl text-primary" />
              <h3 className="font-semibold">Age Restriction</h3>
            </div>
            <p className="ml-9">{visa.ageRestriction} years</p>
          </div>

          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
            <div className="flex items-center gap-3 mb-2">
              <RiMoneyDollarCircleLine className="text-2xl text-primary" />
              <h3 className="font-semibold">Fee</h3>
            </div>
            <p className="ml-9">${visa.fee}</p>
          </div>

          <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"}`}>
            <div className="flex items-center gap-3 mb-2">
              <BsCalendarCheck className="text-2xl text-primary" />
              <h3 className="font-semibold">Validity</h3>
            </div>
            <p className="ml-9">{visa.validity}</p>
          </div>
        </div>

        {/* Description Section */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <MdDescription className="text-2xl text-primary" />
            <h3 className="font-semibold">Description</h3>
          </div>
          <p className="ml-9">{visa.description}</p>
        </div>

        {/* Apply Button */}
        <div className="p-6 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3 rounded-lg font-medium bg-primary text-white hover:bg-primary-dark transition-all duration-300"
          >
            Apply Now
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div 
            className={`w-full max-w-xl rounded-xl shadow-lg ${theme === "dark" ? "bg-gray-800" : "bg-white"} p-8 relative animate-slideUp`}
            data-aos="fade-up"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              Apply for <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">{visa.countryName} Visa</span>
            </h3>
            
            <form onSubmit={handleApply} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-primary
                             transition duration-200 ease-in-out"
                    required
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="form-group">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-primary
                             transition duration-200 ease-in-out"
                    required
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Email
                </label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700
                             bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400
                             cursor-not-allowed"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    Application Date
                  </label>
                  <div className="relative">
                    <BsCalendarCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="date"
                      name="appliedDate"
                      value={formData.appliedDate}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 
                               bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                               focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-primary
                               transition duration-200 ease-in-out"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                    Fee Amount ($)
                  </label>
                  <div className="relative">
                    <RiMoneyDollarCircleLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="fee"
                      value={formData.fee}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700
                               bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400
                               cursor-not-allowed"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-2.5 rounded-lg font-medium border-2 border-gray-300 dark:border-gray-600 
                           hover:bg-gray-100 dark:hover:bg-gray-700 
                           transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2.5 rounded-lg font-medium bg-primary text-white
                           hover:bg-primary-dark transform hover:scale-[1.02]
                           transition-all duration-300"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;
