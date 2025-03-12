import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { FiType } from "react-icons/fi";
import { FaClipboardList } from "react-icons/fa";
import { BiTimeFive } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCalendarCheck } from "react-icons/bs";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "aos/dist/aos.css";
import Aos from "aos";
import { HashLoader } from "react-spinners";
import { API_BASE_URL } from '../../../config';

const MyAddedVisas = () => {
  const { user, Toast, theme } = useContext(AuthContext);
  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVisa, setSelectedVisa] = useState(null);
  const [visaData, setVisaData] = useState({
    countryImage: "",
    countryName: "",
    visaType: "",
    processingTime: "",
    requiredDocuments: [],
    description: "",
    ageRestriction: "",
    fee: "",
    validity: "",
    applicationMethod: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 500 });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/Visa`)
      .then((response) => response.json())
      .then((data) => {
        const userVisas = data.filter((visa) => visa.addedBy === user.email);
        setVisas(userVisas);
        setFilteredVisas(userVisas);
      })
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  }, [user]);

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const searchQuery = searchTerm.toLowerCase();
    const results = visas.filter((visa) =>
      visa.countryName.toLowerCase().includes(searchQuery)
    );
    setFilteredVisas(results);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredVisas(visas);
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setVisaData((prevData) => {
        const documents = prevData.requiredDocuments || [];
        if (checked) {
          return { ...prevData, requiredDocuments: [...documents, value] };
        } else {
          return {
            ...prevData,
            requiredDocuments: documents.filter((doc) => doc !== value),
          };
        }
      });
    } else {
      setVisaData({ ...visaData, [name]: value });
    }
  };

  const handleUpdate = (visa) => {
    setSelectedVisa(visa);
    setVisaData({
      countryImage: visa.countryImage,
      countryName: visa.countryName,
      visaType: visa.visaType,
      processingTime: visa.processingTime,
      requiredDocuments: visa.requiredDocuments,
      description: visa.description,
      ageRestriction: visa.ageRestriction,
      fee: visa.fee,
      validity: visa.validity,
      applicationMethod: visa.applicationMethod,
      addedBy: visa.addedBy,
    });
    setIsModalOpen(true);
    document.getElementById("update_modal").showModal();
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedVisa = { ...visaData };
    console.log(updatedVisa);
    fetch(`${API_BASE_URL}/Visa/${selectedVisa._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedVisa),
    })
      .then(() => {
        setFilteredVisas(
          visas.map((visa) =>
            visa._id === selectedVisa._id ? updatedVisa : visa
          )
        );
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Application updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
      })
      .catch((error) =>
        Swal.fire({
          position: "center",
          icon: "error",
          title: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        })
      );
  };

  const handleDelete = (visaId) => {
    console.log(visaId);
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
        fetch(`${API_BASE_URL}/Visa/${visaId}`, {
          method: "DELETE",
        })
          .then(() => {
            setFilteredVisas(visas.filter((visa) => visa._id !== visaId));
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
      className={`container ${
        theme == "dark" ? "text-white" : "text-black"
      } mx-auto px-4`}
    >
      <Helmet>
        <title>VisaPortal | My-Visa </title>
      </Helmet>
      <h1
        data-aos="zoom-in"
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-5 text-primary"
      >
        My Added Visas 🌍🛂
      </h1>

      <p className="text-xl text-center w-[90%] md:w-[70%] lg:w-[50%] mx-auto text-gray-500 mb-6">
        Manage and view all the visas you’ve added to the platform. Search by
        country name for easy access.
      </p>

      <div className="flex flex-col w-[95%] md:w-3/4 lg:w-[60%] mx-auto md:flex-row items-center gap-2 mb-6">
        <input
          data-aos="fade-right"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by country name"
          className="input flex-grow input-bordered w-full md:w-1/2 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        />
        <div data-aos="fade-left" className="flex w-fit gap-2">
          <button
            onClick={handleSearch}
            className="bg-green-500 font-bold text-lg text-white rounded-lg px-6 py-3 transition-transform transform hover:scale-105"
          >
            Search
          </button>
          <button
            onClick={resetSearch}
            className="bg-red-500 font-bold text-lg text-white rounded-lg px-6 py-3 transition-transform transform hover:scale-105"
          >
            Reset
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <span className="loading loading-infinity w-20 text-primary"></span>
          <p className="text-lg font-medium text-gray-600">Loading your visas...</p>
        </div>
      ) : (
        <div>
          {visas.length === 0 ? (
            <p className="text-5xl text-center font-bold text-red-500 mt-5">
              You have not added any visas yet.
            </p>
          ) : filteredVisas.length === 0 ? (
            <p className="text-5xl text-center font-bold text-red-500 mt-5">
              No visas found for this country.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredVisas.map((visa) => (
                <div
                  key={visa._id}
                  className={`flex ${
                    theme == "dark" ? "bg-gray-950" : "bg-white"
                  } flex-col rounded-lg shadow-lg p-2 md:p-3 lg:p-4`}
                >
                  <img
                    data-aos="fade-up"
                    src={visa.countryImage}
                    alt={visa.countryName}
                    className="border-2 border-gray-100 mx-auto object-cover rounded-lg mb-4"
                  />
                  <div data-aos="fade-up" className="flex-grow">
                    <h3 className="font-bold text-xl mb-2">
                      {visa.countryName}
                    </h3>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <FiType className="text-green-500 text-xl" />
                      <strong>Visa Type:</strong> {visa.visaType}
                    </p>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <BiTimeFive className="text-blue-500 text-xl" />
                      <strong>Processing Time:</strong> {visa.processingTime}
                    </p>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <RiMoneyDollarCircleLine className="text-green-600 text-xl" />
                      <strong>Fee:</strong> ${visa.fee}
                    </p>
                    <p
                      className={`flex flex-wrap items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <BsCalendarCheck className="text-purple-500 text-xl" />
                      <strong>Validity:</strong> {visa.validity}
                    </p>
                    <p
                      className={`flex items-center gap-2 ${
                        theme == "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      <FaClipboardList className="text-teal-500 text-xl" />
                      <strong>Application Method:</strong>{" "}
                      {visa.applicationMethod}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      data-aos="fade-right"
                      onClick={() => handleDelete(visa._id)}
                      className="px-4 py-1 rounded-md bg-red-500 text-white font-medium"
                    >
                      Delete
                    </button>
                    <button
                      data-aos="fade-left"
                      onClick={() => handleUpdate(visa)}
                      className="px-4 py-1 bg-sky-500 text-white rounded-md"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {
            <dialog
              id="update_modal"
              className={`modal modal-bottom sm:modal-middle`}
            >
              <div className="modal-box w-full max-w-lg  rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-primary mb-4">
                  Update {visaData.countryName} Visa
                </h2>
                <form onSubmit={handleFormSubmit}>
                  <div className="mb-4">
                    <label className="block font-medium">
                      Country Image URL
                    </label>
                    <input
                      type="text"
                      name="countryImage"
                      value={visaData.countryImage}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={visaData.countryName}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-lg font-semibold mb-2"
                      htmlFor="visaType"
                    >
                      Visa Type
                    </label>
                    <select
                      id="visaType"
                      name="visaType"
                      value={visaData.visaType}
                      onChange={handleInputChange}
                      className="select select-bordered w-full"
                      required
                    >
                      <option value="" disabled>
                        Select Visa Type
                      </option>
                      <option value="Tourist visa">Tourist Visa</option>
                      <option value="Student visa">Student Visa</option>
                      <option value="Official visa">Official Visa</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Processing Time</label>
                    <input
                      type="text"
                      name="processingTime"
                      value={visaData.processingTime}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-lg font-semibold mb-2">
                      Required Documents
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <label className="flex flex-wrap items-center gap-2">
                        <input
                          type="checkbox"
                          name="requiredDocuments"
                          value="Valid passport"
                          checked={visaData.requiredDocuments.includes(
                            "Valid passport"
                          )}
                          onChange={handleInputChange}
                          className="checkbox"
                        />
                        Valid Passport
                      </label>
                      <label className="flex flex-wrap items-center gap-2">
                        <input
                          type="checkbox"
                          name="requiredDocuments"
                          value="Visa application form"
                          checked={visaData.requiredDocuments.includes(
                            "Visa application form"
                          )}
                          onChange={handleInputChange}
                          className="checkbox"
                        />
                        Visa Application Form
                      </label>
                      <label className="flex flex-wrap items-center gap-2">
                        <input
                          type="checkbox"
                          name="requiredDocuments"
                          value="Recent passport-sized photograph"
                          checked={visaData.requiredDocuments.includes(
                            "Recent passport-sized photograph"
                          )}
                          onChange={handleInputChange}
                          className="checkbox"
                        />
                        Recent Passport-Sized Photograph
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Description</label>
                    <textarea
                      name="description"
                      value={visaData.description}
                      onChange={handleInputChange}
                      className="textarea textarea-bordered w-full"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Age Restriction</label>
                    <input
                      type="text"
                      name="ageRestriction"
                      value={visaData.ageRestriction}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Fee</label>
                    <input
                      type="number"
                      name="fee"
                      value={visaData.fee}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">Validity</label>
                    <input
                      type="text"
                      name="validity"
                      value={visaData.validity}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-medium">
                      Application Method
                    </label>
                    <input
                      type="text"
                      name="applicationMethod"
                      value={visaData.applicationMethod}
                      onChange={handleInputChange}
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="modal-action flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("update_modal").close()
                      }
                      className="px-4 py-2 bg-red-500 text-white text-lg font-semibold rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      onClick={() =>
                        document.getElementById("update_modal").close()
                      }
                      className="px-4 py-2 bg-green-500 text-white text-lg font-semibold rounded-lg"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          }
        </div>
      )}
    </div>
  );
};

export default MyAddedVisas;
