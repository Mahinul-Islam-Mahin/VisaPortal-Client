import React, { useContext, useEffect } from "react";
import BD_Airlines from "../../../../assets/BD_Airlines.png";
import US_Bangla_Airlines from "../../../../assets/US_Bangla.jpg";
import Novo_Air from "../../../../assets/novo_air.jpg";
import Air_Astra from "../../../../assets/Airstra.png";
import Emirates from "../../../../assets/Emirates.png";
import Singapore_Airlines from "../../../../assets/Singapore_airlines.png";
import Turkish_Airlines from "../../../../assets/Turkish_airlines.jpg";
import Qatar_Airways from "../../../../assets/Qatar_airways.png";
import Malaysia_Airlines from "../../../../assets/Malaysia_Airlines.jpg";
import Etihad_Airways from "../../../../assets/Etihad_airways.jpg";
import Cathay_Pacific_Airways from "../../../../assets/Cathay_Pacific_Airways.jpg";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import "aos/dist/aos.css";
import Aos from "aos";
const Airlines = () => {
  const airlines = [
    {
      id: 1,
      name: "Biman Bangladesh Airlines",
      logo: BD_Airlines,
    },
    {
      id: 2,
      name: "US-Bangla Airlines",
      logo: US_Bangla_Airlines,
    },
    {
      id: 3,
      name: "NOVOAIR",
      logo: Novo_Air,
    },
    {
      id: 4,
      name: "Air Astra",
      logo: Air_Astra,
    },
    {
      id: 5,
      name: "Emirates",
      logo: Emirates,
    },
    {
      id: 6,
      name: "Singapore Airlines",
      logo: Singapore_Airlines,
    },
    {
      id: 7,
      name: "Turkish Airlines",
      logo: Turkish_Airlines,
    },
    {
      id: 8,
      name: "Qatar Airways",
      logo: Qatar_Airways,
    },
    {
      id: 9,
      name: "Malaysia Airlines",
      logo: Malaysia_Airlines,
    },
    {
      id: 10,
      name: "Etihad Airways",
      logo: Etihad_Airways,
    },
    {
      id: 11,
      name: "Cathay Pacific Airways",
      logo: Cathay_Pacific_Airways,
    },
  ];
  const { theme } = useContext(AuthContext);
  useEffect(() => {
    Aos.init({ duration: 500 });
  });
  return (
    <div
      className={`py-12 container mx-auto px-6 text-center ${
        theme == "dark" ? "text-white" : "text-black"
      }`}
    >
      <div data-aos="zoom-in">
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-4">
          Search Top Airlines
        </h2>
        <p className="mb-8 md:w-1/3 mx-auto">
          Our user-friendly platform connects you to top airlines instantly.
          Enjoy a comfortable and hassle-free journey!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-2 lg:gap-6">
        {airlines.map((airline) => (
          <div
            key={airline.id}
            className={`flex items-center justify-between gap-2 ${
              theme == "dark" ? "bg-gray-900" : "bg-white"
            } shadow rounded-lg p-2 py-4 lg:p-4 hover:shadow-lg transition`}
          >
            <div className="flex items-center justify-between gap-3">
              <img
                data-aos="fade-right"
                src={airline.logo}
                alt={airline.name}
                className="w-10 h-10 inline-block lg:w-16 lg:h-16 rounded-full"
              />
              <span data-aos="fade-left" className="inline-block font-medium">
                {airline.name}
              </span>
            </div>
            <span className="text-primary text-lg font-bold">›</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Airlines;
