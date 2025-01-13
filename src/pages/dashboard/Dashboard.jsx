import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
const Dashboard = () => {
  const [socket, setNewSocket] = useState(null);
  const [message, setNewMessage] = useState("")
  const [sidebar, setSidebar] = useState(true);
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const navigate = useNavigate()
  const axiosPublic = useAxios()
  // desktop and laptop sidebar function
  const handleSideBar = () => {
    setSidebar(!sidebar);
  };
  // mobile sidebar function
  const handleMobileSideBar = () => {
    setMobileSideBar(!mobileSideBar);
  };


 


  const theme = useSelector((state) => state.darkMode);
  return (
    <main className="flex">
      <Sidebar
        sidebar={sidebar}
        mobileSideBar={mobileSideBar}
        handleMobileSideBar={handleMobileSideBar}
      ></Sidebar>
      <section
        className={`relative w-full duration-700  h-full ${sidebar ? "lg:ml-[250px]" : ""
          } ${theme == "light" ? "bg-[#F3F5F9]" : "bg-black"} `}
      >
        <Navbar
          sidebar={sidebar}
          handleSideBar={handleSideBar}
          handleMobileSideBar={handleMobileSideBar}
        ></Navbar>
        <div className={`p-4`}>
          <Outlet></Outlet>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
