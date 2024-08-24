import React from "react";
import shopImg from "../../../public/images/discount_img.png";
const Product = () => {
  return (
    <main className="max-w-7xl mx-auto px-2 xl:px-0">
      <div className="flex gap-4 items-center p-4 md:p-8 rounded-md poppins *:flex-1 h-[200px] md:h-auto mt-6 discount_gradeint_2  overflow-hidden">
        <div className="space-y-6 md:pl-8">
          <h3 className="text-sm md:text-3xl text-green font-semibold">
            25% discount on all types Products
          </h3>
          <p className="text-paragraph text-sm hidden md:block">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
            maxime blanditiis nam veritatis{" "}
          </p>
          <button className="px-8 py-2 bg-white border border-darkBlue rounded-md hover:bg-darkBlue duration-500 hover:text-white">
            Shop Now
          </button>
        </div>
        <div>
          <img src={shopImg} alt="Shop_img" />
        </div>
      </div>
    </main>
  );
};

export default Product;
