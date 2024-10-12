import { useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { HiUserPlus } from "react-icons/hi2";
import { IoIosArrowForward, IoMdArrowRoundBack } from "react-icons/io";
import {
  IoChatbubbleEllipsesOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuLayoutDashboard, LuShoppingBag } from "react-icons/lu";
import { NavLink } from "react-router-dom";
const Sidebar = ({ sidebar, mobileSideBar, handleMobileSideBar }) => {
  return (
    <div>
      <div
        className={`h-screen duration-700 bg-white box-shadow w-[250px] hidden lg:block ${
          sidebar ? "left-0" : "-left-[250px]"
        } fixed`}
      >
        <div className="flex items-center gap-2 py-2 px-3 border-b">
          <div className="logo bg-darkBlue size-12 flex justify-center items-center text-3xl">
            <h1 className="font-bold text-white">D</h1>
          </div>
          <h1 className="font-bold text-2xl">DealMart</h1>
        </div>
        <SidebarItem></SidebarItem>
      </div>
      <div
        className={`h-screen duration-700 bg-white box-shadow w-[250px] lg:hidden ${
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

  return (
    <ul>
      <li onClick={handleMobileSideBar}>
        <NavLink
          to="/dashboard/dashboard"
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
          to="/dashboard/users"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active_sidbar_item sidebar_nav"
              : "sidebar_nav"
          }
        >
          <HiUserPlus></HiUserPlus>
          <p>Users</p>
        </NavLink>
      </li>
      <li onClick={handleMobileSideBar}>
        <NavLink
          to="/dashboard/chat"
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
      <li onClick={handleMobileSideBar}>
        <NavLink
          to="/dashboard/settings"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "active_sidbar_item sidebar_nav"
              : "sidebar_nav"
          }
        >
          <IoSettingsOutline></IoSettingsOutline>
          <p>Settings</p>
        </NavLink>
      </li>
    </ul>
  );
};
