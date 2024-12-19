import React from 'react';
import { useSelector } from 'react-redux';

const About_title = () => {

  const theme = useSelector((state) => state.darkMode);
  return (
    <div className={`${theme == "light" ? "bg-[#e9f6f6]  text-gray-800" : "bg-black text-white"} p-6 md:p-10`}>
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Welcome to dealMart</h1>
      
      <p className="text-lg text-center mb-8">
        dealMart is a Bangladeshi brand committed to offering reliable and professional electronics services.
        Specializing in the repair and maintenance of essential devices like watches, phones, and headphones,
        we strive to keep you connected and functioning smoothly with quality service you can trust.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Mission</h2>
        <p className="text-lg">
          Our mission at dealMart is to provide efficient, affordable, and expert solutions for all your electronics needs.
          We are dedicated to ensuring that each device we handle is restored to its optimal condition, extending its life and functionality.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Services</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-blue-500">Watch Repairs</h3>
            <p className="text-lg">From battery replacement to complex mechanical adjustments, we ensure your timepieces stay accurate and reliable.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-500">Phone Repairs</h3>
            <p className="text-lg">Whether it’s a screen replacement, battery issue, or software troubleshooting, our team provides quick, effective solutions.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-500">Headphone Repairs</h3>
            <p className="text-lg">We handle everything from audio jack repairs to internal wiring, restoring your audio experience to full clarity.</p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Why Choose dealMart?</h2>
        <p className="text-lg">
          Choosing dealMart means choosing expertise and reliability. We understand how essential these devices are to your daily life and are committed to delivering top-notch repairs with transparent pricing and excellent customer support.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Our Vision</h2>
        <p className="text-lg">
          We envision dealMart as a trusted name in electronics services across Bangladesh. Through skilled craftsmanship and a dedication to customer satisfaction, we aim to become your go-to source for all electronic repairs, helping you get the most out of your devices.
        </p>
      </section>
    </div>
  );
};

export default About_title;
