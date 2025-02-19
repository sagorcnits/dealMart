import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { addUser } from "../../features/user/userSlice";
import { auth } from "../../firebase_config";
import useAxios from "../../hooks/useAxios";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
const Dashboard = () => {
  const [sidebar, setSidebar] = useState(true);
  const [mobileSideBar, setMobileSideBar] = useState(false);
  const axiosPublic = useAxios()
  const dispatch = useDispatch();
  // desktop and laptop sidebar function
  const handleSideBar = () => {
    setSidebar(!sidebar);
  };
  // mobile sidebar function
  const handleMobileSideBar = () => {
    setMobileSideBar(!mobileSideBar);
  };

  // user login system data
  useEffect(() => {
    const stateChange = onAuthStateChanged(auth, (user) => {
      console.log(user)
      axiosPublic
        .get(`/customers/${user?.email}`)
        .then((res) => {
          // console.log(res.data);
          dispatch(
            addUser({
              name: user?.displayName,
              email: user?.email,
              photoUrl: user?.photoURL,
              role: res?.data?.role || undefined
            })
          );
        })
        .catch((err) => {
          console.log(err.message);
        });



    });
    return () => {
      stateChange();
    };
  }, [dispatch]);

  // theme
  const theme = useSelector((state) => state.darkMode);
  return (
    <main className="flex">
      <Sidebar
        sidebar={sidebar}
        mobileSideBar={mobileSideBar}
        handleMobileSideBar={handleMobileSideBar}
      ></Sidebar>
      <section
        className={`relative w-full duration-700  h-full ${sidebar ? "lg:ml-[250px]" : ""
          } ${theme == "light" ? "bg-[#F3F5F9]" : "bg-black"} `}
      >
        <Navbar
          sidebar={sidebar}
          handleSideBar={handleSideBar}
          handleMobileSideBar={handleMobileSideBar}
        ></Navbar>
        <div className={`p-4`}>
          <Outlet></Outlet>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
