import { GiSelfLove } from "react-icons/gi";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartItem/cartSlice";

const ProductCard = ({ item }) => {
  const {
    _id,
    product_name,
    reguler_price,
    sale_price,
    brand_name,
    category_name,
    images,
    description,
    quantity_in_stock,
    stock_status,
  } = item;

  const addToCartProduct = {
    _id,
    product_name,
    reguler_price,
    sale_price,
    images,
    quantity: 1,
  };

  // console.log(item)

  const dispatch = useDispatch();

  return (
    <div className="dashboard_card card-compact relative bg-white border poppins  md:h-[400px] cursor-pointer hover:border-green duration-500 rounded-md overflow-hidden z-0">
      <figure className="h-[170px] overflow-hidden relative">
        <img src={images[0]} alt={product_name} />
        <div className="flex z-10  justify-center items-center gap-6 absolute dashboard_card_effect right-0 top-0 bottom-0 left-0  bg-black opacity-80 px-4">
          <Link to={`/product/details/${_id}`}>
            <div className="logo bg-darkBlue size-10 hover:bg-gray-500 duration-500 flex justify-center items-center  text-white">
              <IoEyeOutline></IoEyeOutline>
            </div>
          </Link>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="text-sm md:text-[17px] font-semibold leading-6">
          {product_name}
        </h2>
        <p className="text-paragraph">{description?.slice(0, 50)}</p>
        <div className="flex items-center justify-between *:flex *:items-center *:gap-2">
          <div>
            {/* <div className="flex items-center gap-1">
              <span className="rating bg-orange-500 size-4"></span>
              <p>4.1</p>
            </div> */}
            <span className="bg-[#e9f6f6] px-3 py-2 rounded-md text-darkBlue font-semibold">
              {quantity_in_stock} sold
            </span>
          </div>
          <div>
            <del className="text-paragraph text-sm">${reguler_price}</del>
            <h2 className="font-semibold text-xl md:text-3xl">${sale_price}</h2>
          </div>
        </div>
        <div className="flex items-center gap-4 *:rounded-md mt-4 absolute bottom-4 left-0 w-full px-4">
          <button className="w-[30%] h-[45px] bg-white border border-darkBlue flex justify-center items-center text-xl  hover:bg-darkBlue duration-500 hover:text-white">
            <GiSelfLove></GiSelfLove>
          </button>
          <button
            onClick={() => dispatch(addToCart(addToCartProduct))}
            className="w-[70%] h-[45px] border border-darkBlue bg-white text-darkBlue hover:bg-darkBlue duration-500 hover:text-white"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
