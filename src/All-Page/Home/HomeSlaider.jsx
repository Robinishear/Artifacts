import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const HomeSlaider = () => {
  const images = [
    {
      url: "https://i.ibb.co/tpLq6gdM/dreamcatcher-hanging-from-rock.jpg",
      alt: "Cheeseburger with tomatoes",
    },
    {
      url: "https://i.ibb.co/3yhdg5Ps/high-angle-old-clock-second-hand-market.jpg",
      alt: "Spaghetti with tomato sauce",
    },
    {
      url: "https://i.ibb.co/TBdVwGb7/vintage-objects-arrangement-still-life.jpg",
      alt: "Mixed dishes",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const goPrev = () => {
    setIndex(index === 0 ? images.length - 1 : index - 1);
  };

  const goNext = () => {
    setIndex((index + 1) % images.length);
  };

  return (
    <motion.div
      className="py-2 relative mt-10 mb-10 "
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Glowing lime bottom border */}
      <div className="absolute bottom-0  left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent blur-sm"></div>

      {/* Slider Box */}
      <div className="relative w-full max-w-6xl mx-auto border border-lime-400 shadow-[0_0_40px_#84cc16] overflow-hidden rounded-xl">
        {/* Slide container */}
        <motion.div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <motion.img
              key={i}
              src={img.url}
              alt={img.alt}
              className="w-full h-[320px] sm:h-[400px] object-cover flex-shrink-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </motion.div>

        {/* Prev Button */}
        <motion.button
          onClick={goPrev}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/70 hover:bg-lime-400 text-lime-300 hover:text-black p-3 rounded-full shadow-lg transition"
          aria-label="Previous"
          whileTap={{ scale: 0.9 }}
        >
          ❮
        </motion.button>

        {/* Next Button */}
        <motion.button
          onClick={goNext}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/70 hover:bg-lime-400 text-lime-300 hover:text-black p-3 rounded-full shadow-lg transition"
          aria-label="Next"
          whileTap={{ scale: 0.9 }}
        >
          ❯
        </motion.button>

        {/* Dots indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, i) => (
            <motion.span
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full cursor-pointer border border-lime-300 shadow ${
                index === i ? "bg-lime-400 scale-110" : "bg-lime-600/30"
              } transition-all duration-300`}
              whileHover={{ scale: 1.3 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomeSlaider;
