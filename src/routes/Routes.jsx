import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import About from "../pages/about/About";
import AddProduct from "../pages/addProduct/AddProduct";
import Contact from "../pages/contact/Contact";
import AdminDashboard from "../pages/dashboard/adminPages/adminHome/AdminDashboard";
import Chat from "../pages/dashboard/adminPages/chat/Chat";
import CreateProduct from "../pages/dashboard/adminPages/create_product/CreateProduct";
import Customers from "../pages/dashboard/adminPages/customers/Customers";
import OrderList from "../pages/dashboard/adminPages/order_list/OrderList";
import Products from "../pages/dashboard/adminPages/products/Products";
import Users from "../pages/dashboard/adminPages/users/Users";
import Dashboard from "../pages/dashboard/Dashboard";
import Settings from "../pages/dashboard/shared/settings/Settings";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NotFound from "../pages/notFound/NotFound";
import Product from "../pages/products/Product";
import Register from "../pages/register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",
        element: <Product></Product>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/create-product",
        element: <AddProduct></AddProduct>,
      },
    ],
  },

  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  // dashboard routes
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/dashboard",
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "/dashboard/all-product",
        element: <Products></Products>,
      },
      {
        path: "/dashboard/create-product",
        element: <CreateProduct></CreateProduct>,
      },
      {
        path: "/dashboard/customers",
        element: <Customers></Customers>,
      },
      {
        path: "/dashboard/order-list",
        element: <OrderList></OrderList>,
      },
      {
        path: "/dashboard/users",
        element: <Users></Users>,
      },
      {
        path: "/dashboard/chat",
        element: <Chat></Chat>,
      },
      {
        path: "/dashboard/settings",
        element: <Settings></Settings>,
      },
    ],
  },
]);

export default router;
