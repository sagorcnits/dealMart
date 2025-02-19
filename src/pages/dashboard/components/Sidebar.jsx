import { useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosArrowForward, IoMdArrowRoundBack } from "react-icons/io";
import {
  IoChatbubbleEllipsesOutline
} from "react-icons/io5";
import { LuLayoutDashboard, LuShoppingBag } from "react-icons/lu";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const Sidebar = ({ sidebar, mobileSideBar, handleMobileSideBar }) => {
// dark mode
  const theme = useSelector((state) => state.darkMode);

  return (
    <div>
      <div
        className={`h-screen duration-700 ${theme == "light" ? "bg-[#F3F5F9]" : "bg-black border-gray-700"} box-shadow border-r z-20 w-[250px] hidden lg:block ${
          sidebar ? "left-0" : "-left-[250px]"
        } fixed`}
      >
        <div className={`flex items-center gap-2 py-[8px] px-3 border-b ${theme == "light" ? "bg-dashBgColor" : "bg-black border-gray-700"}`}>
          <div className="logo bg-darkBlue size-12 flex justify-center items-center text-3xl">
            <h1 className="font-bold text-white">D</h1>
          </div>
          <h1 className={`${theme == "light" ? "" : "text-gray-200"} font-bold text-2xl`}>DealMart</h1>
        </div>
        <SidebarItem></SidebarItem>
      </div>
      {/* mobile sidebar  */}
      <div
        className={`h-screen duration-700  ${theme == "light" ? "bg-white" : "bg-black"} box-shadow w-[250px] lg:hidden ${
          mobileSideBar ? "left-0" : "-left-[250px]"
        } fixed z-50`}
      >
        <div className="flex justify-between items-center gap-2 py-2 px-3 border-b">
          <div className="flex items-center gap-3">
            <div className="logo bg-darkBlue size-12 flex justify-center items-center text-3xl">
              <h1 className="font-bold text-white">D</h1>
            </div>
            <h1 className="font-bold text-2xl">DealMart</h1>
          </div>
          <span onClick={handleMobileSideBar} className="cursor-pointer">
            <IoMdArrowRoundBack></IoMdArrowRoundBack>
          </span>
        </div>
        <SidebarItem handleMobileSideBar={handleMobileSideBar}></SidebarItem>
      </div>
    </div>
  );
};

export default Sidebar;

const SidebarItem = ({ handleMobileSideBar }) => {
  const [dropdownActive, setDropdownActive] = useState(true);
  const theme = useSelector((state) => state.darkMode);
  return (
    <ul className={`${theme == "light" ? "" : "text-white"}`}>
      <li onClick={handleMobileSideBar}>
        <NavLink
          to="/dashboard/admin_dashboard"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active_sidbar_item sidebar_nav"
              : "sidebar_nav"
          }
        >
          <LuLayoutDashboard></LuLayoutDashboard>
          <p>Dashboard</p>
        </NavLink>
      </li>
      <li
        onClick={() => setDropdownActive(!dropdownActive)}
        className={`px-4 py-2 mt-2 cursor-pointer overflow-hidden  duration-500  ${
          dropdownActive ? "h-[40px]" : "h-[130px]"
        }`}
      >
        <div className="flex justify-between items-center ">
          <div className="flex items-center gap-4">
            <LuShoppingBag></LuShoppingBag>
            <p>Products</p>
          </div>
          <IoIosArrowForward
            className={`${!dropdownActive && "rotate-90 "} duration-500`}
          ></IoIosArrowForward>
        </div>
        <div>
          <ul>
            <li onClick={handleMobileSideBar}>
              <NavLink
                to="/dashboard/all-product"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "active_sidbar_item sidebar_nav"
                    : "sidebar_nav"
                }
              >
                <LuLayoutDashboard></LuLayoutDashboard>
                <p>all Product</p>
              </NavLink>
            </li>
            <li onClick={handleMobileSideBar}>
              <NavLink
                to="/dashboard/create-product"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "active_sidbar_item sidebar_nav"
                    : "sidebar_nav"
                }
              >
                <LuLayoutDashboard></LuLayoutDashboard>
                <p>Create Product</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </li>
      <li onClick={handleMobileSideBar}>
        <NavLink
          to="/dashboard/customers"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active_sidbar_item sidebar_nav"
              : "sidebar_nav"
          }
        >
          <FaUsers></FaUsers>
          <p>Customers</p>
        </NavLink>
      </li>
      <li onClick={handleMobileSideBar}>
        <NavLink
          to="/dashboard/order-list"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active_sidbar_item sidebar_nav"
              : "sidebar_nav"
          }
        >
          <FiShoppingCart></FiShoppingCart>
          <p>Order List</p>
        </NavLink>
      </li>
     
      <li onClick={handleMobileSideBar}>
        <NavLink
          to="/dashboard/chat/message-user/sagor@gmail.com"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active_sidbar_item sidebar_nav"
              : "sidebar_nav"
          }
        >
          <IoChatbubbleEllipsesOutline></IoChatbubbleEllipsesOutline>
          <p>Chat</p>
        </NavLink>
      </li>
     
    </ul>
  );
};
