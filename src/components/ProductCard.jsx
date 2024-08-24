import { GiSelfLove } from "react-icons/gi";

const ProductCard = () => {
  return (
    <div className="card-compact  bg-white border poppins h-[400px] cursor-pointer hover:border-green duration-500 rounded-md overflow-hidden">
      <figure className="h-[170px] overflow-hidden">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="text-[17px] font-semibold leading-6">
          Shoes! If a dog chews shoes whose shoes does he choose?
        </h2>
        <p className="text-paragraph">Shoes</p>
        <div className="flex items-center justify-between *:flex *:items-center *:gap-2">
          <div>
            <div className="flex items-center gap-1">
              <span className="rating bg-orange-500 size-4"></span>
              <p>4.1</p>
            </div>
            <span className="bg-[#e9f6f6] px-3 py-2 rounded-md text-darkBlue font-semibold">
              7k+ sold
            </span>
          </div>
          <div>
            <del className="text-paragraph text-sm">$699</del>
            <h2 className="font-semibold text-3xl">$399</h2>
          </div>
        </div>
        <div className="flex items-center gap-4 *:rounded-md mt-4">
          <button className="w-[30%] h-[45px] bg-white border border-darkBlue flex justify-center items-center text-xl  hover:bg-darkBlue duration-500 hover:text-white">
            <GiSelfLove></GiSelfLove>
          </button>
          <button className="w-[70%] h-[45px] border border-darkBlue bg-white text-darkBlue hover:bg-darkBlue duration-500 hover:text-white">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
