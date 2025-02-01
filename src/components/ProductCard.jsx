import { GiSelfLove } from "react-icons/gi";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { addToCart } from "../features/cartItem/cartSlice";
import useAxios from "../hooks/useAxios";
import useWishlists from "../hooks/useWishlists";
const ProductCard = ({ item, layout }) => {
  const user = useSelector((state) => state.user.user);
  const axiosFetch = useAxios();
  const [wishlists, refetch] = useWishlists();
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
    totalAmount: sale_price,
    quantity: 1,
  };

  // console.log(item)
  const dispatch = useDispatch();

  const addWishlistProduct = () => {
    const productInfo = {
      name: user?.name,
      email: user?.email,
      product_id: _id,
    };
    if (!user?.email) {
      return toast.warn("Please Before Login After try again..!");
    }
    axiosFetch
      .post("/wishlists", productInfo)
      .then((res) => {
        if (res.data.message == "ok") {
          // toast.success("success your add wishlist!");
          Swal.fire({
            icon: "success",
            title: "added",
            text: "has been added your product in wishlists",
            timer: 2000,
          });
          refetch();
        } else if (res.data.message == "exist") {
          toast.warn("already added in wishlist!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // dark mode 

  const theme = useSelector((state) => state.darkMode);

  return (
    <div className={`dashboard_card card-compact relative  border poppins  md:h-[400px] cursor-pointer hover:border-green duration-500 rounded-md overflow-hidden z-0 ${theme == "light" ? "bg-white" : "bg-black"}`}>
      <ToastContainer className="mt-20"></ToastContainer>
      <figure className="h-[170px] overflow-hidden relative">
        <img className="w-full h-full" src={images[0]} alt={product_name} />
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
        <div className="flex items-center justify-between ">
          <div>

            <span className={`bg-[#e9f6f6] px-3 py-2 rounded-md text-darkBlue font-semibold `}>
              {quantity_in_stock} sold
            </span>
          </div>
          <div>
            <h2 className={`font-semibold text-xl ${layout == 4 ? "md:text-sm" : "md:text-2xl"}`}>${sale_price}</h2>
            <del className="text-paragraph text-sm">${reguler_price}</del>
          </div>
        </div>
        <div className="flex items-center gap-4 *:rounded-md mt-4 absolute bottom-4 left-0 w-full px-4">
          <button
            onClick={addWishlistProduct}
            className="w-[30%] h-[45px] bg-white border border-darkBlue flex justify-center items-center text-xl  hover:bg-darkBlue duration-500 hover:text-white"
          >
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
