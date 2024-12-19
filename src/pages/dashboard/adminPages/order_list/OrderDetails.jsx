import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdDownloadDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";
const OrderDetails = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxios();
  // data fetch form server
  const theme = useSelector((state) => state.darkMode)
  useEffect(() => {
    axiosFetch
      .get(`/orders/${id}`)
      .then((res) => {
        if (res.data.message == "ok") {
          setOrderData(res.data.order);
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (loading) {
    return (
     <div className="h-screen flex justify-center items-center">
         <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
     </div>
    );
  }

  // dark mode 

  return (
    <>
      <main className="pt-20">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <section className="mt-4 lg:grid  lg:grid-cols-6 gap-6">
          <div className="col-span-4 flex flex-col gap-6">
            <div className={` box-shadow rounded-md overflow-auto w-full ${theme == "light" ? "bg-white" : "bg-black"}`}>
              <Table theme={theme} orderData={orderData}></Table>
            </div>
            <CartTotals theme={theme} orderData={orderData}></CartTotals>
            <div className="hidden lg:block">
              <TrackOrder theme={theme} orderData={orderData}></TrackOrder>
            </div>
          </div>

          <div className="col-span-2 mt-6 lg:mt-0 flex flex-col gap-6">
            <OrderSummary theme={theme} orderData={orderData}></OrderSummary>
            <div className="block lg:hidden ">
              <TrackOrder theme={theme} orderData={orderData}></TrackOrder>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OrderDetails;

// table
const Table = ({  theme,orderData }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left *:p-3 border-b">
          <th>Product Name</th>
          <th>Brand Name</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {orderData.products?.map((item, id) => {
          const {
            product_name,
            brand_name,
            category_name,
            images,
            sale_price,
          } = item?.product_id;
          return (
            <tr
              key={id}
              className={`*:p-3 border-b items-center hover:bg-[#f1efef] ${theme == "light" ? "" : "hover:text-black"} duration-500`}
            >
              <td>
                <div className="flex items-center gap-2 w-[150px]">
                  <figure className="overflow-hidden size-[50px] rounded-md">
                    <img
                      className="w-full h-full object-cover"
                      src={images[0]}
                      alt={product_name}
                    />
                  </figure>
                  <p>{product_name}</p>
                </div>
              </td>
              <td>{brand_name}</td>
              <td>{category_name}</td>
              <td>{item?.quantity}</td>
              <td>${sale_price}</td>
              <td>${item?.total_price}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
// cart Totals card
const CartTotals = ({ theme,orderData }) => {
  return (
    <div className={`${theme == "light" ? "bg-white" : "bg-black"} box-shadow *:flex *:justify-between *:items-center *:p-3 *:border-b rounded-md`}>
      <div className="font-semibold">
        <p>Cart totals</p>
        <p>Price</p>
      </div>
      <div>
        <p>SubTotal: </p>
        <p>${orderData?.total_price}</p>
      </div>
      <div>
        <p>Shipping: </p>
        <p>${orderData?.shipping_price}</p>
      </div>
      <div className="font-semibold">
        <p>Total Price: </p>
        <p>${orderData?.total_price + orderData?.shipping_price}</p>
      </div>
    </div>
  );
};
// google map by customer address
const TrackOrder = ({ theme,orderData }) => {
  const { order_status } = orderData;
  // console.log(order_status?.track_order);

  let order_track = {
    reciving: "",
    progress: "",
    courier: "",
    complated: "",
    canceled: "",
  };

  for (let i = 0; i < order_status?.track_order?.length; i++) {
    if (order_status?.track_order[i].status == "pending") {
      order_track.reciving = order_status?.track_order[i];
    } else if (order_status?.track_order[i].status == "progress") {
      order_track.progress = order_status?.track_order[i];
    } else if (order_status?.track_order[i].status == "complated") {
      order_track.complated = order_status?.track_order[i];
    } else if (order_status?.track_order[i].status == "courier") {
      order_track.courier = order_status?.track_order[i];
    } else if (order_status?.track_order[i].status == "canceled") {
      order_track.canceled = order_status?.track_order[i];
    }
  }

  return (
    <div className={` box-shadow rounded-md p-4 ${theme == "light" ? "bg-white" : "bg-black"}`}>
      <h3 className="font-semibold">Detail</h3>
      <p className="text-sm">
        Tracking information will be available within 24 hours.
      </p>

      {order_track?.canceled?.status ? (
        <div className="text-center font-semibold text-sm space-y-2">
          <div className="size-[50px] my-4 mx-auto rounded-full bg-customRed flex justify-center items-center text-white">
            <IoClose size={30}></IoClose>
          </div>
          <p>Canceled order</p>
          <p>{order_track?.canceled?.date?.slice(11, 19)}</p>
          <p>{order_track?.canceled?.date?.slice(0, 10)}</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-4  items-center py-8">
            <div
              className={`${
                order_track?.reciving.status ? "bg-blue" : "bg-paragraph"
              } h-1 relative`}
            >
              <div
                className={`track_order size-[40px] rounded-full flex justify-center items-center ${
                  order_track?.reciving.status
                    ? "bg-blue text-white"
                    : "bg-paragraph"
                } absolute`}
              >
                <MdDownloadDone size={20}></MdDownloadDone>
              </div>
            </div>
            <div
              className={`${
                order_track?.progress.status ? "bg-blue" : "bg-paragraph"
              } h-1 relative`}
            >
              <div
                className={`track_order size-[40px] rounded-full flex justify-center items-center ${
                  order_track?.progress.status
                    ? "bg-blue text-white"
                    : "bg-paragraph"
                } absolute`}
              >
                <MdDownloadDone size={20}></MdDownloadDone>
              </div>
            </div>
            <div
              className={`${
                order_track?.courier.status ? "bg-blue" : "bg-paragraph"
              } h-1 relative`}
            >
              <div
                className={`track_order size-[40px] rounded-full flex justify-center items-center ${
                  order_track?.courier.status
                    ? "bg-blue text-white"
                    : "bg-paragraph"
                } absolute`}
              >
                <MdDownloadDone size={20}></MdDownloadDone>
              </div>
            </div>
            <div
              className={`${
                order_track?.complated.status ? "bg-blue" : "bg-paragraph"
              } h-1 relative`}
            >
              <div
                className={`track_order size-[40px] rounded-full flex justify-center items-center ${
                  order_track?.complated.status
                    ? "bg-blue text-white"
                    : "bg-paragraph"
                } absolute`}
              >
                <MdDownloadDone size={20}></MdDownloadDone>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4  items-center text-sm font-semibold">
            <div className="text-center space-y-2 ">
              <h3>receving order</h3>
              <p>{order_track?.reciving?.date?.slice(11, 19)}</p>
              <p>{order_track?.reciving?.date?.slice(0, 10)}</p>
            </div>
            <div className="text-center space-y-2 ">
              <h3>progress order</h3>
              <p>{order_track?.progress?.date?.slice(11, 19)}</p>
              <p>{order_track?.progress?.date?.slice(0, 10)}</p>
            </div>
            <div className="text-center space-y-2 ">
              <h3>courier Order</h3>
              <p>{order_track?.courier?.date?.slice(11, 19)}</p>
              <p>{order_track?.courier?.date?.slice(0, 10)}</p>
            </div>
            <div className="text-center space-y-2 ">
              <h3>delivered Order</h3>
              <p>{order_track?.complated?.date?.slice(11, 19)}</p>
              <p>{order_track?.complated?.date?.slice(0, 10)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
// order Summury
const OrderSummary = ({ theme,orderData }) => {
  const {
    createdAt,
    customer,
    orderId,
    order_status,
    total_price,
    customer_img,
    shipping_address,
    phone,
    email,
    payment_infor,
    payment_status,
    shipping_price,
  } = orderData;
  return (
    <section className="flex flex-col gap-6 ">
      <div className={`box-shadow p-4  space-y-3 rounded-md ${theme == "light" ? "bg-white" : "bg-black"}`}>
        <p className="font-semibold">Summary</p>
        <div className="flex justify-between items-center">
          <p>Order Id</p>
          <p className="font-semibold text-sm">{orderId}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Payment Status</p>
          <p className="font-semibold text-sm">{payment_status}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Order Status</p>
          <p className="font-semibold text-sm">{order_status?.status}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Payment Method</p>
          <p className="font-semibold text-sm">{payment_infor}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Date</p>
          <p className="font-semibold text-sm">{createdAt?.slice(0, 10)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Total</p>
          <p className="font-semibold text-sm">
            ${total_price + shipping_price}
          </p>
        </div>
      </div>
      <div className={`box-shadow p-4 space-y-3 rounded-md ${theme == "light" ? "bg-white" : "bg-black"}`}>
        <p className="border-b pb-2 font-semibold">Customer Details</p>
        <div className="space-y-3">
          <div className="flex gap-2">
            <figure className="overflow-hidden size-[50px] rounded-full border">
              <img
                className="w-full h-full object-cover"
                src={customer_img}
                alt={customer}
              />
            </figure>
            <div>
              <p>{customer}</p>
              <p className="text-green">{email}</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">Contact Number</p>
            <p className="text-sm">{phone}</p>
          </div>
          <div>
            <p className="font-semibold">Shipping Address</p>
            <p className="text-sm">{shipping_address}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
