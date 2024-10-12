import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const Dashboard = () => {
  const [sidebar, setSidebar] = useState(true);
  const [mobileSideBar, setMobileSideBar] = useState(false);

  // desktop and laptop sidebar function
  const handleSideBar = () => {
    setSidebar(!sidebar);
  };
  // mobile sidebar function
  const handleMobileSideBar = () => {
    setMobileSideBar(!mobileSideBar);
  };

  return (
    <main className="flex">
      <Sidebar sidebar={sidebar} mobileSideBar={mobileSideBar} handleMobileSideBar={handleMobileSideBar}></Sidebar>
      <section
        className={`w-full duration-700 h-screen ${
          sidebar ? "lg:ml-[250px]" : ""
        }  bg-[#F3F5F9]`}
      >
        <Navbar
          handleSideBar={handleSideBar}
          handleMobileSideBar={handleMobileSideBar}
        ></Navbar>
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
