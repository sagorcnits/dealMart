import { useContext, useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../components/Socket_provider";
import useAxios from "../../../../hooks/useAxios";
const Message_user = () => {
const [allMessage, setAllMessage] = useState([])

  const { id } = useParams()
const axiosPublic = useAxios()




useEffect(() => {
  // get user data from server
  axiosPublic.get(`/messages/${id}`).then((res) => {
    console.log(res.data, "ok")
    setAllMessage(res.data)
  }).catch((err) => {
    console.log(err.message)
  })
},[])

console.log(allMessage,id)











 // send message
//  const handleSendMessage = (e) => {
//   e.preventDefault();
//   const user_email = localStorage.getItem("user_email")
//   // get admin socket from server
//   axiosPublic.get("/chat-user?admin=admin").then((res) => {
//       let adminSocketId = res.data.adminData[0].socketId
//     let admin_email = res.data.adminData[0].customer_email
//       console.log(adminSocketId)
//       if (adminSocketId) {
//           socket.emit("private-message", { senderId: socket.id, message, receiverId: adminSocketId });
//           setNewMessage("");
//           axiosPublic.post("/messages", {
//               message,
//               sender: user_email,
//               receiver:  admin_email,
//           }).then(res => {
//               console.log(res.data)
//           }).catch(err => {
//               console.log(err.message)
//           })
//       }
//   }).catch(err => {
//       console.log(err.message)
//   })
// }









  return (
    <div className="relative w-full h-full">
      <Message_admin chatUserData={allMessage}></Message_admin>
      {/* input feild */}allMessage
      <div className="flex items-center gap-2 absolute left-2 bottom-2 right-2">
        <div className="w-[90%] md:w-[94%] border rounded-lg overflow-hidden">
          <input
            className="py-[9px] w-full px-3 focus:outline-none"
            type="text"
            placeholder="Type a message"
          />
        </div>
        <div className="flex justify-center items-center size-[40px] rounded-full bg-green text-white cursor-pointer hover:bg-customRed duration-500">
          <IoIosSend></IoIosSend>
        </div>
      </div>
    </div>
  );
};

export default Message_user;

// recive message admin 

const Message_admin = ({allMessage}) => {
  
  const recevie_message_active = useSelector((state) => state.recevie_message_slice)
  const [receivedMessages, setReceivedMessages] = useState([])
  const { socket } = useContext(AuthContext);
  useEffect(() => {
    console.log(socket)
    console.log("ok received messages")
    socket.on(
      "receive-private-message",
      (data) => {
        setReceivedMessages((prevMessage) => [...prevMessage, data]);
      }
    );
    // close socket id
    return () => {
      socket.off("receive-private-message");
    };
  }, [recevie_message_active])



  console.log(allMessage)


  return (
    <>

      <div className="border-b flex">
        <div className="flex items-center gap-2 p-2">
          <div className="size-[40px] rounded-full overflow-hidden border">
            <img
              src="https://lh3.googleusercontent.com/a/ACg8ocL-G38YycrNTgadRSctDVoHou9KPcM8OrqlQk9-I03rsqVALHA=s288-c-no"
              alt="user profile"
              className="w-full h-full"
            />
          </div>
          <div>
            <h1 className="font-semibold text-sm">Sagor Hossain : { 0}</h1>
            <p className="text-xs">ay product re dam koto</p>
          </div>
        </div>
      </div>
      {/* message */}
      <div className="overflow-auto scrollbar-vissible absolute top-14 bottom-10 left-0 right-0">
        {receivedMessages?.map((message, id) => {
          return (
            <div key={id} className="flex justify-start">
              <div className="flex items-center gap-2 p-4">
                <div className="size-[40px] rounded-full overflow-hidden border">
                  <img
                    src="https://lh3.googleusercontent.com/a/ACg8ocL-G38YycrNTgadRSctDVoHou9KPcM8OrqlQk9-I03rsqVALHA=s288-c-no"
                    alt="user profile"
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <div className="bg-blue text-white p-2 rounded-lg max-w-[400px]">
                    <p className="text-sm">
                      {message.message.text}
                    </p>
                  </div>
                  <p className="text-paragraph text-xs pt-1">{message.message.timestamp}</p>
                </div>
              </div>
            </div>
          )
        })}

      </div>
    </>
  )
}
