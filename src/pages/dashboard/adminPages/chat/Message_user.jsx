import { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useParams } from "react-router-dom";
import { io } from 'socket.io-client';
const Message_user = () => {
  const { id } = useParams()
  const [recevieMessage, setReceivedMessages] = useState([])
  useEffect(() => {
    const socket = io("http://localhost:5000/");
    socket.on(
      "receive-private-message",
      ({ senderId, message, receiverId }) => {
        setReceivedMessages((prevMessage) => [...prevMessage, message]);
      }
    );
  }, [])

  console.log(recevieMessage)





  return (
    <div className="relative w-full h-full">
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
            <h1 className="font-semibold text-sm">Sagor Hossain : {id || 0}</h1>
            <p className="text-xs">ay product re dam koto</p>
          </div>
        </div>
      </div>
      {/* message */}
      <div className="overflow-auto scrollbar-vissible absolute top-14 bottom-10 left-0 right-0">
        <div className="flex justify-start">
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
                  amar akta t-shirt lagbe koyta valo t-shirt dekan to vaia amar
                  akta t-shirt lagbe koyta valo t-shirt dekan to vaia amar akta
                  t-shirt lagbe koyta valo t-shirt dekan to vaia
                </p>
              </div>
              <p className="text-paragraph text-xs pt-1">3 min ago</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex flex-row-reverse items-center gap-2 p-4">
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
                  aktu daran ditasi sir ami koyta sobi tule ane dissi aktu daran
                  ditasi sir ami koyta sobi tule ane dissi aktu daran ditasi sir
                  ami koyta sobi tule ane dissi
                </p>
              </div>
              <p className="text-paragraph text-xs pt-1">3 min ago</p>
            </div>
          </div>
        </div>
        <div className="flex justify-start">
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
                  amar akta t-shirt lagbe koyta valo t-shirt dekan to vaia amar
                  akta t-shirt lagbe koyta valo t-shirt dekan to vaia amar akta
                  t-shirt lagbe koyta valo t-shirt dekan to vaia
                </p>
              </div>
              <p className="text-paragraph text-xs pt-1">3 min ago</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex flex-row-reverse items-center gap-2 p-4">
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
                  aktu daran ditasi sir ami koyta sobi tule ane dissi aktu daran
                  ditasi sir ami koyta sobi tule ane dissi aktu daran ditasi sir
                  ami koyta sobi tule ane dissi
                </p>
              </div>
              <p className="text-paragraph text-xs pt-1">3 min ago</p>
            </div>
          </div>
        </div>
      </div>
      {/* input feild */}
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
