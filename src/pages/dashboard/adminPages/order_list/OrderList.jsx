import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
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
  const [orders] = useOrders();
  const axiosFetch = useAxios();
  const [filter, setFilter] = useState("all");
  const [changeStatus, setChangeStatus] = useState(false);
  // pagination
  const [itemPerPage, setItemPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const numberPages = Math.ceil(orders?.length / itemPerPage);
  // console.log(numberPages)
  const totalbtn = [...Array(numberPages).keys()];

  // order data fetch
  const {
    data: ordersData = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["ordersData", currentPage, itemPerPage, filter],
    queryFn: async () => {
      const res = await axiosFetch.get(
        `/orders?page=${currentPage}&size=${itemPerPage}&filter=${filter}`
      );
      return res.data;
    },
  });

  // console.log(changeStatus)

  // showproduct in perPage
  const showProductPerPage = (e) => {
    setItemPerPage(e.target.value);
  };

  // sorted product by price
  const filterOrders = (e) => {
    setFilter(e.target.value);
  };

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
          <Card changeStatus={changeStatus}></Card>
        </section>
        <section className="mt-6 bg-white rounded-md">
          <div className="flex justify-between items-center p-3">
            <p className="font-semibold">All Order List</p>
            <div className="flex gap-2 items-center">
              <select
                onChange={showProductPerPage}
                name="category"
                className="select select-bordered  max-w-xs focus:outline-none border"
              >
                <option disabled selected>
                  Show Orders
                </option>
                <option>5</option>
                <option>10</option>
                <option>15</option>
                <option>20</option>
                <option>30</option>
                <option>50</option>
              </select>
              <select
                onChange={filterOrders}
                name="category"
                className="select select-bordered  max-w-xs focus:outline-none border"
              >
                <option disabled selected>
                  filter by
                </option>
                <option>canceled</option>
                <option>complated</option>
                <option>progress</option>
                <option>refund</option>
                <option>unpaid</option>
              </select>
            </div>
          </div>
          <div className="overflow-auto">
            <Table
              orders={ordersData}
              refetch={refetch}
              isPending={isPending}
              changeStatus={changeStatus}
              setChangeStatus={setChangeStatus}
            ></Table>
          </div>
        </section>
        {orders?.length >= 5 && (
          <section className="mt-6 flex gap-3 items-center *:size-10 *:box-shadow *:flex *:justify-center *:items-center *:rounded-full *:duration-500">
            <button
              onClick={prevBtn}
              className=" hover:bg-blue hover:text-white"
            >
              <MdDoubleArrow className="rotate-180"></MdDoubleArrow>
            </button>
            {totalbtn?.slice(0, 7).map((item, id) => {
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
            <button
              onClick={nextbtn}
              className="hover:bg-blue hover:text-white"
            >
              <MdDoubleArrow></MdDoubleArrow>
            </button>
          </section>
        )}
      </main>
    </>
  );
};

export default OrderList;

// table
const Table = ({
  orders,
  refetch,
  isPending,
  changeStatus,
  setChangeStatus,
}) => {
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
              setChangeStatus(!changeStatus);
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
      .put(`/orders/${id}`, { status: status })
      .then((res) => {
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Update",
            text: "Your file has been Updated.",
            icon: "success",
          });
          refetch();
          setChangeStatus(!changeStatus);
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

  if (isPending) {
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
    );
  }

  return (
    <>
      {orders?.length > 0 ? (
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
      ) : (
        <div className="flex justify-center items-center h-[300px]">
          <h1 className="text-3xl font-bold">No Orders Data</h1>
        </div>
      )}
    </>
  );
};

const Card = ({ changeStatus }) => {
  const axiosFetch = useAxios();
  const [orderDetails, setOrderDetails] = useState(null);
  useEffect(() => {
    axiosFetch
      .get("/orders")
      .then((res) => {
        setOrderDetails(res.data.orderDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changeStatus]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 *:bg-white">
      <div className="flex justify-between items-center box-shadow p-4 rounded-md">
        <div className="space-y-3">
          <h1 className="font-semibold">Payment Refund</h1>
          <p className="text-paragraph">{orderDetails?.refund?.length}</p>
        </div>
        <div>
          <FaHandHoldingUsd size={40}></FaHandHoldingUsd>
        </div>
      </div>
      <div className="flex justify-between *:text-customRed items-center box-shadow p-4 rounded-md">
        <div className="space-y-3">
          <h1 className="font-semibold ">Canceled Order</h1>
          <p>{orderDetails?.canceled?.length}</p>
        </div>
        <div>
          <CiShoppingCart size={40}></CiShoppingCart>
        </div>
      </div>
      <div className="flex justify-between text-green items-center box-shadow p-4 rounded-md">
        <div className="space-y-3">
          <h1 className="font-semibold">Complated</h1>
          <p>{orderDetails?.complated?.length}</p>
        </div>
        <div>
          <MdDownloadDone size={40}></MdDownloadDone>
        </div>
      </div>
      <div className="flex justify-between *:text-darkBlue items-center box-shadow p-4 rounded-md">
        <div className="space-y-3">
          <h1 className="font-semibold">In Progress</h1>
          <p>{orderDetails?.progress?.length}</p>
        </div>
        <div>
          <TbProgressAlert size={40}></TbProgressAlert>
        </div>
      </div>
    </div>
  );
};

// table
