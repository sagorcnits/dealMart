import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { FaHandHoldingUsd } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import {
  MdDoubleArrow,
  MdDownloadDone,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { TbProgressAlert } from "react-icons/tb";
const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextbtn = () => {
    if (currentPage < totalbtn.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  // previous button
  const prevBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <>
      <main>
        <div className="pt-16">
          <h1 className="text-3xl font-bold">Order List</h1>
        </div>
        <section className="mt-6">
          <Card></Card>
        </section>
        <section className="mt-6 bg-white rounded-md">
          <div className="flex justify-between items-center p-3">
            <p className="font-semibold">All Order List</p>
            <select
              name="category"
              className="select select-bordered  max-w-xs focus:outline-none border"
            >
              <option disabled selected>
                Sort by
              </option>
              <option>Canceled</option>
              <option>Complate</option>
              <option>Paid</option>
            </select>
          </div>
          <div className="overflow-auto">
            <Table></Table>
          </div>
        </section>
        <section className="mt-6 flex gap-3 items-center *:size-10 *:box-shadow *:flex *:justify-center *:items-center *:rounded-full *:duration-500">
          <button onClick={prevBtn} className=" hover:bg-blue hover:text-white">
            <MdDoubleArrow className="rotate-180"></MdDoubleArrow>
          </button>
          {[1, 2, 3, 4]?.map((item, id) => {
            return (
              <button
                onClick={() => setCurrentPage(id + 1)}
                className={`hover:bg-blue hover:text-white ${
                  currentPage == id + 1 && "bg-blue text-white"
                }`}
                key={id}
              >
                {id + 1}
              </button>
            );
          })}
          <button onClick={nextbtn} className="hover:bg-blue hover:text-white">
            <MdDoubleArrow></MdDoubleArrow>
          </button>
        </section>
      </main>
    </>
  );
};

export default OrderList;

// table

const Table = () => {
  const [activeStatus, setActiveStatus] = useState(false);

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="text-left *:p-3 border-b">
          <th>#Order Id</th>
          <th>Product</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Category</th>
          <th>Payment Status</th>
          <th>Order Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4].map((item, id) => {
          return (
            <tr key={id} className="*:p-3 border-b items-center">
              <td>#1292013</td>
              <td className="w-[200px]">
                <div className="flex items-center gap-2">
                  <figure className="overflow-hidden size-[50px] rounded-md">
                    <img
                      className="w-full h-full object-cover"
                      src="https://img.freepik.com/free-photo/rendering-smart-home-device_23-2151039302.jpg?t=st=1729786130~exp=1729789730~hmac=1329b4b8cb68ab8a0dd56c4b9c41325f3c6becb1508213696d45649e699acc45&w=740"
                      alt=""
                    />
                  </figure>
                  <p>Smart Watch</p>
                </div>
              </td>
              <td>Sagor Hossain</td>
              <td>10/24/2024</td>
              <td>Electronics</td>
              <td>Paid</td>
              <td>
                <div className="flex items-center gap-2">
                  <p>Complate</p>
                  <div>
                    <div className="dropdown dropdown-bottom dropdown-end">
                      <div tabIndex={0} role="button" className="m-1">
                        <BsThreeDotsVertical
                          onClick={() => setActiveStatus(!activeStatus)}
                          size={20}
                          className="mx-auto cursor-pointer"
                        ></BsThreeDotsVertical>
                      </div>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu bg-white rounded-box z-50 w-52 p-2 box-shadow"
                      >
                        <li>
                          <a>Complated</a>
                        </li>
                        <li>
                          <a>Canceled</a>
                        </li>
                        <li>
                          <a>Refund</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 *:cursor-pointer">
                    <IoEyeOutline size={20}></IoEyeOutline>
                    <MdOutlineDeleteForever size={20}></MdOutlineDeleteForever>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const Card = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 *:bg-white">
      <div className="flex justify-between items-center box-shadow p-4 rounded-md">
        <div className="space-y-3">
          <h1 className="font-semibold">Payment Refund</h1>
          <p className="text-paragraph">490</p>
        </div>
        <div>
          <FaHandHoldingUsd size={40}></FaHandHoldingUsd>
        </div>
      </div>
      <div className="flex justify-between *:text-customRed items-center box-shadow p-4 rounded-md">
        <div className="space-y-3">
          <h1 className="font-semibold ">Canceled Order</h1>
          <p>490</p>
        </div>
        <div>
          <CiShoppingCart size={40}></CiShoppingCart>
        </div>
      </div>
      <div className="flex justify-between text-green items-center box-shadow p-4 rounded-md">
        <div className="space-y-3">
          <h1 className="font-semibold">Complated</h1>
          <p>490</p>
        </div>
        <div>
          <MdDownloadDone size={40}></MdDownloadDone>
        </div>
      </div>
      <div className="flex justify-between *:text-darkBlue items-center box-shadow p-4 rounded-md">
        <div className="space-y-3">
          <h1 className="font-semibold">In Progress</h1>
          <p>490</p>
        </div>
        <div>
          <TbProgressAlert size={40}></TbProgressAlert>
        </div>
      </div>
    </div>
  );
};

// table
