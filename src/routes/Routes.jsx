import { createBrowserRouter } from "react-router-dom";
import PrivateRouter from "../components/Private_router";
import Root from "../layout/Root";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import AdminDashboard from "../pages/dashboard/adminPages/adminHome/AdminDashboard";
import Chat from "../pages/dashboard/adminPages/chat/Chat";
import Message_user from "../pages/dashboard/adminPages/chat/Message_user";
import Customer_details from "../pages/dashboard/adminPages/customers/Customer_details";
import Customers from "../pages/dashboard/adminPages/customers/Customers";
import OrderDetails from "../pages/dashboard/adminPages/order_list/OrderDetails";
import OrderList from "../pages/dashboard/adminPages/order_list/OrderList";
import CreateProduct from "../pages/dashboard/adminPages/product/create_product/CreateProduct";
import ProductDetails from "../pages/dashboard/adminPages/product/product_details/Product_details";
import Product_update from "../pages/dashboard/adminPages/product/product_update/Product_update";
import Products from "../pages/dashboard/adminPages/product/products/Products";
import Users from "../pages/dashboard/adminPages/users/Users";
import Dashboard from "../pages/dashboard/Dashboard";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NotFound from "../pages/notFound/NotFound";
import Product_details from "../pages/product_details/Product_details";
import Product from "../pages/products/Product";
import Register from "../pages/register/Register";
import Account from "../pages/user_account/account/Account";
import Order_details from "../pages/user_account/order_details/Order_details";
import Order from "../pages/user_account/orders/Order";
import Profile from "../pages/user_account/profile/Profile";
import Review from "../pages/user_account/review/Review";
import Wish_Products from "../pages/wish_list/Wish_Products";

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
        path: "/product/details/:id",
        element: <Product_details></Product_details>,
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
        path: "/wish-products",
        element: <Wish_Products></Wish_Products>,
      },
      // user account management
      {
        path: "/my-account",
        element: <Account></Account>,
        children: [
          {
            path: "/my-account",
            element: <Profile></Profile>,
          },
          {
            path: "/my-account/profile",
            element: <Profile></Profile>,
          },
          {
            path: "/my-account/orders",
            element: <Order></Order>,
          },
          {
            path: "/my-account/reviews",
            element: <Review></Review>,
          },
          {
            path: "/my-account/order-details/:id",
            element: <Order_details></Order_details>,
          },
        ],
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
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard",
        element: <PrivateRouter><AdminDashboard></AdminDashboard></PrivateRouter> ,
      },

      {
        path: "/dashboard/admin_dashboard",
        element:<PrivateRouter><AdminDashboard></AdminDashboard></PrivateRouter> ,
      },
      // product Routes
      {
        path: "/dashboard/all-product",
        element:<PrivateRouter><Products></Products></PrivateRouter> ,
      },
      {
        path: "/dashboard/create-product",
        element: <PrivateRouter><CreateProduct></CreateProduct></PrivateRouter>,
      },
      {
        path: "/dashboard/product-details/:id",
        element:<PrivateRouter><ProductDetails></ProductDetails></PrivateRouter> ,
      },
      {
        path: "/dashboard/update-product/:id",
        element: <PrivateRouter><Product_update></Product_update></PrivateRouter> ,
      },
      // customer routes
      {
        path: "/dashboard/customers",
        element:<PrivateRouter><Customers></Customers></PrivateRouter> ,
      },

      {
        path: "/dashboard/customer-details/:email",
        element:<PrivateRouter><Customer_details></Customer_details></PrivateRouter> ,
      },
      // order routes
      {
        path: "/dashboard/order-list",
        element:<PrivateRouter><OrderList></OrderList></PrivateRouter> ,
      },

      {
        path: "/dashboard/order-details/:id",
        element:<PrivateRouter><OrderDetails></OrderDetails></PrivateRouter> ,
      },
      // user chat routes
      {
        path: "/dashboard/users",
        element:<PrivateRouter><Users></Users></PrivateRouter>,
      },
      {
        path: "/dashboard/chat",
        element:<PrivateRouter><Chat></Chat></PrivateRouter> ,
        children: [
          {
            path: "/dashboard/chat/message-user/:id",
            element: <PrivateRouter><Message_user></Message_user></PrivateRouter>,
          },
        ]
      },
     
    ],
  },
]);

export default router;
