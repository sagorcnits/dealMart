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
import { useSelector } from "react-redux";
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
import useCustomers from "../../../../hooks/useCustomers";

const AdminDashboard = () => {
  const [changeStatus, setChangeStatus] = useState(false);
  const [filterDate, setFilterDate] = useState("all");

  const filter_by_date = (e) => {
    setFilterDate(e.target.value);
  };

  const theme = useSelector((state) => state.darkMode);

  // console.log(filterDate)

  // console.log("ok")

  return (
    <main
      className={`${theme == "light" ? "bg-dashBgColor" : "bg-black"} mt-16`}
    >
      <section className="flex items-center justify-between">
        <h1 className={`text-3xl font-bold ${theme == "light" ? "text-black" : "text-white"}`}>Dashboard</h1>
        <select
          onChange={filter_by_date}
          name="report_by_day"
          className={`p-2 rounded-md  max-w-xs focus:outline-none border ${theme == "light" ? "bg-[#F3F5F9]" : "bg-black text-white"
            }`}
        >
          <option disabled selected>
            filter by
          </option>
          <option>Today</option>
          <option>Yesterday</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </section>
      <section>
        <SalesCard
          theme={theme}
          changeStatus={changeStatus}
          filterDate={filterDate}
        ></SalesCard>
      </section>

      <section className={`mt-4 h-[300px] md:h-[400px]  box-shadow ${theme == "light" ? "bg-dashBgColor" : "bg-black"} rounded-md w-full`}>
        <OrderSaleChart  ></OrderSaleChart>
      </section>

      <section className="grid  xl:grid-cols-4 gap-4 mt-4">
        <div className={`h-[300px] md:h-[400px] flex justify-center items-center xl:col-span-3 box-shadow ${theme == "light" ? "bg-dashBgColor" : "bg-black"} rounded-md w-full`}>
          <OrderChart></OrderChart>
        </div>
        <div className={`h-[300px] md:h-[400px] w-full flex justify-center items-center  xl:col-span-1 box-shadow ${theme == "light" ? "bg-dashBgColor" : "bg-black"} rounded-md`}>
          <SalesByCountry></SalesByCountry>
        </div>
      </section>
      <h1 className={`font-semibold mt-10 ${theme == "light" ? "text-black" : "text-white"}`}>Recent Order</h1>
      <section className={`mt-4 items-center col-span-4 box-shadow ${theme == "light" ? "bg-dashBgColor" : "bg-black"} rounded-md w-full overflow-auto`}>
        <OrderTable
          theme={theme}
          setChangeStatus={setChangeStatus}
          changeStatus={changeStatus}
        ></OrderTable>
      </section>
    </main>
  );
};

