import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(true);
  const handleSideBar = () => {
    setSidebar(!sidebar);
  };

  return (
    <main className="flex">
      <Sidebar sidebar={sidebar}></Sidebar>
      <section
        className={`w-full duration-700 h-screen ${
          sidebar ? "lg:ml-[250px]" : ""
        }  bg-[#F3F5F9]`}
      >
        <Navbar handleSideBar={handleSideBar}></Navbar>
        <div>
           <Outlet></Outlet>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
