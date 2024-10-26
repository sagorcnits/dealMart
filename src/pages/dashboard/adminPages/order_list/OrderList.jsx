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
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../../../hooks/useAxios";
import useOrders from "../../../../hooks/useOrders";
const OrderList = () => {
  const [orders, refetch] = useOrders();
  const [currentPage, setCurrentPage] = useState(1);

  //  pagination next btn
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
            <Table orders={orders} refetch={refetch}></Table>
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
const Table = ({ orders, refetch }) => {
  const [activeStatus, setActiveStatus] = useState(false);
  const axiosFetch = useAxios();
  // remove order product
  const deleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosFetch
          .delete(`/orders/${id}`)
          .then((res) => {
            if (res.data.message === "ok") {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  //  update data by order status
  const updateOrder = (status, id) => {
    axiosFetch
      .put(`/orders/${id}`, { status: status, })
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Update",
            text: "Your file has been Updated.",
            icon: "success",
          });
          refetch();
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Update is not working",
          text: "Somthong Wrong",
          icon: "warning",
        });
        console.log(error);
      });
  };

  return (
    <table className="w-full">
      <thead>
        <tr className="text-left *:p-3 border-b">
          <th>#Order Id</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Total</th>
          <th>Items</th>
          <th>Payment Status</th>
          <th>Order Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((item, id) => {
          const {
            _id,
            orderId,
            products,
            customer,
            total_price,
            payment_status,
            order_status,
            createdAt,
          } = item;
          return (
            <tr
              key={id}
              className="*:p-3 border-b items-center hover:bg-[#f1efef] duration-500"
            >
              <td>{orderId}</td>
              <td>{customer}</td>
              <td>{createdAt.slice(0, 10)}</td>
              <td>${total_price}</td>
              <td>{products.length}</td>
              <td>
                <div className="flex items-center gap-2">
                  <p>{payment_status}</p>
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
                        <li onClick={() => updateOrder("paid", _id)}>
                          <a>paid</a>
                        </li>
                        <li onClick={() => updateOrder("unpaid", _id)}>
                          <a>unpaid</a>
                        </li>
                        <li onClick={() => updateOrder("refund", _id)}>
                          <a>refund</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <p>{order_status}</p>
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
                        <li onClick={() => updateOrder("complated", _id)}>
                          <a>Complated</a>
                        </li>
                        <li onClick={() => updateOrder("canceled", _id)}>
                          <a>Canceled</a>
                        </li>
                        <li onClick={() => updateOrder("progress", _id)}>
                          <a>Progress</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 *:cursor-pointer">
                    <Link to={`/dashboard/order-details/${_id}`}>
                      <IoEyeOutline size={20}></IoEyeOutline>
                    </Link>
                    <MdOutlineDeleteForever
                      onClick={() => deleteOrder(_id)}
                      size={20}
                    ></MdOutlineDeleteForever>
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
