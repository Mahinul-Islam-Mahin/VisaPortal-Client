import React, { useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import "aos/dist/aos.css";
import Aos from "aos";

const BestDestinations = () => {
  const destinations = [
    {
      id: 1,
      title: "Kathmandu",
      img: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      hotels: "9 Visa Available",
    },
    {
      id: 2,
      title: "Bangkok",
      img: "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      hotels: "10 Visa Available",
    },
    {
      id: 3,
      title: "Singapore",
      img: "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      hotels: "15 Visa Available",
    },
    {
      id: 4,
      title: "Kuala Lumpur",
      img: "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      hotels: "14 Visa Available",
    },
    {
      id: 5,
      title: "Maafushi",
      img: "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
      hotels: "8 Visa Available",
    },
  ];
  const { theme } = useContext(AuthContext);
  useEffect(() => {
    Aos.init({ duration: 500 });
  });
  return (
    <div
      className={`py-12 container mx-auto px-6 ${
        theme == "dark" ? "text-white" : "text-black"
      }`}
    >
      <div data-aos="fade-down">
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-extrabold mb-4 text-center">
          Most Popular Destinations
        </h2>
        <p className="text-center mb-8 md:w-1/3 mx-auto">
          Expand your travel horizons with new facets! Explore the world by
          choosing your ideal travel destinations.
        </p>
      </div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {destinations.map((destination) => (
          <SwiperSlide key={destination.id}>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                data-aos="zoom-in"
                src={destination.img}
                alt={destination.title}
                className="w-full h-64 object-cover"
              />
              <div
                data-aos="fade-up"
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4"
              >
                <h3 className="text-white text-lg font-semibold">
                  {destination.title}
                </h3>
                <p className="text-gray-300 text-sm">{destination.hotels}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestDestinations;
