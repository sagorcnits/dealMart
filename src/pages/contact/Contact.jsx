import React from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
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
          <ContactForm></ContactForm>
        </div>
        {/* <SendPushNotification></SendPushNotification> */}
      </section>
    </main>
  );
};

export default Contact;
// contact form
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const axiosFetch = useAxios();

  const submit = (data) => {
    const name = data.name;
    const email = data.email;
    const phone = data.phone;
    const message = data.message;

    const contactInfo = {
      name,
      email,
      phone,
      message,
    };

    //  add contact us

    axiosFetch
      .post("/contacts", contactInfo)
      .then((res) => {
        if (res.data.message == "ok") {
          Swal.fire({
            icon: "success",
            title: "Your message has been Success",
            showConfirmButton: false,
            timer: 1500,
          });

          reset();
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "warning",
          title: "Sorry Your Sms not complated",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-col justify-between gap-4"
    >
      <h3 className="text-green">
        Hi there, kindly leave a query through this form. We will get back to
        you as soon as possible...
      </h3>
      <div className="flex *:flex-1 items-center gap-4">
        <input
          {...register("name", { required: true })}
          type="text"
          placeholder="name"
          className="input input-bordered w-full"
          name="name"
        />
        {errors.name && <p className="text-red-500">Invalid Your Name</p>}
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="email"
          className="input input-bordered w-full "
          name="email"
        />
        {errors.email && <p className="text-red-500">Invalid Your email</p>}
      </div>
      <input
        {...register("phone", { required: true })}
        type="text"
        placeholder="phone"
        className="input input-bordered w-full"
        name="phone"
      />
      {errors.phone && <p className="text-red-500">Invalid Your phone</p>}
      <textarea
        {...register("message", { required: true })}
        type="text"
        placeholder="message"
        className="input input-bordered w-full h-[150px] resize-none"
        name="message"
      />
      {errors.message && <p className="text-red-500">Invalid Your message</p>}
      <button
        type="submit"
        className="w-full py-4 bg-darkBlue rounded-md text-white poppins hover:bg-black duration-500"
      >
        Send Message
      </button>
    </form>
  );
};

// send push notification realtime

