import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
const Chat = () => {


  // darl mode 
  const theme = useSelector((state) => state.darkMode)
  return (
    <main className="pt-[60px]">
      <section className={`flex flex-col md:flex-row gap-3 md:banner    *:rounded-lg pt-4 ${theme == "light" ? "*:bg-white" : "*:bg-black"}`}>
        <Chat_user></Chat_user>
        <div className="md:w-[75%] h-[500px] md:h-auto">
          <Outlet></Outlet>
        </div>
      </section>
    </main>
  );
};

export default Chat;

// chat user components
const Chat_user = () => {
  return (
    <div className="p-2 relative md:w-[25%] h-[120px] md:h-auto">
      <div>
        <input
          className="py-[7px] rounded-lg w-full border focus:outline-none px-2"
          type="text"
          placeholder="search"
        />
      </div>
      {/* user profile card */}
      <div className="overflow-auto flex md:flex-col scrollbar-none md:scrollbar-vissible absolute top-10 bottom-0 left-0 right-0  mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, id) => {
          return (
            <NavLink  className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active_chat_user" : ""
            } key={id} to={`/dashboard/chat/message-user/${id}`}>
              <div className="flex items-center gap-2 p-2 cursor-pointer hover:bg-[#a7a3a3] duration-500">
                <div className="size-[50px] rounded-full overflow-hidden border">
                  <img
                    src="https://lh3.googleusercontent.com/a/ACg8ocL-G38YycrNTgadRSctDVoHou9KPcM8OrqlQk9-I03rsqVALHA=s288-c-no"
                    alt="user profile"
                    className="w-full h-full"
                  />
                </div>
                <div className="hidden md:block">
                  <h1 className="font-semibold">Sagor Hossain</h1>
                  <p className="text-xs">ay product re dam koto</p>
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

