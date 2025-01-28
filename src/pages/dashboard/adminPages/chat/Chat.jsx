import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";
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
  const [allUserData, setUsersData] = useState([])
  const axiosPublic = useAxios()

  useEffect(() => {
    axiosPublic.get("/chat-user").then(res => {
      console.log(res.data.data)
      setUsersData(res.data.data)
    }).catch(err => console.error(err))
  }, [])

  // console.log(allUserData)

  const user = useSelector((state) => state.user.user)

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
        {allUserData?.map((item, id) => {
          const { customer_name, image, customer_email } = item;
          return (
            <NavLink className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active_chat_user" : ""
            } key={id} to={`/dashboard/chat/message-user/${customer_email}`}>
              <div className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-[#a7a3a3] duration-500 ${user?.email == customer_email ? "hidden" : ""}`}>
                <div className="size-[50px] rounded-full overflow-hidden border">
                  <img
                    src={image}
                    alt="user profile"
                    className="w-full h-full"
                  />
                </div>
                <div className="hidden md:block">
                  <h1 className="font-semibold">{customer_name}</h1>
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

