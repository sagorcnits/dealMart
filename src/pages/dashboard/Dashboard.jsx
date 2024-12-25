import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { io } from 'socket.io-client';
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
const Dashboard = () => {
  const [socket, setNewSocket] = useState(null);
  const [message, setNewMessage] = useState("")
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

  // socket connection
  useEffect(() => {
    const socket = io("http://localhost:5000/");
    socket.on("connect", () => {
        setNewSocket(socket);
        console.log("Connected to the server");
    });
    return () => {
        socket.close();
    };

}, [])


console.log(socket?.id)

// send message to server
const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
        socket.emit("private-message", { senderId : socket.id, message, receiverId: "Ta8jvCXrnsodqaZhAAhZ" });
        setNewMessage("");
    }
}


  const theme = useSelector((state) => state.darkMode);
  return (
    <main className="flex">
      <Sidebar
        sidebar={sidebar}
        mobileSideBar={mobileSideBar}
        handleMobileSideBar={handleMobileSideBar}
      ></Sidebar>
      <section
        className={`relative w-full duration-700  h-full ${
          sidebar ? "lg:ml-[250px]" : ""
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
