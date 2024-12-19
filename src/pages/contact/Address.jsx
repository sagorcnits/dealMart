import { IoLocationOutline } from "react-icons/io5";
import { MdAddCall, MdOutlineMailOutline } from "react-icons/md";
import { useSelector } from "react-redux";

const Address = () => {

  const theme = useSelector((state) => state.darkMode);

  return (
    <div className={`grid sm:grid-cols-3 gap-6 relative lg:w-[90%] mx-auto ${theme == "light" ? "*:bg-white" : "*:bg-black"}`}>
      <div className="py-8  border border-green rounded-md  hover:bg-green duration-500 poppins hover:text-white text-xs sm:text-sm md:text-xl cursor-pointer text-center flex items-center gap-2  justify-center">
        <MdAddCall className="text-3xl"></MdAddCall>
        <h1 className="text-xs lg:text-[16px]">01852024152</h1>
      </div>
      <div className="py-8  border border-green rounded-md  hover:bg-green duration-500 poppins hover:text-white text-xs sm:text-sm md:text-xl cursor-pointer text-center flex items-center gap-2 justify-center">
        <MdOutlineMailOutline className="text-3xl"></MdOutlineMailOutline>
        <h1 className="text-xs lg:text-[16px]">dealmart@gmail.com</h1>
      </div>
      <div className="py-8  border border-green rounded-md  hover:bg-green duration-500 poppins hover:text-white text-xs sm:text-sm md:text-xl cursor-pointer text-center flex items-center gap-4 justify-center">
        <IoLocationOutline className="text-3xl"></IoLocationOutline>
        <h1 className="text-xs lg:text-[16px]">Pabna Sadar Pabna</h1>
      </div>
      <div className="categoryEffect hidden md:block"></div>
    </div>
  );
};

export default Address;
