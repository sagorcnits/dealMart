import React from "react";
import Address from "./Address";

const Contact = () => {
  return (
    <main className="max-w-7xl mx-auto px-2">
      <div className="mt-6 h-[220px] md:h-[350px] bg-[url('https://img.freepik.com/free-photo/contact-us-communication-support-service-assistance-concept_53876-128103.jpg?t=st=1724481470~exp=1724485070~hmac=5d3f14a363d5a34bb9ee2fca15749baeb8847f6dcec39a1cf2b00ab55b0038d8&w=900')] bg-no-repeat bg-cover bg-center rounded-md"></div>
      <section>
        <h1 className="text-center font-semibold text-green py-8 text-3xl poppins">
          Our Address
        </h1>
        <Address></Address>
      </section>
      <section className="py-24">
        {/* <h1 className="text-center font-semibold text-green py-8 text-3xl">Lets Connect and Discuss</h1> */}
        <div className="flex flex-col lg:flex-row justify-between *:flex-1 gap-10 *:h-[450px] poppins">
          <div className="border-2 rounded-lg overflow-hidden border-darkBlue">
            <iframe
              className="w-full h-[350px] lg:h-[450px]"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12259.439980660025!2d89.2322767510278!3d24.004486746768222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe9b0047d4b85d%3A0x500a9890153705cc!2z4Ka24Ka54KeA4KamIOCmmuCmpOCnjeCmrOCmsCwgU2hvaGlkIGNhdHRvcg!5e0!3m2!1sen!2sbd!4v1724555462053!5m2!1sen!2sbd"
            ></iframe>
          </div>
          <form className="flex flex-col justify-between gap-4">
            <h3 className="text-green">
              Hi there, kindly leave a query through this form. We will get back
              to you as soon as possible...
            </h3>
            <div className="flex *:flex-1 items-center gap-4">
              <input
                type="text"
                placeholder="name"
                className="input input-bordered w-full "
              />
              <input
                type="email"
                placeholder="email"
                className="input input-bordered w-full "
              />
            </div>
            <input
              type="text"
              placeholder="phone"
              className="input input-bordered w-full"
            />
            <textarea
              type="text"
              placeholder="message"
              className="input input-bordered w-full h-[150px] resize-none"
            />
            <button className="w-full py-4 bg-darkBlue rounded-md text-white poppins hover:bg-black duration-500">Send Message</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
