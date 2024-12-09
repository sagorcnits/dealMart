import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const Account = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxios();
  const user = useSelector((state) => state.user.user);
  // data fetch user er
  useEffect(() => {
    console.log("ok");

    if (user?.email) {
      axiosFetch
        .get(`/customers/${user?.email}`)
        .then((res) => {
          setProfile(res.data);
          // console.log(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user]);

  // loader
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <main className="max-w-7xl mx-auto px-4">
      <section className="text-center py-4">
        <h1 className="text-2xl font-bold">Your Account</h1>
        <p>Welcome <span className="font-bold text-green">{profile?.name}</span></p>
      </section>
      <section className="flex flex-col md:flex-row gap-6 mt-4 bg-dashBgColor h-full rounded-lg">
        <div className="md:w-[20%] md:border-r-2 border-black">
          <ul className="flex justify-center gap-4 md:flex-col">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to="/my-account/profile"
            >
              <li className="md:mt-4 py-3 px-2 text-center">Profile</li>
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to="/my-account/orders"
            >
              <li className="md:mt-4 py-3 px-2 text-center">Orders</li>
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to="/my-account/reviews"
            >
              <li className="md:mt-4 py-3 px-2 text-center">Reviews</li>
            </NavLink>
          </ul>
        </div>
        <div className="md:w-[80%] p-4">
          <Outlet></Outlet>
        </div>
      </section>
    </main>
  );
};

export default Account;
