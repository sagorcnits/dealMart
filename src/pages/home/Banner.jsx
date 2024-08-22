import bannerImg from "../../../public/images/banner_img.png";

const Banner = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center *:flex-1 bg-green banner rounded-lg overflow-hidden poppins gap-2 p-4">
      <div className="space-y-3 sm:space-y-8 *:text-balance pl-6">
        <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold poppins">
          2024's top Mobile Collection
        </h2>
        <p className="text-[#b3acac] text-xs lg:text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iusto
          dolorem aspernatur nisi maxime quia nobis quae temporibus dolore velit
          excepturi, inventore in adipisci nemo.
        </p>
        <button className="px-3 py-2 text-green bg-white rounded-md hover:bg-black duration-500">
          Shop Now
        </button>
      </div>

      <div className="flex justify-center">
        <img className="w-1/2 md:w-[80%]" src={bannerImg} alt="banner_img" />
      </div>
    </div>
  );
};

export default Banner;
