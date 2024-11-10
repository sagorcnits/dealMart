import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  addToCart,
  minusCart,
  removeCart,
} from "../features/cartItem/cartSlice";
import { removeUser } from "../features/user/userSlice";
import useAxios from "../hooks/useAxios";

const Navbar = () => {
  const [openCart, setOpenCart] = useState(false);
  const [active, setActive] = useState(false);
  const admin = true;
  // scroll effect of navabr
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  // get the carts form redux store
  const { carts } = useSelector((state) => state.carts);
  const totalCartQuantity = carts.reduce(
    (prev, curr) => prev + curr.quantity,
    0
  );
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // console.log(carts)
  return (
    <div className={active ? "activeNav" : "duration-700 border-b"}>
      <Order openCart={openCart} setOpenCart={setOpenCart}></Order>
      <div className="navbar flex justify-between max-w-7xl mx-auto *:flex-1 gap-10">
        <div className="flex gap-20 items-center">
          <div className="flex gap-2 items-center">
            <FaBars className="text-xl lg:hidden"></FaBars>
            <h1 className="text-black font-bold text-3xl">
              Deal<span className="text-green">Mart</span>
            </h1>
          </div>
          <div className="hidden sm:flex items-center border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="search"
              className="px-3 focus:outline-none"
            />
            <button className="bg-green px-3 py-3 border-none text-white hover:bg-black duration-500">
              <CiSearch></CiSearch>
            </button>
          </div>
        </div>

        <div className="flex-none justify-end lg:justify-between">
          <ul className="hidden lg:flex items-center lg:gap-6 xl:gap-10 poppins *:duration-500">
            <li className="hover:text-green">
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                to="/"
              >
                Home
              </NavLink>
            </li>

            <li className="hover:text-green">
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                to="/products"
              >
                Products
              </NavLink>
            </li>
            <li className="hover:text-green">
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                to="/about"
              >
                About Us
              </NavLink>
            </li>
            <li className="hover:text-green">
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                to="/contact"
              >
                Contact us
              </NavLink>
            </li>
          </ul>
          <div className="flex items-center gap-4">
            <div className="dropdown dropdown-end flex items-center gap-4">
              <GiSelfLove className="text-xl cursor-pointer hover:text-green duration-500"></GiSelfLove>
              <div
                tabIndex={0}
                role="button"
                className="hover:text-green duration-500"
                onClick={() => setOpenCart(true)}
              >
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item text-red-500 poppins">
                    {totalCartQuantity}
                  </span>
                </div>
              </div>
            </div>
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user.photoUrl}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-darkBlue text-white  poppins rounded-box z-50 mt-3 w-52 p-2 shadow space-y-3"
                >
                  {admin && (
                    <Link to="/dashboard">
                      <li className="hover:text-green duration-500 pl-3">
                        Dashboard
                      </li>
                    </Link>
                  )}
                  <li className="hover:text-green duration-500">
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <Link to="/create-product">
                    <li className="hover:text-green duration-500 pl-3">
                      Create Product
                    </li>
                  </Link>
                  <Link onClick={() => dispatch(removeUser())}>
                    {" "}
                    <li className="hover:text-green duration-500 pl-3">
                      Logout
                    </li>
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/login">
                <span className="cursor-pointer poppins hover:text-green duration-500">
                  Login
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

const Order = ({ openCart, setOpenCart }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [shippingVat, setShippingVat] = useState(0);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const axiosFetch = useAxios();
  // all carts and user
  const { carts } = useSelector((state) => state.carts);
  const { user } = useSelector((state) => state.user);
  const orderProducts = carts.map((item, id) => {
    return {
      product_id: item._id,
      quantity: item.quantity,
      total_price: item.totalAmount,
    };
  });
  // total price function
  let totalPrice = carts.reduce((prev, curr) => {
    return prev + curr.totalAmount;
  }, 0);

  const dispatch = useDispatch();

  // shipping amount function
  const handleShippping = (data) => {
    const shipping = data.target.value;
    if (shipping === "inside_dhaka") {
      setShippingVat(60);
    } else {
      setShippingVat(120);
    }
  };
  // order information function
  const orderData = (name, phone, address) => {
    setName(name);
    setPhone(phone);
    setAddress(address);
  };

  // order add function
  const handleOrder = () => {
    if (!name && !phone && !address) {
      return alert("please share your shipping address");
    }

    const orderData = {
      products: orderProducts,
      customer: name,
      customer_img: user.photoUrl,
      shipping_address: address,
      shipping_price: shippingVat,
      phone: phone,
      email: user.email,
      payment_infor: isChecked ? "cash on delivery" : "online payment",
      total_price: totalPrice,
      payment_status: isChecked ? "upaid" : "paid",
      order_status: {
        status: "pending",
        track_order: [
          {
            status: "pending",
          },
        ],
      },
    };

    axiosFetch
      .post("/orders", orderData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("ok");
  };

  return (
    <div
      className={`fixed z-50 top-0 ${
        openCart ? "right-0" : "-right-[400px]"
      } w-[380px] bg-white box-shadow bottom-0 overflow-auto duration-500`}
    >
      <div className="flex gap-2 items-center poppins justify-between px-4 py-5">
        <h1>Shopping Cart</h1>
        <IoMdClose
          onClick={() => setOpenCart(false)}
          className="cursor-pointer text-xl"
        ></IoMdClose>
      </div>
      <div>
        {carts?.map((item, id) => {
          const {
            _id,
            product_name,
            sale_price,
            brand_name,
            category_name,
            images,
            description,
            quantity,
          } = item;

          return (
            <div
              key={id}
              className="flex gap-2 p-2 items-center poppins border-b"
            >
              <div className="w-[120px] h-[90px] overflow-hidden rounded-md">
                <img
                  className="w-full h-full"
                  src={images[0]}
                  alt="product_card"
                />
              </div>
              <div className="space-y-2 text-sm">
                <h3>{product_name}</h3>
                <p>${sale_price}</p>
                <div className="flex gap-6">
                  <div className="flex items-center gap-10 bg-darkBlue py-2 rounded-md px-4 *:text-white">
                    <button onClick={() => dispatch(minusCart(item))}>-</button>
                    <p>{quantity}</p>
                    <button onClick={() => dispatch(addToCart(item))}>+</button>
                  </div>
                  <button
                    onClick={() => dispatch(removeCart(item))}
                    className="text-xl text-red-500"
                  >
                    <MdDeleteForever></MdDeleteForever>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {carts?.length > 0 && (
        <>
          <div className="flex gap-2 items-center poppins justify-between px-4 py-2">
            <h1>Subtitle</h1>
            <p>{totalPrice}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="border-b py-2 px-4">
              <p className="font-bold">Shipping</p>
              <div className="mt-2 flex gap-3 *:cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  id="inside_dhaka"
                  value="inside_dhaka"
                  onChange={handleShippping}
                />
                <label htmlFor="inside_dhaka">inside Dhaka City :</label>
                <p className="font-bold"> 60 TK</p>
              </div>
              <div className="flex gap-3 *:cursor-pointer">
                <input
                  type="radio"
                  name="shipping"
                  id="outside_dhaka"
                  value="outside_dhaka"
                  onChange={handleShippping}
                />
                <label htmlFor="outside_dhaka">Outside Dhaka City :</label>
                <p className="font-bold"> 120 Tk</p>
              </div>
            </div>
          </div>
          <div className="flex items-center  p-3 poppins">
            <input
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              type="checkbox"
              name="cash_on"
              id="cash_on"
              aria-label="cash on delivery"
              className="mr-1 rounded-sm cursor-pointer"
            />
            <label htmlFor="cash_on" className="text-sm cursor-pointer">
              Cash On delivery
            </label>
          </div>
          {isChecked && <OrderInput orderData={orderData}></OrderInput>}
          <div className="px-2 py-4">
            {isChecked ? (
              <button
                onClick={handleOrder}
                className="w-full bg-green py-3 text-center  rounded-md text-white hover:bg-black duration-500 poppins"
              >
                Order now
              </button>
            ) : (
              <button className="w-full bg-green py-3 text-center  rounded-md text-white hover:bg-black duration-500 poppins">
                Check Out
              </button>
            )}
          </div>{" "}
        </>
      )}
    </div>
  );
};

const OrderInput = ({ orderData }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  orderData(name, phone, address);

  return (
    <div className="px-2">
      <div className="flex gap-4 *:w-full *:rounded-md  *:p-2 ">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="name"
          className="focus:outline-none border"
          value={name}
        />
        <input
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          placeholder="phone"
          className="focus:outline-none border"
          value={phone}
          name="phone"
        />
      </div>
      <textarea
        onChange={(e) => setAddress(e.target.value)}
        type="text"
        placeholder="address"
        value={address}
        name="address"
        className="focus:outline-none h-[100px] overflow-auto w-full mt-4 rounded-md p-2 resize-none border"
      />
    </div>
  );
};
