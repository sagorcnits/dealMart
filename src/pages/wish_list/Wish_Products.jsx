import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { addToCart } from "../../features/cartItem/cartSlice";
import useAxios from "../../hooks/useAxios";
import Banner from "./Banner";

const Wish_Products = () => {
  const [wishlists, setWishlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(true);
  const axiosFetch = useAxios();
  const user = useSelector((state) => state.user.user);
  // get wishlist data by user email from server
  useEffect(() => {
    if (user?.email) {
      axiosFetch
        .get(`/wishlists?email=${user?.email}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.message == "ok") {
            setWishlists(res.data.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [user, reload]);

  return (
    <div className="max-w-7xl mx-auto px-2 xl:px-0">
      <section className="mt-6">
        <Banner></Banner>
      </section>
      <section className="mt-10">
        <h1 className="text-center font-semibold text-3xl">Your Wishlist</h1>
        {wishlists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
            {wishlists?.map((item, id) => (
              <ProductCard
                reload={reload}
                setReload={setReload}
                loading={loading}
                key={id}
                item={item}
              ></ProductCard>
            ))}
          </div>
        ) : (
          <div className="h-[300px] flex justify-center items-center">
            <h1 className="text-3xl font-bold">wishlist NotFound</h1>
          </div>
        )}
      </section>
    </div>
  );
};

export default Wish_Products;
// product card
const ProductCard = ({ item, loading, reload, setReload }) => {
  const axiosFetch = useAxios();
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
  } = item?.product_id;

  const addToCartProduct = {
    _id,
    product_name,
    reguler_price,
    sale_price,
    images,
    totalAmount: sale_price,
    quantity: 1,
  };

  const dispatch = useDispatch();
  // remove function in the wishlist
  const removeWishlist = (id) => {
    axiosFetch
      .delete(`/wishlists/${id}`)
      .then((res) => {
        if (res.data.message == "ok") {
          Swal.fire({
            icon: "success",
            title: "deleted !",
            text: "remove your wish product",
          });

          setReload(!reload);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // loader
  if (loading) {
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
    );
  }

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
          <button
            onClick={() => removeWishlist(item?._id)}
            className="w-[30%] h-[45px] bg-white border border-darkBlue flex justify-center items-center text-xl  hover:bg-darkBlue duration-500 hover:text-white"
          >
            <RiDeleteBin2Fill></RiDeleteBin2Fill>
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
