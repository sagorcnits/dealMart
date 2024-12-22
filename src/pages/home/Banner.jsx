import { A11y, Autoplay, Pagination, Scrollbar } from "swiper/modules";
import mobileImg from "../../../public/images/banner_img.png";
import headphonImg from "../../../public/images/headphone.png";
import watchImg from "../../../public/images/watch.png";

import "swiper/css/bundle";
import { Swiper, SwiperSlide } from "swiper/react";

const bannerSlider = [
  {
    title: "2024's top Mobile Collection",
    image: mobileImg,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto
          dolorem aspernatur nisi maxime quia nobis quae temporibus dolore velit
          excepturi, inventore in adipisci nemo.s`,
  },
  {
    title: "2024's top Headphones Collection",
    image: headphonImg,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto
          dolorem aspernatur nisi maxime quia nobis quae temporibus dolore velit
          excepturi, inventore in adipisci nemo.s`,
  },
  {
    title: "2024's top Watch Collection",
    image: watchImg,
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto
          dolorem aspernatur nisi maxime quia nobis quae temporibus dolore velit
          excepturi, inventore in adipisci nemo.s`,
  },
];

const Banner = () => {
  return (
    <>
      <Swiper
        loop={true}
        modules={[Pagination, Scrollbar, A11y, Autoplay]}
        autoplay={true}
        spaceBetween={20}
        pagination={{ clickable: true }}
      >
        {bannerSlider.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <BannerSlider item={item}></BannerSlider>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Banner;
// banner slider
const BannerSlider = ({ item }) => {
  return (
    <div className="flex h-[220px]  flex-row items-center *:flex-1 bg-green md:banner rounded-lg overflow-hidden poppins gap-2 p-4">
      <div className="space-y-3 sm:space-y-8 *:text-balance md:pl-6 lg:pl-24">
        <h2 className="text-white text-sm sm:text-2xl lg:text-3xl font-semibold poppins">
          {item.title}
        </h2>
        <p className="text-[#b3acac] text-xs lg:text-sm hidden md:block">{item.description}</p>
        <button className="px-3 py-2 text-green bg-white rounded-md hover:bg-black duration-500">
          Shop Now
        </button>
      </div>

      <div className="flex justify-center ">
        <img className="md:w-[80%]" src={item.image} alt="banner_img" />
      </div>
    </div>
  );
};
