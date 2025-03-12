import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { FiType } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCalendarCheck } from "react-icons/bs";
import { BsCalendar } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { FaUserAlt, FaClipboardList } from "react-icons/fa";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "aos/dist/aos.css";
import Aos from "aos";
import { HashLoader } from "react-spinners";
import { API_BASE_URL } from '../../../config';

const MyVisaApplications = () => {
  const { user, Toast, theme } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 500 });
  }, []);
  useEffect(() => {
    fetch(`${API_BASE_URL}/Applications`)
      .then((response) => response.json())
      .then((data) => {
        const userApplications = data.filter(
          (application) => application.email === user.email
        );
        setApplications(userApplications);
      })
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [user.email]);

  const handleCancel = (applicationId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF4500",
      cancelButtonColor: "#32CD32",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_BASE_URL}/Applications/${applicationId}`, {
          method: "DELETE",
        })
          .then((result) => {
            setApplications(
              applications.filter(
                (application) => application._id !== applicationId
              )
            );
          })
          .catch((error) => Toast(error.message, "error"));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        theme == "dark" ? "text-white" : "text-black"
      }`}
    >
      <Helmet>
        <title>VisaPortal | My-Applications</title>
      </Helmet>
      <h1
        data-aos="zoom-in"
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 text-primary"
      >
        My Visa Applications 📝✈️
      </h1>

      <p
        data-aos="zoom-in"
        className="text-xl w-[90%] md:w-[70%] lg:w-[50%] mx-auto text-center text-gray-500 mb-6"
      >
        Track and manage all your visa applications in one place. Stay updated
        on the status of each application.
      </p>
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <span className="loading loading-dots w-20 text-primary"></span>
          <p className="text-lg font-medium text-gray-600">Loading your applications...</p>
        </div>
      ) : (
        <div>
          {applications.length === 0 ? (
            <p className="text-5xl text-center font-bold text-red-500 mt-5">
              You have not applied for any visas yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-6">
              {applications.map((application) => (
                <div
                  key={application._id}
                  className={`${
                    theme == "dark" ? "bg-gray-950" : "bg-white"
                  } p-2 rounded-lg shadow-lg text-lg flex flex-col`}
                >
                  <img
                    data-aos="fade-up"
                    src={application.countryImage}
                    alt={application.country}
                    className="w-full border-2 border-e-gray-100 object-cover rounded-lg mb-4"
                  />
                  <div data-aos="fade-up" className="flex-grow">
                    <h3 className="font-bold text-xl mb-2">
                      {application.countryName}
                    </h3>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <FiType className="text-green-500 text-xl" />
                      <strong>Visa Type:</strong> {application.visaType}
                    </p>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <BiTimeFive className="inline-block text-blue-500 text-xl" />
                      <strong> Processing Time:</strong>{" "}
                      {application.processingTime}
                    </p>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <RiMoneyDollarCircleLine className="inline-block text-green-600 text-xl" />
                      <strong> Fee:</strong> ${application.fee}
                    </p>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <BsCalendarCheck className="inline-block text-purple-500 text-xl" />
                      <strong> Validity:</strong> {application.validity}
                    </p>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <FaClipboardList className="inline-block text-teal-500 text-xl" />
                      <strong> Application Method:</strong>{" "}
                      {application.applicationMethod}
                    </p>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <BsCalendar className="inline text-purple-500 text-xl" />
                      <strong> Applied Date:</strong>{" "}
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </p>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <FaUserAlt className="inline-block text-orange-500 text-xl" />
                      <strong> Applicant's Name:</strong>{" "}
                      {`${application.firstName} ${application.lastName}`}
                    </p>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <HiOutlineMail className="inline-block text-teal-500 text-xl" />
                      <strong> Applicant's Email:</strong> {application.email}
                    </p>
                  </div>
                  <button
                    data-aos="fade-up"
                    onClick={() => handleCancel(application._id)}
                    className="px-3 py-1 bg-red-500 rounded-lg text-white font-semibold mt-4"
                  >
                    Cancel
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyVisaApplications;
