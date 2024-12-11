import React from "react";
import { IoIosSend } from "react-icons/io";
const Chat = () => {
  return (
    <main className="pt-[60px]">
      <section className="flex gap-3 banner  *:bg-white  *:rounded-lg pt-4">
        <div className="w-[25%]">
          <Chat_user></Chat_user>
        </div>

        <Message_user></Message_user>
      </section>
    </main>
  );
};

export default Chat;

// chat user components
const Chat_user = () => {
  return (
    <div className="p-2">
      <div>
        <input
          className="py-[7px] rounded-lg w-full border focus:outline-none px-2"
          type="text"
          placeholder="search"
        />
      </div>
      {/* user profile card */}
      <div className="overflow-auto h-[430px]  mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, id) => {
          return (
            <div
              key={id}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#F3F5F9] duration-500"
            >
              <div className="size-[50px] rounded-full overflow-hidden border">
                <img
                  src="https://lh3.googleusercontent.com/a/ACg8ocL-G38YycrNTgadRSctDVoHou9KPcM8OrqlQk9-I03rsqVALHA=s288-c-no"
                  alt="user profile"
                  className="w-full h-full"
                />
              </div>
              <div>
                <h1 className="font-semibold">Sagor Hossain</h1>
                <p className="text-xs">ay product re dam koto</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// user messages conatiner

const Message_user = () => {
  return (
    <div className="w-[75%] relative">
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
            <h1 className="font-semibold text-sm">Sagor Hossain</h1>
            <p className="text-xs">ay product re dam koto</p>
          </div>
        </div>
      </div>

      {/* message */}
      <div className="overflow-auto banner">
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
        <div className="w-[94%] border rounded-lg overflow-hidden">
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
