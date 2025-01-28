import { useContext, useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../components/Socket_provider";
import useAxios from "../../../../hooks/useAxios";
const Message_user = () => {
  const [message, setMessage] = useState("");
  const { socket } = useContext(AuthContext);
  const { id } = useParams()
  const axiosPublic = useAxios()
  const user = useSelector((state) => state.user.user)
  // send message form admin
  const handleSendMessage = (e) => {
    e.preventDefault();
    // get admin socket from server
    if(message == ""){
      return alert("Please Give me input")
    } 
    axiosPublic.get(`/chat-user/${id}`).then((res) => {
      const { socketId, customer_email } = res.data;
      // message brodcast
      if (socketId) {
        socket.emit("private-message", {
          senderId: socket.id, message: {
            text: message,
            image: user?.photoUrl,
            timestamp: new Date(),
          }, receiverId: socketId
        });
        setMessage("");
        axiosPublic.post("/messages",
          {
            message: {
              text: message,
              image: user?.photoUrl
            },
            sender: user?.email,
            receiver: customer_email,
          }).then(res => {
            console.log(res.data)
          }).catch(err => {
            console.log(err.message)
          })
      }
    }).catch(err => {
      console.log(err.message)
    })
  }

  return (
    <div className="relative w-full h-full">
      <Message_admin ></Message_admin>

      <form onSubmit={handleSendMessage} className="flex items-center gap-2 absolute left-2 bottom-2 right-2">
        <div className="w-[90%] md:w-[94%] border rounded-lg overflow-hidden">
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="py-[9px] w-full px-3 focus:outline-none"
            type="text"
            placeholder="Type a message"
          />
        </div>
        <button type="submit" className="flex justify-center items-center size-[40px] rounded-full bg-green text-white cursor-pointer hover:bg-customRed duration-500">
          <IoIosSend></IoIosSend>
        </button>
      </form>
    </div>
  );
};

export default Message_user;

// recive message admin 

const Message_admin = () => {
  const [user, setUser] = useState(null)
  const [receivedMessages, setReceivedMessages] = useState([])
  const { socket } = useContext(AuthContext);
  const { id } = useParams()
  const axiosPublic = useAxios()

  // get all user message form database
  useEffect(() => {
    axiosPublic.get(`/messages/${id}`).then((res) => {
      setReceivedMessages(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  }, [id])

  // get user data
  useEffect(() => {
    axiosPublic.get(`/chat-user/${id}`).then((res) => {
      console.log(res.data)
      setUser(res.data)
    }).catch((err) => {
      console.log(err.message)
    })
  }, [id])

  // socket io recive message
  useEffect(() => {
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
  }, [])



  // console.log(allMessage)

  const adminUser = useSelector((state) => state.user.user)
console.log(adminUser)
  return (
    <>

      <div className="border-b flex">
        <div className="flex items-center gap-2 p-2">
          <div className="size-[40px] rounded-full overflow-hidden border">
            <img
              src={user?.image}
              alt="user profile"
              className="w-full h-full"
            />
          </div>
          <div>
            <h1 className="font-semibold text-sm">{user?.customer_name}</h1>
            <p className="text-xs">ay product re dam koto</p>
          </div>
        </div>
      </div>
      {/* message */}
      <div className="overflow-auto scrollbar-vissible absolute top-14 bottom-10 left-0 right-0">
        {receivedMessages?.map((message, id) => {
          return (
            <div key={id} className={`flex w-full ${message?.sender == adminUser?.email ? "justify-end" : "justify-start"}`}>
              <div className={`flex items-center gap-2 p-4 ${message?.sender == adminUser?.email ? "flex-row-reverse" : ""}`}>
                <div className="size-[40px] rounded-full overflow-hidden border">
                  <img
                    src={user?.image}
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
