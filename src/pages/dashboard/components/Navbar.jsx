import { CiSearch } from "react-icons/ci";
import { FaRegMessage } from "react-icons/fa6";
import { IoMdMenu } from "react-icons/io";
import { IoNotificationsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeUser } from "../../../features/user/userSlice";
const Navbar = ({ handleSideBar }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center px-3 py-2 bg-white">
      <div className="flex justify-center items-center gap-6">
        <IoMdMenu
          className="cursor-pointer"
          size={30}
          onClick={handleSideBar}
        ></IoMdMenu>
        <div className="flex justify-between items-center w-[400px] border px-3 rounded-md">
          <input className="focus:outline-none py-2" type="text" placeholder="serach here" />
          <CiSearch className="cursor-pointer" size={20}></CiSearch>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="size-8 rounded-full bg-slate-200 flex justify-center items-center">
          <FaRegMessage></FaRegMessage>
        </div>
        <div className="size-8 rounded-full bg-slate-200 flex justify-center items-center">
          <IoNotificationsOutline
            className="cursor-pointer"
            size={25}
          ></IoNotificationsOutline>
        </div>

        <div>
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-2">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle  avatar"
              >
                <div className="w-10 rounded-full ">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoUrl}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold">Sagor Hossian</p>
                <p className="text-[10px]">Admin</p>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-darkBlue text-white poppins rounded-box z-50 mt-3 w-52 p-2 shadow space-y-3"
            >
              <li className="hover:text-green duration-500">
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <Link to="/create-product">
                <li className="hover:text-green duration-500 pl-3">
                  Create Product
                </li>
              </Link>
              <Link onClick={() => dispatch(removeUser())}>
                {" "}
                <li className="hover:text-green duration-500 pl-3">Logout</li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
