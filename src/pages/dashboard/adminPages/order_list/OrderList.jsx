import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHandHoldingUsd, FaShoppingCart } from "react-icons/fa";
import { FcProcess } from "react-icons/fc";
import { IoLogoUsd } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import {
  MdDone,
  MdDoubleArrow,
  MdOutlineCancel,
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
  const [filterDate, setFilterDate] = useState("all");
  const [changeStatus, setChangeStatus] = useState(false);
  // pagination
  const [itemPerPage, setItemPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const numberPages = Math.ceil(orders?.length / itemPerPage);
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

  // filter by date

  const filter_by_date = (e) => {
    setFilterDate(e.target.value);
  };

  return (
    <>
      <main>
        <div className="pt-16 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Order List</h1>
          <select
            onChange={filter_by_date}
            name="report_by_day"
            className="p-2 rounded-md  max-w-xs focus:outline-none border"
          >
            <option disabled selected>
              filter by
            </option>
            <option>Today</option>
            <option>Yesterday</option>
            <option>This Week</option>
            <option>This Month</option>
          </select>
        </div>

        <section className="mt-6">
          <Card changeStatus={changeStatus} filterDate={filterDate}></Card>
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
        console.log(res.data);
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
            <tr className="text-left *:p-3 border-b *:uppercase">
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
                  className="*:p-3 border-b items-center hover:bg-[#f1efef] duration-500 *:text-gray-700"
                >
                  <td>{orderId}</td>
                  <td>{customer}</td>
                  <td>{createdAt.slice(0, 10)}</td>
                  <td>${total_price}</td>
                  <td>{products.length}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <p
                        className={`${
                          payment_status == "paid"
                            ? "text-green"
                            : payment_status == "refund"
                            ? "text-customRed"
                            : ""
                        } font-semibold`}
                      >
                        {payment_status}
                      </p>
                      {order_status?.status != "canceled" && (
                        <div>
                          {payment_status != "refund" && (
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
                                {payment_status == "paid" ? (
                                  <>
                                    <li
                                      onClick={() => updateOrder("refund", _id)}
                                    >
                                      <a>refund</a>
                                    </li>
                                  </>
                                ) : payment_status == "unpaid" ? (
                                  <li onClick={() => updateOrder("paid", _id)}>
                                    <a>paid</a>
                                  </li>
                                ) : (
                                  <li
                                    onClick={() => updateOrder("unpaid", _id)}
                                  >
                                    <a>unpaid</a>
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <p
                        className={`${
                          order_status?.status === "complated" &&
                          payment_status == "paid"
                            ? "text-green"
                            : order_status?.status === "courier"
                            ? "text-lime-700"
                            : order_status?.status === "progress"
                            ? "text-darkBlue"
                            : order_status?.status === "canceled"
                            ? "text-customRed"
                            : payment_status == "refund"
                            ? "text-customRed"
                            : payment_status == "canceled"
                            ? "text-customRed"
                            : ""
                        } font-semibold`}
                      >
                        {order_status?.status}
                      </p>
                      {
                        (payment_status != "refund" && (
                          <div>
                            {order_status?.status == "complated" ? (
                              ""
                            ) : order_status?.status == "canceled" ? (
                              " "
                            ) : (
                              <div className="dropdown dropdown-bottom dropdown-end">
                                <div tabIndex={0} role="button" className="m-1">
                                  <BsThreeDotsVertical
                                    onClick={() =>
                                      setActiveStatus(!activeStatus)
                                    }
                                    size={20}
                                    className="mx-auto cursor-pointer"
                                  ></BsThreeDotsVertical>
                                </div>
                                <ul
                                  tabIndex={0}
                                  className="dropdown-content menu bg-white rounded-box z-50 w-52 p-2 box-shadow"
                                >
                                  {order_status?.status == "pending" ? (
                                    <>
                                      <li
                                        onClick={() =>
                                          updateOrder("canceled", _id)
                                        }
                                      >
                                        <a>canceled</a>
                                      </li>
                                      <li
                                        onClick={() =>
                                          updateOrder("progress", _id)
                                        }
                                      >
                                        <a>progress</a>
                                      </li>
                                    </>
                                  ) : order_status?.status == "progress" ? (
                                    <>
                                      <li
                                        onClick={() =>
                                          updateOrder("canceled", _id)
                                        }
                                      >
                                        <a>canceled</a>
                                      </li>
                                      <li
                                        onClick={() =>
                                          updateOrder("courier", _id)
                                        }
                                      >
                                        <a>courier</a>
                                      </li>
                                    </>
                                  ) : order_status?.status == "courier" ? (
                                    <>
                                      <li
                                        onClick={() =>
                                          updateOrder("canceled", _id)
                                        }
                                      >
                                        <a>canceled</a>
                                      </li>
                                      {payment_status == "paid" && (
                                        <li
                                          onClick={() =>
                                            updateOrder("complated", _id)
                                          }
                                        >
                                          <a>complated</a>
                                        </li>
                                      )}
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))
                      }
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

const Card = ({ changeStatus, filterDate }) => {
  const axiosFetch = useAxios();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  // get order
  useEffect(() => {
    axiosFetch
      .get(`/orders?filterDate=${filterDate}`)
      .then((res) => {
        setOrderDetails(res.data.orderDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changeStatus, filterDate]);

  if (loading) {
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 *:box-shadow *:bg-white *:px-3 *:py-6 *:items-center *:flex *:gap-4 *:rounded-md">
      <div>
        <div className="size-[50px] rounded-full bg-[#059669] flex justify-center items-center  text-white ">
          <FaHandHoldingUsd size={30}></FaHandHoldingUsd>
        </div>
        <div className="leading-8">
          <h1 className="text-xl font-semibold">refund</h1>
          <p>{orderDetails?.refund}</p>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-customRed flex justify-center items-center text-white">
          <MdOutlineCancel size={25}></MdOutlineCancel>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">Order canceled</p>
          <p>{orderDetails?.canceled}</p>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#059669] flex justify-center items-center text-white">
          <MdDone size={25}></MdDone>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">order complated</p>
          <p>{orderDetails?.complated}</p>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#DBEAFE] flex justify-center items-center  text-white ">
          <FcProcess size={25}></FcProcess>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">order process</p>
          <p>{orderDetails?.progress}</p>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#58677a] flex justify-center items-center  text-white ">
          <TbProgressAlert size={25}></TbProgressAlert>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">order pending</p>
          <p>{orderDetails?.pending}</p>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#cc7728] flex justify-center items-center  text-white ">
          <IoLogoUsd size={25}></IoLogoUsd>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">order unpaid</p>
          <p>{orderDetails?.unpaid}</p>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#05fa73] flex justify-center items-center   ">
          <IoLogoUsd size={25}></IoLogoUsd>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">order paid</p>
          <p>{orderDetails?.paid}</p>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#BB923A] flex justify-center items-center text-white">
          <FaShoppingCart size={25}></FaShoppingCart>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">total order</p>
          <p>{orderDetails?.total_order}</p>
        </div>
      </div>
    </div>
  );
};

// table
