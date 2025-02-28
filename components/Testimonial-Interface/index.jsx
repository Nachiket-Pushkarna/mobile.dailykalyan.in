import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const TestimonialInterface = () => {
  const testimonials = [
    {
      id: 1,
      name: "Ravi Sharma",
      avatar:
        "https://zara777.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuser_1.896b2edb.png&w=256&q=75",
      review:
        "Daily Kalyan is the most trusted Satta Matka platform! Fast withdrawals and fair play.",
    },
    {
      id: 2,
      name: "Priya Verma",
      avatar:
        "https://zara777.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuser_3.5db6a2a1.png&w=256&q=75",
      review:
        "I’ve been playing on Daily Kalyan for months and I love how secure the platform is.",
    },
    {
      id: 3,
      name: "Amit Patel",
      avatar:
        "https://zara777.in/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fuser_2.0aafc030.png&w=256&q=75",
      review:
        "Best Satta Matka site! The deposit and withdrawal process is super smooth.",
    },
  ];

  return (
    <div className="w-full bg-black py-8 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-4">
        What Our Players Say
      </h2>
      <p className="text-base sm:text-xl text-yellow-200 text-center mb-8">
        Join thousands of satisfied players winning big every day!
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="aspect-square bg-gray-900 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out relative border border-yellow-500 flex flex-col justify-between overflow-hidden"
            aria-label={`Testimonial from ${testimonial.name}`}
            tabIndex="0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 opacity-20 blur-2xl"></div>

            <div className="flex flex-col items-center relative h-full">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 object-cover border-2 border-yellow-400"
              />
              <div className="text-center flex flex-col flex-grow w-full">
                <FaQuoteLeft className="text-yellow-400 mb-2 text-lg mx-auto" />
                <p className="text-gray-300 text-xs sm:text-sm mb-4 flex-grow">
                  {testimonial.review}
                </p>
                <p className="font-semibold text-yellow-400 text-sm">
                  {testimonial.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialInterface;
