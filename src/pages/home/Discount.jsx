import discountImg from "../../../public/images/discount_img.png";
import headphone from "../../../public/images/headphone.png";
import watch from "../../../public/images/watch.png";
const Discount = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <div className="flex flex-col-reverse md:flex-row gap-4 items-center bg-[#e6e6f5] p-8 lg:w-[65%] rounded-md poppins">
        <div className="space-y-6 pl-8">
          <h3 className="text-xl md:text-3xl text-darkBlue font-semibold">
            20% discount on all types of clothes
          </h3>
          <p className="text-paragraph text-sm">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
            maxime blanditiis nam veritatis{" "}
          </p>
          <button className="px-8 py-2 bg-white border border-darkBlue rounded-md hover:bg-darkBlue duration-500 hover:text-white">
            Shop Now
          </button>
        </div>
        <div>
          <img src={discountImg} alt="discoun_img" />
        </div>
      </div>
      <div className="lg:w-[35%] flex flex-col sm:flex-row lg:flex-col gap-4 *:rounded-md">
        <div className="flex *:flex-1 items-center bg-[#e6e6f5] p-4 discount_gradeint poppins h-[180px]">
          <div className="space-y-4">
            <h3 className="lg:text-[18px] xl:text-xl text-white font-semibold">
             Get 20% of these
            </h3>
            <p className="text-xs xl:text-sm text-white">
              Lorem ipsum dolor, sit amet consectetur adipisicing
            </p>
            <button className="px-4 py-1 bg-white  rounded-md hover:bg-darkBlue duration-500 hover:text-white">
              Shop Now
            </button>
          </div>
          <div>
            <img src={watch} alt="discoun_img" />
          </div>
        </div>
        <div className="flex *:flex-1 items-center bg-[#e6e6f5] p-4 discount_gradeint_2 poppins h-[180px]">
          <div className="space-y-4">
            <h3 className="text-[18px] xl:text-xl text-white font-semibold">
             Get 20% of these
            </h3>
            <p className="text-paragraph text-xs xl:text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing
            </p>
            <button className="px-4 py-1 bg-white  rounded-md hover:bg-darkBlue duration-500 hover:text-white">
              Shop Now
            </button>
          </div>
          <div>
            <img className="w-[60%] mx-auto" src={headphone} alt="discoun_img" />
          </div>
        </div>
       
      </div>
    </div>
  );
};

export default Discount;
