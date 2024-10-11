import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { addUser } from "../features/user/userSlice";
import { auth } from "../firebase_config";

const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const stateChange = onAuthStateChanged(auth, (user) => {
      dispatch(
        addUser({
          name: user?.displayName,
          email: user?.email,
          photoUrl: user?.photoURL,
        })
      );
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
    </>
  );
};

export default Root;


