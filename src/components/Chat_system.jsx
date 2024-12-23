import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { MdClose } from "react-icons/md";

import { io } from 'socket.io-client';


const Chat_system = () => {
    const [isShowChatIcon, setChatIcon] = useState(false)
    const [socket, setNewSocket] = useState(null);
    // socket connection
    useEffect(() => {
        const socket = io("http://localhost:5000/");
        setNewSocket(socket);
        socket.on("connect", () => {
            console.log("Connected to the server");
        });
        return () => {
            socket.close();
          };

    }, [])


    return (
        <div className="fixed z-50 bottom-4 right-4 flex flex-col gap-4">

            {isShowChatIcon && <div className="w-[350px] box-shadow rounded-xl overflow-hidden">
                {/* header */}
                <div className="flex items-center space-x-2 bg-darkBlue p-4">
                    <div className="relative size-[40px] flex-shrink-0 text-white rounded-full flex justify-center items-center">
                        <FaRegUserCircle size={40}></FaRegUserCircle>
                        <div className="size-[10px] rounded-full bg-[#4AD504] absolute right-0 bottom-0"></div>
                    </div>
                    <div className="text-white">
                        <div className="text-sm font-medium">Support Team</div>
                        <div className="text-xs font-light">Online</div>
                    </div>
                </div>
                {/* customer message land */}
                <div className="h-[300px] px-2 py-4 bg-[#E3DCD5]">
                    <div className="flex items-center gap-2">
                        <div className="size-[20px] flex-shrink-0 rounded-full flex justify-center items-center">
                            <FaRegUserCircle size={30}></FaRegUserCircle>
                        </div>
                        <div className="text-sm font-medium p-4 bg-white inline-block rounded-xl">Hello, how can I help you today?</div>

                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <div className="text-sm font-medium p-4 bg-white inline-block rounded-xl ml-auto">Hello, how can I help you today?</div>
                        <p>You</p>
                    </div>
                </div>
                {/* customer message input */}
                <div className="flex items-center py-3 border justify-between px-4 bg-white">
                    <input type="text" placeholder="Type a message..." className="text-sm w-[90%]  focus:outline-none" />
                    <div className="cursor-pointer size-[30px] text-white rounded-full flex justify-center items-center bg-green">
                        <IoSend></IoSend>
                    </div>

                </div>
            </div>}
            {/* icon */}
            <div onClick={() => setChatIcon(!isShowChatIcon)} className="ml-auto flex justify-center items-center bg-darkBlue text-white size-[50px] rounded-full text-2xl cursor-pointer hover:bg-black duration-500">
                {isShowChatIcon ? <MdClose></MdClose> : <FaRegMessage></FaRegMessage>}
            </div>
        </div >
    );
};

export default Chat_system;