import React from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaUsersLine, FaUsersRectangle } from "react-icons/fa6";
import { FcProcess, FcSalesPerformance } from "react-icons/fc";
import { FiShoppingCart } from "react-icons/fi";
import { MdDone, MdOutlineCancel } from "react-icons/md";
const AdminDashboard = () => {
  return (
    <div className="bg-dashBgColor  mt-16">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <section>
        <SalesCard></SalesCard>
      </section>
      <div className="grid grid-cols-4 gap-4 mt-4 *:h-[300px]">
        <div className="flex justify-center items-center col-span-1 box-shadow bg-white">
          <h1>Comming soon.....</h1>
        </div>
        <div className="flex justify-center items-center col-span-3 box-shadow bg-white">
          <h1>Comming soon.....</h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4 *:h-[300px]">
        <div className="flex justify-center items-center col-span-3 box-shadow bg-white">
          <h1>Comming soon.....</h1>
        </div>
        <div className="flex justify-center items-center col-span-1 box-shadow bg-white">
          <h1>Comming soon.....</h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4 *:h-[300px]">
        <div className="flex justify-center items-center col-span-2 box-shadow bg-white">
          <h1>Comming soon.....</h1>
        </div>
        <div className="flex justify-center items-center col-span-2 box-shadow bg-white">
          <h1>Comming soon.....</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const SalesCard = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-6 *:box-shadow *:bg-white *:px-3 *:py-6 *:items-center *:flex *:gap-4 *:rounded-md">
      <div>
        <div className="size-[50px] rounded-full bg-green flex justify-center items-center  text-white ">
          <FcSalesPerformance size={25}></FcSalesPerformance>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">Total Sales</p>
          <h1>3799</h1>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#059669] flex justify-center items-center  text-white ">
          <FaHandHoldingUsd size={25}></FaHandHoldingUsd>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">Total Revenue</p>
          <h1>$3799.00</h1>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#FB923C] flex justify-center items-center  text-white ">
          <FaUsersRectangle size={25}></FaUsersRectangle>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">Total Visitor</p>
          <h1>5000</h1>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#3B82F6] flex justify-center items-center  text-white ">
          <FaUsersLine size={25}></FaUsersLine>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">Total Customer</p>
          <h1>5034</h1>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#bb923a] flex justify-center items-center text-white ">
          <FiShoppingCart size={25}></FiShoppingCart>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">Total order</p>
          <h1>5034</h1>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#DBEAFE] flex justify-center items-center  text-white ">
          <FcProcess size={25}></FcProcess>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">order pending</p>
          <h1>5034</h1>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-customRed flex justify-center items-center text-white">
          <MdOutlineCancel size={25}></MdOutlineCancel>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">order canceled</p>
          <h1>5034</h1>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#059669] flex justify-center items-center text-white">
          <MdDone size={25}></MdDone>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">order complated</p>
          <h1>5034</h1>
        </div>
      </div>
    </div>
  );
};
