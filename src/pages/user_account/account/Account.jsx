import { NavLink, Outlet } from "react-router-dom";

const Account = () => {
  return (
    <main className="max-w-7xl mx-auto px-4">
      <section className="text-center py-4">
        <h1 className="text-2xl font-bold">Your Account</h1>
        <p>Welcome, John Doe!</p>
      </section>
      <section className="flex flex-col md:flex-row gap-6 mt-4 bg-dashBgColor h-full rounded-lg">
        <div className="md:w-[20%] md:border-r-2 border-black">
          <ul className="flex justify-center gap-4 md:flex-col">
            <NavLink className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                to="/my-account/profile">
              <li className="md:mt-4 py-3 px-2 text-center">Profile</li>
            </NavLink>
            <NavLink className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                to="/my-account/orders">
              <li className="md:mt-4 py-3 px-2 text-center">Orders</li>
            </NavLink>
            <NavLink className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                to="/my-account/reviews">
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
