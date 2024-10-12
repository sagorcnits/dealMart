import { useState } from "react";
import Navbar from "./components/Navbar";

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(true);
  const handleSideBar = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="flex">
      <div
        className={`h-screen duration-700 bg-white w-[250px] ${
          sidebar ? "left-0" : "-left-[250px]"
        } fixed `}
      >
        <div className="flex items-center gap-2 py-2 border-b px-3">
          <div className="logo bg-darkBlue size-12 flex justify-center items-center text-3xl">
            <h1 className="font-bold text-white">D</h1>
          </div>
          <h1 className="font-bold text-2xl">DealMart</h1>
        </div>
      </div>
      <div
        className={`w-full duration-700 h-screen ${
          sidebar ? "lg:ml-[250px]" : ""
        }  bg-[#F3F5F9]`}
      >
        <Navbar handleSideBar={handleSideBar}></Navbar>
      </div>
    </div>
  );
};

export default Dashboard;
