import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const Order = () => {
  const axiosFetch = useAxios();
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  // fetch order
  useEffect(() => {
    console.log("ok");
    if (user?.email) {
      axiosFetch
        .get(`/orders/email/${user?.email}`)
        .then((res) => {
          setOrders(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [user]);
  // loading
  if (loading) {
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
    );
  }

  // console.log(orders)
  return (
    <div>
      <h1 className="p-2 font-semibold text-2xl">Your Orders</h1>
      <div className="w-full overflow-auto ">
        {orders?.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="text-sm md:text-[15px] text-left *:p-3 border-b *:uppercase">
                <th>#Order Id</th>
                <th>Date</th>
                <th>Total</th>
                <th>Items</th>
                <th>Payment Status</th>
                <th>Order Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders?.order?.map((item, id) => {
                const {
                  _id,
                  orderId,
                  products,
                  customer,
                  total_price,
                  payment_status,
                  order_status,
                  createdAt,
                } = item;
                return (
                  <tr
                    key={id}
                    className="*:p-3 border-b items-center hover:bg-[#f1efef] duration-500 *:text-gray-700 *:text-xs *:md:text-sm"
                  >
                    <td>{orderId}</td>
                    <td>{createdAt.slice(0, 10)}</td>
                    <td>${total_price}</td>
                    <td>{products.length}</td>
                    <td>
                      {" "}
                      <p
                        className={`${
                          payment_status == "paid"
                            ? "text-green"
                            : payment_status == "refund"
                            ? "text-customRed"
                            : ""
                        } font-semibold`}
                      >
                        {payment_status}
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p
                        className={`${
                          order_status?.status === "complated" &&
                          payment_status == "paid"
                            ? "text-green"
                            : order_status?.status === "courier"
                            ? "text-lime-700"
                            : order_status?.status === "progress"
                            ? "text-darkBlue"
                            : order_status?.status === "canceled"
                            ? "text-customRed"
                            : payment_status == "refund"
                            ? "text-customRed"
                            : ""
                        } font-semibold`}
                      >
                        {payment_status == "refund"
                          ? "canceled"
                          : order_status?.status}
                      </p>
                    </td>
                    <td>
                      <Link to={`/my-account/order-details/${_id}`}>
                        <IoEyeOutline size={20}></IoEyeOutline>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center font-semibold text-xl py-10">No Data</h1>
        )}
      </div>
    </div>
  );
};

export default Order;
