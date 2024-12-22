import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Chat_system from "../components/Chat_system";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { addUser } from "../features/user/userSlice";
import { auth } from "../firebase_config";
import useAxios from "../hooks/useAxios";
const Root = () => {
  const dispatch = useDispatch();
  const axiosFetch = useAxios();

  useEffect(() => { }, [dispatch]);

  useEffect(() => {
    const stateChange = onAuthStateChanged(auth, (user) => {
      axiosFetch
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

  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
      <Chat_system></Chat_system>
    </>
  );
};

export default Root;
