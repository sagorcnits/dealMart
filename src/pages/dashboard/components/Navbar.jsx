import { useState } from "react";
import { FaRegMessage } from "react-icons/fa6";
import { IoIosClose, IoMdMenu } from "react-icons/io";
import { IoNotificationsOutline, IoSunnyOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleTheme } from "../../../features/dark_mode/dark_mode";
import { removeUser } from "../../../features/user/userSlice";
const Navbar = ({ handleSideBar, handleMobileSideBar, sidebar }) => {
  const [notification, setNotication] = useState(false);
  const [MessageNotification, setMessageNotification] = useState(false);

  // const [theme, setTheme] = useState(() => {
  //   const initialTheme = localStorage.getItem("theme");
  //   return initialTheme ? initialTheme : "light";
  // });

  // useEffect(() => {
  //   localStorage.setItem("theme", theme);
  //   document.querySelector("html").setAttribute("data-theme", theme);
  // }, [theme]);
  // // console.log(user)

  const theme = useSelector((state) => state.darkMode);

  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();



  return (
    <div
      className={`z-20 flex justify-between items-center px-3 py-2 ${theme == "light" ? "bg-[#F3F5F9]" : "bg-black"
        } box-shadow left-0 fixed ${sidebar ? "lg:left-[250px]" : "left-0"
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
        <div
          onClick={() => dispatch(toggleTheme())}
          className="size-8 rounded-full bg-slate-200 flex justify-center items-center cursor-pointer"
        >
          {theme == "dark" ? (
            <MdDarkMode></MdDarkMode>
          ) : (
            <IoSunnyOutline></IoSunnyOutline>
          )}
        </div>
        <div className="size-8 rounded-full bg-slate-200 flex justify-center items-center cursor-pointer relative">
          <FaRegMessage
            onClick={() => setMessageNotification(!MessageNotification)}
          ></FaRegMessage>
          <div
            className={`bg-customRed absolute top-1 right-2 size-2 rounded-full `}
          ></div>

          <div
            className={`w-[350px] bg-white shadow-xl h-[320px] absolute -bottom-[340px] -right-16 md:right-0 border  rounded-lg p-2 ${MessageNotification ? "block" : "hidden"
              }`}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">recent order</p>
              <IoIosClose
                size={25}
                className="cursor-pointer"
                onClick={() => setMessageNotification(!MessageNotification)}
              ></IoIosClose>
            </div>
            {[1, 2, 4].map((item, id) => {
              return (
                <div
                  key={id}
                  className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#a7a3a3] duration-500 mt-2"
                >
                  <div className="size-[50px] rounded-full overflow-hidden border">
                    <img
                      src="https://lh3.googleusercontent.com/a/ACg8ocL-G38YycrNTgadRSctDVoHou9KPcM8OrqlQk9-I03rsqVALHA=s288-c-no"
                      alt="user profile"
                      className="w-full h-full"
                    />
                  </div>
                  <div className="hidden md:block">
                    <h1 className="font-semibold">Sagor Hossain</h1>
                    <p className="text-xs">ay product re dam koto</p>
                  </div>
                </div>
              );
            })}
            <Link
              onClick={() => setMessageNotification(!MessageNotification)}
              to="/dashboard/chat"
            >
              <button className="py-[10px] w-full text-center bg-blue hover:bg-customRed duration-500 text-white mt-3 rounded-lg">
                View All
              </button>
            </Link>
          </div>
        </div>
        {/* notification */}
        <div className="size-8 rounded-full bg-slate-200 flex justify-center items-center  relative">
          <IoNotificationsOutline
            onClick={() => setNotication(!notification)}
            className="cursor-pointer"
            size={25}
          ></IoNotificationsOutline>
          <div
            className={`bg-customRed absolute top-1 right-2 size-2 rounded-full `}
          ></div>

          <div
            className={`w-[350px] bg-white shadow-xl h-[320px] absolute -bottom-[340px] -right-16 md:right-0 border  rounded-lg p-2 ${notification ? "block" : "hidden"
              }`}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">recent order</p>
              <IoIosClose
                size={25}
                className="cursor-pointer"
                onClick={() => setNotication(!notification)}
              ></IoIosClose>
            </div>
            {[1, 2, 4].map((item, id) => {
              return (
                <div
                  key={id}
                  className="flex justify-between px-2 py-4 mt-4 border rounded-lg hover:bg-paragraph duration-500"
                >
                  <p>Ridoy</p>
                  <p>2024-04-27</p>
                  <p>$567</p>
                  <p>4</p>
                </div>
              );
            })}
            <Link
              onClick={() => setNotication(!notification)}
              to="/dashboard/order-list"
            >
              <button className="py-[10px] w-full text-center bg-blue hover:bg-customRed duration-500 text-white mt-3 rounded-lg">
                View All
              </button>
            </Link>
          </div>
        </div>
        {/* image user */}
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
