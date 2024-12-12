import { useState } from "react";
import headphone from "../../../public/images/headphone.png";
import SectionIntro from "../../components/SectionIntro";

import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import Banner from "./Banner";
import Discount from "./Discount";
import ProductContainer from "./ProductContainer";
const Home = () => {

  // console.log("Testing console");
  return (
    <main>
      <section className="mt-4 max-w-7xl mx-auto px-2">
        <Banner></Banner>
      </section>
      {/* <section className="py-12 max-w-7xl mx-auto px-2">
        <SectionIntro title="Categories"></SectionIntro>
        <div className="w-full overflow-auto scrollbar-none">
          <Category></Category>
        </div>
      </section> */}
      <section className="py-12 bg-[#e9f6f6] mt-10">
        <div className="max-w-7xl mx-auto px-2">
          <SectionIntro title="Trending"></SectionIntro>
          <ProductContainer></ProductContainer>
        </div>
      </section>
      <section className="py-12 px-2 max-w-7xl mx-auto">
        <Discount></Discount>
      </section>
      <section className="py-12 bg-[#e9f6f6]">
        <div className="max-w-7xl mx-auto px-2">
          <SectionIntro title="Popular Shoes Collection"></SectionIntro>
          <ProductContainer></ProductContainer>
        </div>
      </section>
      <section className="py-12 max-w-7xl mx-auto px-2">
        <div className="flex  items-center *:flex-1 bg-[#27284b] md:banner rounded-lg overflow-hidden poppins gap-2 p-4">
          <div className="space-y-3 sm:space-y-8 *:text-balance md:pl-6 lg:pl-24">
            <h2 className="text-white text-sm md:text-xl sm:text-2xl lg:text-3xl font-semibold poppins md:leading-8">
              Wireless Headphone with balck Ear Cups
            </h2>
            <p className="text-[#b3acac] text-xs lg:text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto
            </p>
            <button className="px-3 py-2 text-green bg-white rounded-md hover:bg-black duration-500">
              Shop Now
            </button>
          </div>

          <div className="flex justify-center">
            <img
              className="w-[70%] md:w-[80%]"
              src={headphone}
              alt="banner_img"
            />
          </div>
        </div>
      </section>
      <section className="py-12 ">
        <div className="max-w-7xl mx-auto px-2">
          <SectionIntro title="Best Selling Products"></SectionIntro>
          <ProductContainer></ProductContainer>
        </div>
      </section>
      <section className="py-12 bg-[#e9f6f6] poppins px-2">
        <Subscribe></Subscribe>
      </section>
    </main>
  );
};

export default Home;

const Subscribe = () => {
  const [subscribe, setSubscribe] = useState("");
  const axiosFetch = useAxios();
  const handleSubscribe = (e) => {
    e.preventDefault();
    //  add subscribe
    axiosFetch
      .post("/subscribe", { email: subscribe })
      .then((res) => {
        if (res.data.message == "ok") {
          Swal.fire({
            icon: "success",
            title: "Thank you for staying with us..!😍",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        // already subscribed cheak
        if (res.data.message == "exists") {
          Swal.fire({
            icon: "error",
            title: "Email already exists",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        setSubscribe("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto *:flex-1 gap-6 md:gap-24">
      <div className="space-y-4">
        <h3 className="text-2xl text-darkBlue font-semibold">
          Stay up to Update on our latest deals and Offers
        </h3>
        <p className="text-sm text-paragraph">
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          dolore voluptatem hic laborum? Sint eaque, voluptatibus dignissimos
        </p>
      </div>
      <div>
        <form
          onSubmit={handleSubscribe}
          className=" flex items-center border rounded-md overflow-hidden"
        >
          <input
            type="email"
            placeholder="write your email"
            name="subscribe"
            className="px-3 focus:outline-none w-full bg-[#e9f6f6]"
            value={subscribe}
            onChange={(e) => setSubscribe(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green w-[200px] py-3 border-none text-white hover:bg-black duration-500"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};
