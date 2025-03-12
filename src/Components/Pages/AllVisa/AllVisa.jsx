import { useState, useEffect, useContext } from "react";
import VisaCard from "../../Cards/VisaCard";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { HashLoader } from "react-spinners";
import { API_BASE_URL } from '../../../config';

const AllVisa = () => {
  const [visas, setVisas] = useState([]);
  const [filteredVisas, setFilteredVisas] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const { theme, Toast } = useContext(AuthContext);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/Visa`)
      .then((response) => response.json())
      .then((data) => {
        setVisas(data);
        setFilteredVisas(data);
      })
      .catch((error) => Toast(error.message, "error"))
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === "All") {
      setFilteredVisas(visas);
    } else {
      const filtered = visas.filter(
        (visa) => visa.visaType.toLowerCase() === selectedFilter.toLowerCase()
      );
      setFilteredVisas(filtered);
    }
  };

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        theme == "dark" ? "text-white" : "text-black"
      }`}
    >
      <Helmet>
        <title>VisaPortal | All-Visa</title>
      </Helmet>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-primary">
        Explore All Available Visas 🌍💼
      </h1>

      <p className="text-xl text-center text-gray-500 mb-8">
        Browse through various visa types and find the one that suits your
        travel or study needs.
      </p>

      <div className="flex justify-center mb-8 w-full md:w-1/4 text-center mx-auto">
        <select
          value={filter}
          onChange={handleFilterChange}
          className="select select-bordered w-full text-center py-2 px-4 text-lg font-medium border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        >
          <option value="All">All Visa Types</option>
          <option value="Tourist Visa">Tourist Visa</option>
          <option value="Student Visa">Student Visa</option>
          <option value="Official Visa">Official Visa</option>
        </select>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <span className="loading loading-spinner w-20 text-primary"></span>
          <p className="text-lg font-medium text-gray-600">Loading available visas...</p>
        </div>
      ) : (
        <div>
          {filteredVisas.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredVisas.map((visa) => (
                <VisaCard key={visa._id} visa={visa} />
              ))}
            </div>
          ) : (
            <p className="text-5xl text-center font-bold text-red-500 mt-5">
              No visas available.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllVisa;
