import { useState } from "react";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { IoNotificationsOutline, IoSunnyOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../../../features/user/userSlice";

const Navbar = ({ handleSideBar, handleMobileSideBar, sidebar }) => {
  const [notification, setNotication] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <div
      className={`z-20 flex justify-between items-center px-3 py-2 bg-white box-shadow left-0 fixed ${
        sidebar ? "lg:left-[250px]" : "left-0"
      } right-0 duration-700`}
    >
      <div className="flex justify-center items-center gap-6">
        <IoMdMenu
          className="cursor-pointer hidden lg:block"
          size={30}
          onClick={handleSideBar}
        ></IoMdMenu>
        <IoMdMenu
          className="cursor-pointer lg:hidden"
          size={30}
          onClick={handleMobileSideBar}
        ></IoMdMenu>
      </div>

      <div className="flex items-center gap-4">
        <div className="size-8 rounded-full bg-slate-200 flex justify-center items-center cursor-pointer">
          <IoSunnyOutline></IoSunnyOutline>
        </div>
        <div className="size-8 rounded-full bg-slate-200 flex justify-center items-center cursor-pointer">
          <FaRegMessage></FaRegMessage>
        </div>
        <div
          onClick={() => setNotication(!notification)}
          className="size-8 rounded-full bg-slate-200 flex justify-center items-center cursor-pointer relative"
        >
          <IoNotificationsOutline size={25}></IoNotificationsOutline>
          <div
            className={`bg-customRed absolute top-1 right-2 size-2 rounded-full `}
          ></div>
          <Link to="/dashboard/order-list">
            <div
              className={`w-[200px] bg-white shadow-xl h-[70px] absolute -bottom-[90px] right-0 border flex justify-center items-center rounded-lg ${
                notification ? "block" : "hidden"
              }`}
            >
              <h1 className="font-semibold text-xl">Pending order : 5</h1>
            </div>
          </Link>
        </div>

        <div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle  avatar"
            >
              <div className="w-10 rounded-full ">
                <img alt="Tailwind CSS Navbar component" src={user?.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-darkBlue text-white poppins rounded-box z-50 mt-3 w-52 p-2 shadow space-y-3"
            >
              <Link to="/">
                <li className="hover:text-green duration-500 pl-3">Home</li>
              </Link>
              <Link to="/create-product">
                <li className="hover:text-green duration-500 pl-3">
                  Create Product
                </li>
              </Link>
              <Link onClick={() => dispatch(removeUser())}>
                {" "}
                <li className="hover:text-green duration-500 pl-3">Logout</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
