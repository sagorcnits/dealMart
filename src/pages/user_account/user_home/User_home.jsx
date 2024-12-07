import React, { useEffect, useState } from "react";
import { FaHandHoldingUsd, FaShoppingCart } from "react-icons/fa";
import { FcProcess } from "react-icons/fc";
import { IoLogoUsd } from "react-icons/io";
import { MdDone, MdOutlineCancel } from "react-icons/md";
import { TbProgressAlert } from "react-icons/tb";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import useAxios from "../../../hooks/useAxios";
const User_home = () => {
  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 *:box-shadow *:bg-white *:px-3 *:py-6 *:items-center *:flex *:gap-4 *:rounded-md">
        <div>
          <div className="size-[50px] rounded-full bg-[#059669] flex justify-center items-center  text-white ">
            <FaHandHoldingUsd size={30}></FaHandHoldingUsd>
          </div>
          <div className="leading-8">
            <h1 className="text-xl font-semibold">refund</h1>
            <p>5</p>
          </div>
        </div>
        <div>
          <div className="size-[50px] rounded-full bg-customRed flex justify-center items-center text-white">
            <MdOutlineCancel size={25}></MdOutlineCancel>
          </div>
          <div className="leading-8">
            <p className="text-xl font-semibold">Order canceled</p>
            <p>5</p>
          </div>
        </div>
        <div>
          <div className="size-[50px] rounded-full bg-[#059669] flex justify-center items-center text-white">
            <MdDone size={25}></MdDone>
          </div>
          <div className="leading-8">
            <p className="text-xl font-semibold">order complated</p>
            <p>5</p>
          </div>
        </div>
        <div>
          <div className="size-[50px] rounded-full bg-[#DBEAFE] flex justify-center items-center  text-white ">
            <FcProcess size={25}></FcProcess>
          </div>
          <div className="leading-8">
            <p className="text-xl font-semibold">order process</p>
            <p>5</p>
          </div>
        </div>
        <div>
          <div className="size-[50px] rounded-full bg-[#58677a] flex justify-center items-center  text-white ">
            <TbProgressAlert size={25}></TbProgressAlert>
          </div>
          <div className="leading-8">
            <p className="text-xl font-semibold">order pending</p>
            <p>5</p>
          </div>
        </div>
        <div>
          <div className="size-[50px] rounded-full bg-[#cc7728] flex justify-center items-center  text-white ">
            <IoLogoUsd size={25}></IoLogoUsd>
          </div>
          <div className="leading-8">
            <p className="text-xl font-semibold">order unpaid</p>
            <p>5</p>
          </div>
        </div>
        <div>
          <div className="size-[50px] rounded-full bg-[#05fa73] flex justify-center items-center   ">
            <IoLogoUsd size={25}></IoLogoUsd>
          </div>
          <div className="leading-8">
            <p className="text-xl font-semibold">order paid</p>
            <p>5</p>
          </div>
        </div>
        <div>
          <div className="size-[50px] rounded-full bg-[#BB923A] flex justify-center items-center text-white">
            <FaShoppingCart size={25}></FaShoppingCart>
          </div>
          <div className="leading-8">
            <p className="text-xl font-semibold">total order</p>
            <p>5</p>
          </div>
        </div>
      </div>

      <div className="mt-4 h-[300px] md:h-[400px]  box-shadow bg-white rounded-md w-full">
        <OrderChart></OrderChart>
      </div>
    </main>
  );
};

export default User_home;

const OrderChart = () => {
  const [data, setData] = useState([]);

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

        <LineChart
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
