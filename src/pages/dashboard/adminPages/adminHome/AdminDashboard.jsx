import React from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
import { FaUsersLine, FaUsersRectangle } from "react-icons/fa6";
import { FcProcess, FcSalesPerformance } from "react-icons/fc";
import { FiShoppingCart } from "react-icons/fi";
import { MdDone, MdOutlineCancel } from "react-icons/md";

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

const data = [
  { name: "January", "Total Sale": 4200, "Total Revenue": 100 },
  { name: "February", "Total Sale": 3300, "Total Revenue": 1800 },
  { name: "March", "Total Sale": 5000, "Total Revenue": 700 },
  { name: "April", "Total Sale": 2000, "Total Revenue": 300 },
  { name: "May", "Total Sale": 2500, "Total Revenue": 2900 },
  { name: "June", "Total Sale": 400, "Total Revenue": 2000 },
  { name: "July", "Total Sale": 500, "Total Revenue": 3100 },
  { name: "August", "Total Sale": 4900, "Total Revenue": 200 },
  { name: "September", "Total Sale": 4200, "Total Revenue": 400 },
  { name: "October", "Total Sale": 5300, "Total Revenue": 2800 },
  { name: "November", "Total Sale": 500, "Total Revenue": 600 },
  { name: "December", "Total Sale": 5500, "Total Revenue": 3000 },
];

const AdminDashboard = () => {
  return (
    <div className="bg-dashBgColor  mt-16">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <section>
        <SalesCard></SalesCard>
      </section>

      <div className="mt-4 h-[300px] md:h-[400px] flex justify-center items-center col-span-4 box-shadow bg-white rounded-md w-full">
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
// sales card
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

// total sale and revenue chart
const OrderSaleChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={830} data={data}>
        <Legend layout="horizontal" verticalAlign="top" align="center" />
        <Bar dataKey="Total Sale" fill="#17827D" />
        <Bar dataKey="Total Revenue" fill="#059669" />

        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" fontSize={10} />
        <YAxis dataKey="Total Sale" />
        <Tooltip />
      </BarChart>
    </ResponsiveContainer>
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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042","#454545"];

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
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10}>
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
            <Cell  key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        
      </PieChart>
    </ResponsiveContainer>
  );
};
