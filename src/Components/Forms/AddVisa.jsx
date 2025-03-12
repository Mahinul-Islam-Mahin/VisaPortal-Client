import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Contexts/AuthContext/AuthProvider';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import 'aos/dist/aos.css';
import Aos from 'aos';
import { API_BASE_URL } from '../../config';

const AddVisa = () => {
  const [visaData, setVisaData] = useState({
    countryImage: '',
    countryName: '',
    visaType: '',
    processingTime: '',
    requiredDocuments: [],
    description: '',
    ageRestriction: '',
    fee: '',
    validity: '',
    applicationMethod: '',
    addedBy: '',
  });
  const { user, theme } = useContext(AuthContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 500 });
  }, []);
  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setVisaData(prevData => ({
        ...prevData,
        requiredDocuments: checked
          ? [...prevData.requiredDocuments, value]
          : prevData.requiredDocuments.filter(doc => doc !== value),
      }));
    } else {
      setVisaData({ ...visaData, [name]: value });
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    visaData.addedBy = user.email;
    fetch(`${API_BASE_URL}/Visa`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visaData),
    })
      .then(response => response.json())
      .then(data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Visa added successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        setVisaData({
          countryImage: '',
          countryName: '',
          visaType: '',
          processingTime: '',
          requiredDocuments: [],
          description: '',
          ageRestriction: '',
          fee: '',
          validity: '',
          applicationMethod: '',
          addedBy: '',
        });
        e.target.reset();
      })
      .catch(error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Failed to add visa',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div
      className={`container ${
        theme == 'dark' ? 'text-white' : 'text-black'
      } mx-auto px-4 py-8`}
    >
      <Helmet>
        <title>VisaPortal | Add-Visa</title>
      </Helmet>
      <h1
        data-aos="zoom-in"
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-primary"
      >
        Add New Visa 🌍✈️
      </h1>

      <p data-aos="zoom-in" className="text-xl text-center text-gray-500 mb-8">
        Enter the necessary details to add a new visa and make it available for
        applicants.
      </p>
      <form
        onSubmit={handleSubmit}
        className={`${
          theme == 'dark' ? 'bg-gray-950' : 'bg-white'
        } shadow-lg rounded-lg p-6 max-w-3xl mx-auto`}
      >
        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="countryImage"
          >
            Country Image URL
          </label>
          <input
            type="url"
            id="countryImage"
            name="countryImage"
            placeholder="Enter image URL"
            value={visaData.countryImage}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="countryName"
          >
            Country Name
          </label>
          <input
            type="text"
            id="countryName"
            name="countryName"
            placeholder="Enter country name"
            value={visaData.countryName}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div data-aos="fade-up" className="mb-4 w-full">
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
            className="select select-bordered"
            required
          >
            <option value="" disabled="true">
              Select Visa Type
            </option>
            <option value="Tourist Visa">Tourist Visa</option>
            <option value="Student Visa">Student Visa</option>
            <option value="Official Visa">Official Visa</option>
          </select>
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="processingTime"
          >
            Processing Time
          </label>
          <input
            type="text"
            id="processingTime"
            name="processingTime"
            placeholder="e.g., 5-7 business days"
            value={visaData.processingTime}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label className="block text-lg font-semibold mb-2">
            Required Documents
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="requiredDocuments"
                value="Passport"
                onChange={handleInputChange}
                className="checkbox"
              />
              Passport
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="requiredDocuments"
                value="Visa application form"
                onChange={handleInputChange}
                className="checkbox"
              />
              Visa Application Form
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="requiredDocuments"
                value="Recent passport-sized photo"
                onChange={handleInputChange}
                className="checkbox"
              />
              Recent Passport-Sized Photo
            </label>
          </div>
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Provide details about the visa"
            value={visaData.description}
            onChange={handleInputChange}
            className="textarea textarea-bordered w-full"
            required
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="ageRestriction"
          >
            Age Restriction
          </label>
          <input
            type="number"
            id="ageRestriction"
            name="ageRestriction"
            placeholder="Enter minimum age"
            value={visaData.ageRestriction}
            onChange={handleInputChange}
            className="input input-bordered w-full"
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label className="block text-lg font-semibold mb-2" htmlFor="fee">
            Visa Fee
          </label>
          <input
            type="number"
            id="fee"
            name="fee"
            placeholder="Enter fee amount"
            value={visaData.fee}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="validity"
          >
            Validity Period
          </label>
          <input
            type="text"
            id="validity"
            name="validity"
            placeholder="e.g., 1 year"
            value={visaData.validity}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div data-aos="fade-up" className="mb-4">
          <label
            className="block text-lg font-semibold mb-2"
            htmlFor="applicationMethod"
          >
            Application Method
          </label>
          <input
            type="text"
            id="applicationMethod"
            name="applicationMethod"
            placeholder="e.g., Online"
            value={visaData.applicationMethod}
            onChange={handleInputChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <button
          data-aos="fade-up"
          type="submit"
          className="py-2 rounded-lg bg-primary/[130] text-xl w-full mt-4 text-white font-bold"
        >
          Add Visa
        </button>
      </form>
    </div>
  );
};

export default AddVisa;
