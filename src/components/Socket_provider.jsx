import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import useAxios from "../hooks/useAxios";



export const AuthContext = createContext(null);

const Socket_Provider = ({ children }) => {
    const [socket, setNewSocket] = useState(null);
    const user_email = localStorage.getItem("user_email");
    const axiosPublic = useAxios()
    useEffect(  () => {
        const socket =  io("https://dealmart-server-wxsp.vercel.app/", {
            transports: ['websocket', 'polling']
          });
        socket.on("connect", () => {
            setNewSocket(socket);
            console.log(socket)
            // check if user is already have a socket id
            if (user_email) {
                // update chat user data
                axiosPublic.put(`/chat-user/${user_email}`, { socketId: socket?.id, }).then(res => {
                    if (res.data.message === "ok") {
                       console.log("socket id update")
                    }
                }).catch(err => {
                    console.log(err.message);
                })
            } 
        })
        return () => {
            socket.close();
        };
    }, []);
console.log(socket)
    if (!socket) {
        return <div className="text-center text-3xl font-bold">loading....</div>
    }

    const userData = { socket };


    return (
        <AuthContext.Provider value={userData}>{children}</AuthContext.Provider>
    );
};

export default Socket_Provider;
