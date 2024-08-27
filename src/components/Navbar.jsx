import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaBars } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  const user = useSelector((state) => state.user.user);

  return (
    <div className={active ? "activeNav" : "duration-700 border-b"}>
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
              >
                <div className="indicator ">
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
                    8
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
                  className="menu menu-sm dropdown-content bg-darkBlue text-white poppins rounded-box z-50 mt-3 w-52 p-2 shadow"
                >
                  <li className="hover:text-green duration-500">
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li className="hover:text-green duration-500">
                    <a>Settings</a>
                  </li>
                  <Link to="/login">
                    {" "}
                    <li className="hover:text-green duration-500">
                      <a>Logout</a>
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
