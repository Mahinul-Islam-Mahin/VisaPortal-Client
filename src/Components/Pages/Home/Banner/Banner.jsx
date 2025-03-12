import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import slide1 from "../../../../Assets/Slide1.webp";
import slide2 from "../../../../Assets/Slide2.jpg";
import slide3 from "../../../../Assets/Slide3.jpg";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

const Banner = () => {
  const sliderContent = [
    {
      id: "slide1",
      title: "Hassle-Free Visa Assistance",
      description:
        "Navigate the complexities of visa applications with VisaPortal. Simplified steps, personalized guidance, and hassle-free processes await you!",
      buttonText: "Explore Visas",
      imgSrc: slide1,
    },
    {
      id: "slide2",
      title: "Fast & Reliable Processing",
      description:
        "Get your visa faster with our streamlined processing. Trusted by thousands, VisaPortal ensures timely and accurate results every time.",
      buttonText: "Check Processing Times",
      imgSrc: slide2,
    },
    {
      id: "slide3",
      title: "Your Gateway to the World",
      description:
        "Unlock endless possibilities with VisaPortal. From travel to work visas, we've got you covered. Start your journey today!",
      buttonText: "Get Started",
      imgSrc: slide3,
    },
  ];

  const { user, theme } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const { id, title, description, buttonText, imgSrc } = sliderContent[currentSlide];

  return (
    <section 
      className={`relative min-h-screen flex items-center justify-center ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Typewriter
                words={[title]}
                loop={1}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </motion.h1>

            <motion.p 
              className="text-lg md:text-xl mb-8 text-gray-200"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <button
                onClick={() => navigate(buttonText === "Get Started" && !user ? "/signup" : "/all-visas")}
                className="btn-primary text-lg px-8 py-3 hover:bg-white hover:text-primary"
              >
                {buttonText}
              </button>
              <button
                onClick={() => navigate("/all-visas")}
                className="px-8 py-3 text-lg border-2 border-white text-white hover:bg-white hover:text-primary rounded-lg transition-all duration-300"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Logo/Brand Section */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full max-w-[500px] mx-auto">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <div className="relative z-10 p-8 rounded-full bg-white/10 backdrop-blur-lg border border-white/20">
                <h2 className="text-4xl font-bold text-center text-white mb-2">
                  Visa<span className="text-primary">Portal</span>
                </h2>
                <p className="text-center text-gray-200">Your Trusted Visa Partner</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Slide Navigation */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center gap-2">
          {sliderContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-primary w-8' 
                  : 'bg-white/50 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;
