import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useSocket = ({socket}) => {
    const [receivedMessages, setReceivedMessages] = useState([]);
    const recevie_message = useSelector((state) => state.recevie_message_slice)
    useEffect(() => {
        // const socket = io("http://localhost:5000/");
        // console.log(socket, "ok")
        // socket.on("receive-private-message", ({ senderId, message, receiverId }) => {
        //     setReceivedMessages((prevMessages) => [...prevMessages, message]);
        //     console.log(message);
        // });

      
        socket.on(
            "receive-private-message",
            ({ senderId, message, receiverId }) => {
                setReceivedMessages((prevMessage) => [...prevMessage, message]);
                console.log(message)
            }
        );
        return () => {
            socket.off("receive-private-message");
        };

       
    }, [recevie_message]);

    return receivedMessages;
};

export default useSocket;
