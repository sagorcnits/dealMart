import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../../../hooks/useAxios";

const Customer_details = () => {
  const { email } = useParams();
  const axiosFetch = useAxios();

  const [customer, setCustomer] = useState([]);

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
      const res = await axiosFetch.get(`/orders?email=${email}`);
      return res.data;
    },
  });

  // console.log(customerOrderHistory);

  return (
    <main className="mt-16">
      <section>
        <h1 className="font-semibold text-3xl">Customer Details</h1>
      </section>

      <section className="flex flex-col gap-4 mt-10">
        <Card
          customerOrderHistory={customerOrderHistory}
          isPending={isPending}
        ></Card>
        <section className="grid grid-cols-6 gap-4  *:rounded-md *:box-shadow *:bg-white">
          <div className="col-span-2">
            <Customer_profile customer={customer}></Customer_profile>
          </div>
          <div className="col-span-4 h-[400px] overflow-auto custom-scrollbar">
            <OrderHistory
              customerOrderHistory={customerOrderHistory}
              refetch={refetch}
              isPending={isPending}
            ></OrderHistory>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Customer_details;

// customer order status card
const Card = ({ customerOrderHistory }) => {
  // total_cost in customer order history
  const total_cost = customerOrderHistory.reduce((prev, current) => {
    const total_amount = prev + current.total_price;
    return total_amount;
  }, 0);
  // total complate order filter
  const total_complated = customerOrderHistory.filter(
    (item) => item.order_status.status == "complated"
  );
  // total refund on the customer order
  const total_refund = customerOrderHistory.filter(
    (item) => item.payment_status == "refund"
  );
  // total canceled order this customer
  const total_canceled = customerOrderHistory.filter(
    (item) => item.order_status.status == "canceled"
  );

  return (
    <div className="grid grid-cols-5 gap-4 *:box-shadow *:bg-white *:rounded-md *:p-4 *:space-y-2 *:font-semibold">
      <div>
        <h3 className="font-semibold xl:text-xl">Total Cost</h3>
        <p>${total_cost}</p>
      </div>
      <div className="text-green">
        <h3 className="font-semibold xl:text-xl">Total Order</h3>
        <p>{customerOrderHistory?.length}</p>
      </div>
      <div className="text-cyan-500">
        <h3 className="font-semibold xl:text-xl"> Complate</h3>
        <p>{total_complated?.length}</p>
      </div>
      <div className="text-yellow-700">
        <h3 className="font-semibold xl:text-xl"> Refund</h3>
        <p>{total_refund?.length}</p>
      </div>
      <div className="text-customRed">
        <h3 className="font-semibold xl:text-xl">Canceled</h3>
        <p>{total_canceled?.length}</p>
      </div>
    </div>
  );
};

// customer profile
const Customer_profile = ({ customer }) => {
  const { name, email, phone, address, country, image, joined } = customer;

  return (
    <div>
      <div className="border-b p-4 flex justify-between items-center">
        <h4 className="font-semibold text-sm">Customer Information</h4>
        <figure className="size-[40px] rounded-full overflow-hidden border">
          <img src={image} alt={name} />
        </figure>
      </div>
      <div className="text-sm *:px-4 *:flex *:justify-between *:items-center space-y-6 mt-4">
        <div>
          <span className="font-bold">Name :</span>
          <span>{name}</span>
        </div>
        <div>
          <span className="font-bold">Email :</span>
          <span>{email}</span>
        </div>
        <div>
          <span className="font-bold">Phone :</span>
          <span>{phone}</span>
        </div>
        <div>
          <span className="font-bold">Country:</span>
          <span>{country}</span>
        </div>
        <div>
          <span className="font-bold">joined:</span>
          <span>{joined?.slice(0, 10)}</span>
        </div>
      </div>
      <div className="px-4 py-4 text-sm">
        <p className="font-bold">Address :</p>
        <p>{address}</p>
      </div>
    </div>
  );
};

// order history of the customer
const OrderHistory = ({ customerOrderHistory, refetch, isPending }) => {
  const axiosFetch = useAxios();
  // delete order from customer details
  const deleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosFetch
          .delete(`/orders/${id}`)
          .then((res) => {
            if (res.data.message === "ok") {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
  // update order data from customer details
  const updateOrder = (status, id) => {
    console.log(status);
    axiosFetch
      .put(`/orders/${id}`, { status: status })
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          Swal.fire({
            title: "Update",
            text: "Your file has been Updated.",
            icon: "success",
          });
          refetch();
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Update is not working",
          text: "Somthong Wrong",
          icon: "warning",
        });
        console.log(error);
      });
  };

  if (isPending) {
    return (
      <div className="mt-40 w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
    );
  }

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
      {customerOrderHistory.length > 0 ? (
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
            {customerOrderHistory?.map((item, id) => {
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
                                // onClick={() => setActiveStatus(!activeStatus)}
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
                                  <li
                                    onClick={() => updateOrder("refund", _id)}
                                  >
                                    <a>refund</a>
                                  </li>
                                </>
                              ) : payment_status == "unpaid" ? (
                                <li onClick={() => updateOrder("paid", _id)}>
                                  <a>paid</a>
                                </li>
                              ) : (
                                <li onClick={() => updateOrder("unpaid", _id)}>
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
                      <div>
                        {order_status?.status == "complated" ? (
                          " "
                        ) : order_status?.status == "canceled" ? (
                          " "
                        ) : (
                          <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button" className="m-1">
                              <BsThreeDotsVertical
                                // onClick={() => setActiveStatus(!activeStatus)}
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
                                  <li
                                    onClick={() => updateOrder("canceled", _id)}
                                  >
                                    <a>canceled</a>
                                  </li>
                                  <li
                                    onClick={() => updateOrder("courier", _id)}
                                  >
                                    <a>courier</a>
                                  </li>
                                </>
                              ) : order_status?.status == "courier" ? (
                                <>
                                  <li
                                    onClick={() => updateOrder("canceled", _id)}
                                  >
                                    <a>canceled</a>
                                  </li>
                                  {payment_status == "paid" && (
                                    <li
                                      onClick={() =>
                                        updateOrder("complated", _id)
                                      }
                                    >
                                      <a>complated</a>
                                    </li>
                                  )}
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
                          onClick={() => deleteOrder(_id)}
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
      ) : (
        <h1 className="text-center text-3xl">No Data</h1>
      )}
    </>
  );
};
