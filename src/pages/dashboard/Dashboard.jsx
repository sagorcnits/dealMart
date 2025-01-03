import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';
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

  const socketId = localStorage.getItem("socketId")
  // socket connection
  useEffect(() => {
    const socket = io("http://localhost:5000/");
    socket.on("connect", () => {
      setNewSocket(socket);
      // update chat user data
      if (socketId) {
        // update chat user data
        axiosPublic.put(`/chat-user/${socketId}`, { socketId: socket?.id, }).then(res => {
          if (res.data.message === "ok") {
            localStorage.setItem("socketId", socket?.id);
          }
        }).catch(err => {
          console.log(err.message);
        })
      } else {
        navigate("/login")
      }
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
      socket.emit("private-message", { senderId: socket.id, message, receiverId: "Ta8jvCXrnsodqaZhAAhZ" });
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
