import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { io } from 'socket.io-client';
import useAxios from "../hooks/useAxios";


const Chat_system = () => {
    const [isShowChatIcon, setChatIcon] = useState(false)
    const [socket, setNewSocket] = useState(null);
    const [message, setNewMessage] = useState("")
    const axiosPublic = useAxios()
    const [customer, setCustomer] = useState(null)

    // user
    const socketId = localStorage.getItem("socketId") || "";

    // socket connection
    useEffect(() => {
        const socket = io("http://localhost:5000/");
        // connection user
        socket.on("connect", () => {
            setNewSocket(socket);
            // user data
            const userData = {
                socketId: socket?.id,
                customer_name: "random user",
                customer_email: 'random email',
                image: "https://i.stack.imgur.com/l60Hf.png"
            }
            // check if user is already have a socket id
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
                // post chat user data
                axiosPublic.post("/chat-user", userData).then(res => {
                    if (res.data.message == "ok") {
                        localStorage.setItem("socketId", res.data.chatUser.socketId);
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        });
        // close socket id
        return () => {
            socket.close();
        };

    }, [])


    // send message
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit("private-message", { senderId: socket.id, message, receiverId: "Ta8jvCXrnsodqaZhAAhZ" });
            setNewMessage("");
        }
    }

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
                <UserChatLand socket={socket}></UserChatLand>
                {/* customer message input */}
                <form onSubmit={handleSendMessage} className="flex items-center py-3 border justify-between px-4 bg-white">
                    <input value={message} onChange={(e) => setNewMessage(e.target.value)} type="text" placeholder="Type a message..." className="text-sm w-[90%]  focus:outline-none" />
                    <button type="submit" className="cursor-pointer size-[30px] text-white rounded-full flex justify-center items-center bg-green">
                        <IoSend></IoSend>
                    </button>

                </form>
            </div>}
            {/* icon */}
            <div onClick={() => setChatIcon(!isShowChatIcon)} className="ml-auto flex justify-center items-center bg-darkBlue text-white size-[50px] rounded-full text-2xl cursor-pointer hover:bg-black duration-500">
                {isShowChatIcon ? <MdClose></MdClose> : <FaRegMessage></FaRegMessage>}
            </div>
        </div >
    );
};

export default Chat_system;



const UserChatLand = ({ socket }) => {
    const [recevieMessage, setReceivedMessages] = useState([])
    useEffect(() => {
        socket.on(
            "receive-private-message",
            ({ senderId, messages, receiverId }) => {
                setReceivedMessages((prevMessage) => [...prevMessage, messages]);
                console.log(messages);
            }
        );
    }, []);

    console.log(recevieMessage)

    return (
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
    )
}