export default AdminDashboard;
// sales card
const SalesCard = ({ theme, changeStatus, filterDate }) => {
  const axiosFetch = useAxios();
  const [salseInformation, setSalseInformation] = useState(null);
  const [customers, refetch, isPending] = useCustomers();
  const [loading, setLoading] = useState(true);
  const [visitor, setVisitors] = useState(0);
  // get order
  useEffect(() => {
    axiosFetch
      .get(`/orders?filterDate=${filterDate}`)
      .then((res) => {
        setSalseInformation(res.data.orderDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [changeStatus, filterDate]);

  // get visitors

  useEffect(() => {
    axiosFetch
      .get(`/visitors`)
      .then((res) => {
        console.log(res.data.visitors)
        setVisitors(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])




  if (loading) {
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
    );
  }

  // console.log(salseInformation)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 *:box-shadow  *:px-3 *:py-6 *:items-center *:flex *:gap-4 *:rounded-md">
      <div className="bg-green">
        <div className="size-[40px] xl:size-[50px] rounded-full bg-[#33302b] flex justify-center items-center  text-white ">
          <FcSalesPerformance size={25}></FcSalesPerformance>
        </div>
        <div className={`leading-8 ${theme == "light" ? "text-[#F3F5F9]" : "text-black"}`}>
          <p className="text-sm xl:text-xl font-semibold">Total Sales</p>
          <h1 className="text-xs xl:text-xl">{salseInformation?.complated}</h1>
        </div>
      </div>
      <div className="bg-[#2471a3] ">
        <div className="size-[40px] xl:size-[50px] rounded-full bg-[#33302b] flex justify-center items-center  text-white ">
          <FaHandHoldingUsd size={25}></FaHandHoldingUsd>
        </div>
        <div className={`leading-8 ${theme == "light" ? "text-[#F3F5F9]" : "text-black"}`}>
          <p className="text-sm xl:text-xl font-semibold">Total Revenue</p>
          <h1 className="text-xs xl:text-xl">
            ${salseInformation?.total_revenue}
          </h1>
        </div>
      </div>
      <div className="bg-[#FB923C]">
        <div className="size-[40px] xl:size-[50px] rounded-full bg-[#33302b] flex justify-center items-center  text-white ">
          <FaUsersRectangle size={25}></FaUsersRectangle>
        </div>
        <div className={`leading-8 ${theme == "light" ? "text-[#F3F5F9]" : "text-black"}`}>
          <p className="text-sm xl:text-xl font-semibold">Total Visitor</p>
          <h1 className="text-xs xl:text-xl">{visitor}</h1>
        </div>
      </div>
      <div className="bg-[#3B82F6]">
        <div className="size-[40px] xl:size-[50px] rounded-full bg-[#33302b] flex justify-center items-center  text-white ">
          <FaUsersLine size={25}></FaUsersLine>
        </div>
        <div className={`leading-8 ${theme == "light" ? "text-[#F3F5F9]" : "text-black"}`}>
          <p className="text-sm xl:text-xl font-semibold">Total Customer</p>
          <h1 className="text-xs xl:text-xl">{customers?.length}</h1>
        </div>
      </div>
      <div className="bg-[#bb923a]">
        <div className="size-[40px] xl:size-[50px] rounded-full bg-[#33302b] flex justify-center items-center text-white ">
          <FiShoppingCart size={25}></FiShoppingCart>
        </div>
        <div className={`leading-8 ${theme == "light" ? "text-[#F3F5F9]" : "text-black"}`}>
          <p className="text-sm xl:text-xl font-semibold">Total order</p>
          <h1 className="text-xs xl:text-xl">
            {salseInformation?.total_order}
          </h1>
        </div>
      </div>
      <div className="bg-[#849bb9]">
        <div className="size-[50px] rounded-full bg-[#33302b] flex justify-center items-center  text-size-[40px] xl:white">
          <FcProcess size={25}></FcProcess>
        </div>
        <div className={`leading-8 ${theme == "light" ? "text-[#F3F5F9]" : "text-black"}`}>
          <p className="text-sm xl:text-xl font-semibold">order pending</p>
          <h1 className="text-xs xl:text-xl">{salseInformation?.pending}</h1>
        </div>
      </div>
      <div className="bg-customRed">
        <div className="size-[40px] xl:size-[50px] rounded-full bg-[#33302b] flex justify-center items-center text-white">
          <MdOutlineCancel size={25}></MdOutlineCancel>
        </div>
        <div className={`leading-8 ${theme == "light" ? "text-[#F3F5F9]" : "text-black"}`}>
          <p className="text-sm xl:text-xl font-semibold">order canceled</p>
          <h1 className="text-xs xl:text-xl">{salseInformation?.canceled}</h1>
        </div>
      </div>
      <div className="bg-[#059669]">
        <div className="size-[40px] xl:size-[50px] rounded-full bg-[#33302b] flex justify-center items-center text-white">
          <MdDone size={25}></MdDone>
        </div>
        <div className={`leading-8 ${theme == "light" ? "text-[#F3F5F9]" : "text-black"}`}>
          <p className="text-sm xl:text-xl font-semibold">order complated</p>
          <h1 className="text-xs xl:text-xl">{salseInformation?.complated}</h1>
        </div>
      </div>
    </div>
  );
};

// total sale and revenue chart
const OrderSaleChart = () => {
  const [data, setData] = useState([]);
  // console.log(data)
  const axiosFetch = useAxios();

  useEffect(() => {
    axiosFetch
      .get("/orders?revenue=revenue")
      .then((res) => {
        // setData(res.data);
        const newData = res.data.map((item, id) => {
          return {
            ...item,
            "Total Sale": item._id * id * 30,
            "Total Revenue": item._id * id * 50,
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
            <CartesianGrid strokeDasharray="3 3" />
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
  const [data, setData] = useState([]);
  // console.log(data)
  const axiosFetch = useAxios();
  // get order_status_chart data from server
  useEffect(() => {
    axiosFetch
      .get("/orders?order_status_chart=order_status_chart")
      .then((res) => {
        const newData = res.data.map((item, id) => {
          return {
            ...item,
            "Total Orders": item._id * id * 30,
            "Orders Pending": item._id * id * 10,
            "Orders Canceled": item._id * id * 20,
            "Orders Complated": item._id * id * 50,
          };
        });

        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" fontSize={10} interval={0} />
        <YAxis domain={[0, "dataMax + 1"]} />
        <Tooltip />
        <Legend layout="horizontal" verticalAlign="top" align="center" />

        <Line
          type="monotone"
          dataKey="Total Orders"
          stroke="#BB923A"
          barSize={30}
        />
        <Line
          type="monotone"
          dataKey="Orders Pending"
          stroke="#58677A"
          barSize={30}
        />
        <Line
          type="monotone"
          dataKey="Orders Canceled"
          stroke="#FF6170"
          barSize={30}
        />
        <Line
          type="monotone"
          dataKey="Orders Complated"
          stroke="#059669"
          barSize={30}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
// pie chart for sales by country
const SalesByCountry = () => {
  const [data, setData] = useState([]);
  const axiosFetch = useAxios();

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#454545",
    ,
    "#009eff",
    "#ff009e",
    "#03f90e",
  ];

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

  // fetch data

  useEffect(() => {
    axiosFetch
      .get("/customers?sales_by_country=country")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(data);

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
const OrderTable = ({ theme, changeStatus, setChangeStatus }) => {
  const axiosFetch = useAxios();

  const {
    data: orders = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["recent_order"],
    queryFn: async () => {
      const res = await axiosFetch.get(`/orders?recent_order=sort`);
      // console.log("ok");
      return res.data;
    },
  });

  // console.log(orders);
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
            <tr className={`text-left *:p-3 border-b *:uppercase ${theme == "light" ? "text-black" : "text-white"}`}>
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
                  className={`*:p-3 border-b items-center ${theme == "light" ? "*:text-gray-700 hover:bg-[#f1efef]" : "*:text-white hover:bg-[#3a3838]"}  duration-500`}
                >
                  <td>{orderId}</td>
                  <td>{customer}</td>
                  <td>{createdAt.slice(0, 10)}</td>
                  <td>${total_price}</td>
                  <td>{products.length}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <p
                        className={`${payment_status == "paid"
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
                        className={`${order_status?.status === "complated" &&
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
