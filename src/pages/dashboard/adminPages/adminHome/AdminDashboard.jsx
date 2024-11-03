import React, { useEffect, useState } from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaUsersLine, FaUsersRectangle } from "react-icons/fa6";
import { FcProcess, FcSalesPerformance } from "react-icons/fc";
import { FiShoppingCart } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import {
  MdDone,
  MdOutlineCancel,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { Link } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Swal from "sweetalert2";
import useAxios from "../../../../hooks/useAxios";

const AdminDashboard = () => {
  const [changeStatus, setChangeStatus] = useState(false);

  return (
    <div className="bg-dashBgColor  mt-16">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <section>
        <SalesCard changeStatus={changeStatus}></SalesCard>
      </section>

      <div className="mt-4 h-[300px] md:h-[400px]  box-shadow bg-white rounded-md w-full">
        <OrderSaleChart></OrderSaleChart>
      </div>

      <div className="grid  lg:grid-cols-4 gap-4 mt-4">
        <div className="h-[300px] md:h-[400px] flex justify-center items-center  lg:col-span-3 box-shadow bg-white rounded-md w-full">
          <OrderChart></OrderChart>
        </div>
        <div className="flex justify-center items-center col-span-1 box-shadow bg-white rounded-md">
          <SalesByCountry></SalesByCountry>
        </div>
      </div>
      <h1 className="font-semibold mt-10">Recent Order</h1>
      <div className="mt-4 items-center col-span-4 box-shadow bg-white rounded-md w-full">
        <OrderTable
          setChangeStatus={setChangeStatus}
          changeStatus={changeStatus}
        ></OrderTable>
      </div>
    </div>
  );
};

export default AdminDashboard;
// sales card
const SalesCard = ({ changeStatus }) => {
  const axiosFetch = useAxios();
  const [salseInformation, setSalseInformation] = useState(null);
  const [loading, setLoading] = useState(true);
  // get order
  useEffect(() => {
    axiosFetch
      .get("/orders")
      .then((res) => {
        setSalseInformation(res.data.orderDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changeStatus]);

  if (loading) {
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
    );
  }

  // console.log(salseInformation)

  return (
    <div className="grid grid-cols-4 gap-4 mt-6 *:box-shadow *:bg-white *:px-3 *:py-6 *:items-center *:flex *:gap-4 *:rounded-md">
      <div>
        <div className="size-[50px] rounded-full bg-green flex justify-center items-center  text-white ">
          <FcSalesPerformance size={25}></FcSalesPerformance>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">Total Sales</p>
          <h1>{salseInformation?.complated}</h1>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#2471a3] flex justify-center items-center  text-white ">
          <FaHandHoldingUsd size={25}></FaHandHoldingUsd>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">Total Revenue</p>
          <h1>${salseInformation?.total_revenue}</h1>
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
          <h1>{salseInformation?.pending}</h1>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-customRed flex justify-center items-center text-white">
          <MdOutlineCancel size={25}></MdOutlineCancel>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">order canceled</p>
          <h1>{salseInformation?.canceled}</h1>
        </div>
      </div>
      <div>
        <div className="size-[50px] rounded-full bg-[#059669] flex justify-center items-center text-white">
          <MdDone size={25}></MdDone>
        </div>
        <div className="leading-8">
          <p className="text-xl font-semibold">order complated</p>
          <h1>{salseInformation?.complated}</h1>
        </div>
      </div>
    </div>
  );
};

// total sale and revenue chart
const OrderSaleChart = () => {
  const [data, setData] = useState([]);

  const axiosFetch = useAxios();

  useEffect(() => {
    axiosFetch
      .get("/orders?revenue=revenue")
      .then((res) => {
        // setData(res.data);
        const newData = res.data.map((item,id) => {
          return {
            ...item,
            "Total Sale": item._id * id * 30,
            "Total Revenue" : item._id * id * 50,
          };
        });

        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {data?.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" fontSize={10} interval={0} />
            <YAxis domain={[0, "dataMax + 1"]} />
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="top" align="center" />
            <Bar dataKey="Total Sale" fill="#17827D" barSize={30} />
            <Bar dataKey="Total Revenue" fill="#2471a3" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};

// bar chart for order details
const OrderChart = () => {
  const data = [
    {
      name: "January",
      "Total Orders": 200,
      "Orders Pending": 3300,
      "Orders Canceled": 3100,
      "Orders Completed": 2800,
    },
    {
      name: "February",
      "Total Orders": 200,
      "Orders Pending": 3200,
      "Orders Canceled": 480,
      "Orders Completed": 220,
    },
    {
      name: "March",
      "Total Orders": 3400,
      "Orders Pending": 250,
      "Orders Canceled": 4120,
      "Orders Completed": 330,
    },
    {
      name: "April",
      "Total Orders": 800,
      "Orders Pending": 180,
      "Orders Canceled": 90,
      "Orders Completed": 530,
    },
    {
      name: "May",
      "Total Orders": 3100,
      "Orders Pending": 3220,
      "Orders Canceled": 4130,
      "Orders Completed": 250,
    },
    {
      name: "June",
      "Total Orders": 3500,
      "Orders Pending": 3330,
      "Orders Canceled": 150,
      "Orders Completed": 3050,
    },
    {
      name: "July",
      "Total Orders": 600,
      "Orders Pending": 150,
      "Orders Canceled": 80,
      "Orders Completed": 270,
    },
    {
      name: "August",
      "Total Orders": 4000,
      "Orders Pending": 3280,
      "Orders Canceled": 100,
      "Orders Completed": 320,
    },
    {
      name: "September",
      "Total Orders": 700,
      "Orders Pending": 300,
      "Orders Canceled": 20,
      "Orders Completed": 280,
    },
    {
      name: "October",
      "Total Orders": 300,
      "Orders Pending": 3250,
      "Orders Canceled": 3110,
      "Orders Completed": 3540,
    },
    {
      name: "November",
      "Total Orders": 2800,
      "Orders Pending": 180,
      "Orders Canceled": 70,
      "Orders Completed": 250,
    },
    {
      name: "December",
      "Total Orders": 4200,
      "Orders Pending": 3320,
      "Orders Canceled": 3140,
      "Orders Completed": 3340,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <Legend layout="horizontal" verticalAlign="top" align="center" />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" fontSize={10} interval={0} />
        <YAxis dataKey="Total Orders" />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="Total Orders" stroke="#BB923A" />
        <Line type="monotone" dataKey="Orders Pending" stroke="#58677A" />
        <Line type="monotone" dataKey="Orders Canceled" stroke="#FF6170" />
        <Line type="monotone" dataKey="Orders Complated" stroke="#059669" />
      </LineChart>
    </ResponsiveContainer>
  );
};
// pie chart for sales by country
const SalesByCountry = () => {
  const data = [
    { name: "Bangladesh", value: 400 },
    { name: "India", value: 300 },
    { name: "Pakistan", value: 300 },
    { name: "Nepal", value: 200 },
    { name: "China", value: 400 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#454545"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={700} height={400}>
        <Legend layout="horizontal" verticalAlign="top" align="center" />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          innerRadius={40}
          fill="#8884d8"
          dataKey="value"
          width="100%"
          height="100%"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

// recent Order Table

const OrderTable = ({ changeStatus, setChangeStatus }) => {
  const axiosFetch = useAxios();

  const {
    data: orders = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["recent_order"],
    queryFn: async () => {
      const res = await axiosFetch.get(`/orders?recent_order=sort`);
      console.log("ok");
      return res.data;
    },
  });

  console.log(orders);
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
  // loader
  if (isPending) {
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
    );
  }

  // ok

  return (
    <>
      {orders?.length > 0 && (
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
                                <li onClick={() => updateOrder("unpaid", _id)}>
                                  <a>unpaid</a>
                                </li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
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
                            : ""
                        } font-semibold`}
                      >
                        {payment_status == "refund"
                          ? "canceled"
                          : order_status?.status}
                      </p>
                      <div>
                        {order_status?.status == "complated" ? (
                          " "
                        ) : order_status?.status == "canceled" ? (
                          " "
                        ) : (
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
                              {order_status?.status == "pending" ? (
                                <>
                                  <li
                                    onClick={() => updateOrder("canceled", _id)}
                                  >
                                    <a>canceled</a>
                                  </li>
                                  <li
                                    onClick={() => updateOrder("progress", _id)}
                                  >
                                    <a>progress</a>
                                  </li>
                                </>
                              ) : order_status?.status == "progress" ? (
                                <>
                                  <li
                                    onClick={() => updateOrder("canceled", _id)}
                                  >
                                    <a>canceled</a>
                                  </li>
                                  <li
                                    onClick={() => updateOrder("courier", _id)}
                                  >
                                    <a>courier</a>
                                  </li>
                                </>
                              ) : order_status?.status == "courier" ? (
                                <>
                                  <li
                                    onClick={() => updateOrder("canceled", _id)}
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
      )}
    </>
  );
};
