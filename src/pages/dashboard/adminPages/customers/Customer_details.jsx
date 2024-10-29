import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";
import useOrders from "../../../../hooks/useOrders";

const Customer_details = () => {
  const { email } = useParams();
  const axiosFetch = useAxios();

  const [customer, setCustomer] = useState(null);
  useEffect(() => {
    axiosFetch
      .get(`/customers/${email}`)
      .then((res) => {
        if (res.data._id) {
          setCustomer(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [email]);


// order data fetch
const {
  data: customerOrderHistory = [],
  refetch,
  isPending,
} = useQuery({
  queryKey: ["customerOrderHistory"],
  queryFn: async () => {
    const res = await axiosFetch.get(
      `/orders?email=${email}`
    );
    return res.data;
  },
});

  console.log(customerOrderHistory);

  return (
    <main className="mt-16">
      <section>
        <h1 className="font-semibold text-3xl">Customer Details</h1>
      </section>

      <section className="flex flex-col gap-4 mt-10">
        <Card></Card>
        <section className="grid grid-cols-6 gap-4  *:rounded-md *:box-shadow *:bg-white">
          <div className="col-span-2">
            <Customer_profile></Customer_profile>
          </div>
          <div className="col-span-4 h-[400px] overflow-auto custom-scrollbar">
            <OrderHistory></OrderHistory>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Customer_details;

// customer order status card
const Card = () => {
  return (
    <div className="grid grid-cols-5 gap-4 *:box-shadow *:bg-white *:rounded-md *:p-4 *:space-y-2 *:font-semibold">
      <div>
        <h3 className="font-semibold xl:text-xl">Total Cost</h3>
        <p>$2000.49</p>
      </div>
      <div className="text-green">
        <h3 className="font-semibold xl:text-xl">Total Order</h3>
        <p>1000</p>
      </div>
      <div className="text-cyan-500">
        <h3 className="font-semibold xl:text-xl"> Complate</h3>
        <p>200</p>
      </div>
      <div className="text-yellow-700">
        <h3 className="font-semibold xl:text-xl"> Refund</h3>
        <p>100</p>
      </div>
      <div className="text-customRed">
        <h3 className="font-semibold xl:text-xl"> Canceled</h3>
        <p>70</p>
      </div>
    </div>
  );
};

// customer profile
const Customer_profile = () => {
  return (
    <div>
      <div className="border-b p-4 flex justify-between items-center">
        <h4 className="font-semibold text-sm">Customer Information</h4>
        <figure className="size-[40px] rounded-full overflow-hidden border">
          <img
            src="https://lh3.googleusercontent.com/a/ACg8ocJHNtFThSGq16tvsVl2iDzNlEK1q6dDeDVVwJrQhVNtn7AUgug=s288-c-no"
            alt=""
          />
        </figure>
      </div>
      <div className="text-sm *:px-4 *:flex *:justify-between *:items-center space-y-6 mt-4">
        <div>
          <span className="font-bold">Name :</span>
          <span>Sagor Hossain</span>
        </div>
        <div>
          <span className="font-bold">Email :</span>
          <span>sagor@gmail.com</span>
        </div>
        <div>
          <span className="font-bold">Phone :</span>
          <span>01852024152</span>
        </div>
        <div>
          <span className="font-bold">Country:</span>
          <span>Bangladesh</span>
        </div>
        <div>
          <span className="font-bold">joined:</span>
          <span>20.29.2024</span>
        </div>
      </div>
      <div className="px-4 py-4 text-sm">
        <p className="font-bold">Address :</p>
        <p>Komorpur Bangla bazer road pabna, sadar pabna</p>
      </div>
    </div>
  );
};

// order history of the customer
const OrderHistory = () => {
  const [orders] = useOrders();

  return (
    <>
      <div className="flex justify-between items-center p-4 border-b">
        <p className="font-semibold">Orders</p>
        <select
          name="category"
          className="py-2 rounded-md  max-w-xs focus:outline-none border"
        >
          <option disabled selected>
            filter by
          </option>
          <option>canceled</option>
          <option>complated</option>
          <option>progress</option>
          <option>refund</option>
          <option>unpaid</option>
        </select>
      </div>
      <table className="w-full">
        <thead>
          <tr className="text-left *:p-3 border-b *:uppercase *:text-sm">
            <th>Date</th>
            <th>Total</th>
            <th>Items</th>
            <th>Payment Status</th>
            <th>Order Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((item, id) => {
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
                className=" *:text-sm *:p-3 border-b items-center hover:bg-[#f1efef] duration-500 *:text-gray-700"
              >
                <td>{createdAt.slice(0, 10)}</td>
                <td>${total_price}</td>
                <td>{products.length}</td>
                <td>
                  <div className="flex items-center gap-2">
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
                    <div>
                      {payment_status != "refund" && (
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <div tabIndex={0} role="button" className="m-1">
                            <BsThreeDotsVertical
                              onClick={() => setActiveStatus(!activeStatus)}
                              size={20}
                              className="mx-auto cursor-pointer"
                            ></BsThreeDotsVertical>
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-white rounded-box z-50 w-52 p-2 box-shadow"
                          >
                            {payment_status == "paid" ? (
                              <>
                                <li>
                                  <a>refund</a>
                                </li>
                              </>
                            ) : payment_status == "unpaid" ? (
                              <li>
                                <a>paid</a>
                              </li>
                            ) : (
                              <li>
                                <a>unpaid</a>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <p
                      className={`${
                        order_status?.status === "complated"
                          ? "text-green"
                          : order_status?.status === "courier"
                          ? "text-lime-700"
                          : order_status?.status === "progress"
                          ? "text-darkBlue"
                          : order_status?.status === "canceled"
                          ? "text-customRed"
                          : ""
                      } font-semibold`}
                    >
                      {order_status?.status}
                    </p>
                    <div>
                      {order_status?.status == "complated" ? (
                        " "
                      ) : order_status?.status == "canceled" ? (
                        " "
                      ) : (
                        <div className="dropdown dropdown-bottom dropdown-end">
                          <div tabIndex={0} role="button" className="m-1">
                            <BsThreeDotsVertical
                              onClick={() => setActiveStatus(!activeStatus)}
                              size={20}
                              className="mx-auto cursor-pointer"
                            ></BsThreeDotsVertical>
                          </div>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-white rounded-box z-50 w-52 p-2 box-shadow"
                          >
                            {order_status?.status == "pending" ? (
                              <>
                                <li
                                  onClick={() => updateOrder("canceled", _id)}
                                >
                                  <a>canceled</a>
                                </li>
                                <li
                                  onClick={() => updateOrder("progress", _id)}
                                >
                                  <a>progress</a>
                                </li>
                              </>
                            ) : order_status?.status == "progress" ? (
                              <>
                                <li>
                                  <a>canceled</a>
                                </li>
                                <li>
                                  <a>courier</a>
                                </li>
                              </>
                            ) : order_status?.status == "courier" ? (
                              <>
                                <li>
                                  <a>canceled</a>
                                </li>
                                <li>
                                  <a>complated</a>
                                </li>
                              </>
                            ) : (
                              ""
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 *:cursor-pointer">
                      <Link to={`/dashboard/order-details/${_id}`}>
                        <IoEyeOutline size={20}></IoEyeOutline>
                      </Link>
                      <MdOutlineDeleteForever
                        size={20}
                      ></MdOutlineDeleteForever>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
