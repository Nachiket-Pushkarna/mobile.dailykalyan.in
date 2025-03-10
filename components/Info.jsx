import React from "react";
import { getSetData } from "@/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import FAQ from "./FAQ/FAQ";
import BlogSlider from "./common/blogslider";
import styles from "../styles/Home.module.css";
import TrustedSection from "./TrustedSection";
import TestimonialInterface from "./Testimonial-Interface";

const Info = () => {
  const router = useRouter();
  const isLoggedIn = !!getSetData("token");

  return (
    <>
      {!isLoggedIn ? (
        <div className="container mx-auto p-4">
          <section className="mb-14">
          <img
                  src="certificate.webp"
                  alt="certificate"
                  className="mt-4"
                  style={{ width: "95%" }}
                />
          </section>
          <section className="mb-14 relative">
            <img
              src="/app-rating.png"
              alt="App rating"
              className="w-full h-auto rounded-lg shadow-lg border-2 border-yellow-500"
            />
          <section className="mb-4 mt-9">
            <TrustedSection />
          </section>
            <div className="absolute inset-0 bg-yellow-500 opacity-10 blur-3xl"></div>
          </section>
          <section className="mb-8 ">
            <TestimonialInterface />
          </section>

          <div className="bg-gray-900 text-white p-4 sm:p-6 rounded-lg shadow-md border-4 border-goldenrod mt-4 mb-4 ">
            <section className="mb-6 sm:mb-8 ">
              <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 stake-font">
                Introduction to DAILY KALYAN - Online Matka Play
              </h1>
              <p className="mt-3 sm:mt-4 text-gray-300 text-justify text-sm sm:text-base leading-relaxed">
                Welcome to DAILY KALYAN – Your Ultimate Online Matka Destination
                Step into the exciting world of Satta Matka with DAILY KALYAN,
                your reliable and secure platform for online Matka games. From
                Gali and Desawar to Kalyan, Milan, Rajdhani, and more, we offer
                a variety of games to suit your preferences. Whether you're a
                beginner or a seasoned player, DAILY KALYAN is your go-to online
                Matka app for a thrilling and seamless experience.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 stake-font">
                Stay Updated with Live Satta Matka Results
              </h2>
              <p className="mt-3 sm:mt-4 text-gray-300 text-justify text-sm sm:text-base leading-relaxed">
                Never miss a moment with our real-time Live Satta Matka results.
                Our platform ensures fast and accurate updates, so you can track
                your favorite games and catch the latest results instantly. With
                DAILY KALYAN, you're always in the loop!
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 stake-font">
                Expert Tips and Strategies
              </h2>
              <p className="mt-3 sm:mt-4 text-gray-300 text-justify text-sm sm:text-base leading-relaxed">
                Want to elevate your gameplay? DAILY KALYAN offers expert tips
                and strategies tailored to players of all experience levels.
                Whether you're just starting or are a pro, our advice will help
                you sharpen your skills and increase your chances of success.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 stake-font">
                Why Choose DAILY KALYAN?
              </h2>
              <ul className="list-none pl-0 mt-3 sm:mt-4 space-y-2">
                <li className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  <strong>• Secure & Trusted:</strong> Play with confidence on a
                  safe, reliable platform.
                </li>
                <li className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  <strong>• Fast Withdrawals::</strong> Enjoy quick and
                  hassle-free payouts.
                </li>
                <li className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  <strong>• Start with ₹200: </strong> Begin your journey with a
                  small deposit and scale your wins.
                </li>
                <li className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  <strong>• Play Anytime, Anywhere: </strong> Enjoy Matka games
                  from the comfort of your home or on the go.
                </li>
              </ul>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 stake-font">
                Getting Started on DAILY KALYAN
              </h2>
              <ol className="list-decimal pl-4 sm:pl-5 mt-3 sm:mt-4 space-y-2">
                <li className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  <strong>Download the DAILY KALYAN app</strong> from our
                  website.
                </li>
                <li className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  <strong>Sign up,</strong> fill in your details, and make a
                  deposit.
                </li>
                <li className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  <strong>Choose from popular games</strong> like Kalyan, Milan,
                  or Rajdhani Matka.
                </li>
                <li className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  <strong>Play, win,</strong> and withdraw your earnings
                  effortlessly.
                </li>
              </ol>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-yellow-400 stake-font">
                The Best Features of DAILY KALYAN
              </h2>
              <p className="mt-3 sm:mt-4 text-gray-300 text-justify text-sm sm:text-base leading-relaxed">
                At DAILY KALYAN, we combine the latest technology with a
                user-friendly interface to bring you an unparalleled Matka
                experience. From real-time results and accurate charts to
                expert-backed strategies, we provide everything you need for a
                smooth and rewarding gaming journey.
              </p>
            </section>
          </div>
          {/* Trusted Section */}

          {/* FAQ Section */}
          <section className="mt-8">
            <FAQ />
          </section>

          {/* Blog Slider Section */}
          <section className="mt-8"></section>
        </div>
      ) : (
        <div className="container mx-auto p-4 text-white">
          <h1>You are logged in</h1>
        </div>
      )}
    </>
  );
};

export default Info;
