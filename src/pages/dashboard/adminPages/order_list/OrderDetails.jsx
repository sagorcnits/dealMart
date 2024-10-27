import { useEffect, useState } from "react";
import { MdDownloadDone } from "react-icons/md";
import { useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState([]);
  const axiosFetch = useAxios();
  // data fetch form server
  useEffect(() => {
    axiosFetch
      .get(`/orders/${id}`)
      .then((res) => {
        if (res.data.message == "ok") {
          setOrderData(res.data.order);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log(orderData);

  return (
    <>
      <main className="pt-20">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <section className="mt-4 lg:grid  lg:grid-cols-6 gap-6">
          <div className="col-span-4 flex flex-col gap-6">
            <div className="bg-white box-shadow rounded-md overflow-auto w-full">
              <Table orderData={orderData}></Table>
            </div>
            <CartTotals orderData={orderData}></CartTotals>
            <div className="hidden lg:block">
              <TrackOrder orderData={orderData}></TrackOrder>
            </div>
          </div>

          <div className="col-span-2 mt-6 lg:mt-0 flex flex-col gap-6">
            <OrderSummary orderData={orderData}></OrderSummary>
            <div className="block lg:hidden ">
              <TrackOrder orderData={orderData}></TrackOrder>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default OrderDetails;

// table
const Table = ({ orderData }) => {
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
              className="*:p-3 border-b items-center hover:bg-[#f1efef] duration-500"
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
const CartTotals = ({ orderData }) => {
  return (
    <div className="bg-white box-shadow *:flex *:justify-between *:items-center *:p-3 *:border-b rounded-md">
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
const TrackOrder = ({ orderData }) => {
  
  const { order_status } = orderData;
  console.log(order_status?.track_order);

  let order_track = {
    reciving: "",
    progress: "",
    courier: "",
    complated: "",
  };

  for (let i = 0; i < order_status?.track_order?.length; i++) {
    console.log(order_status?.track_order[i].status);
    if (order_status?.track_order[i].status == "pending") {
      order_track.reciving = order_status?.track_order[i].status;
    } else if (order_status?.track_order[i].status == "progress") {
      order_track.progress = order_status?.track_order[i].status;
    }else if (order_status?.track_order[i].status == "complated") {
      order_track.complated = order_status?.track_order[i].status;
    }else if (order_status?.track_order[i].status == "courier") {
      order_track.courier = order_status?.track_order[i].status;
    }
  }

  return (
    <div className="bg-white box-shadow rounded-md p-3">
      <h3 className="font-semibold">Detail</h3>
      <p className="text-sm">
        Tracking information will be available within 24 hours.
      </p>

      <div className="grid grid-cols-4  items-center py-8">
        <div
          className={`${
            order_track?.reciving ? "bg-blue" : "bg-paragraph"
          } h-1 relative`}
        >
          <div
            className={`track_order size-[40px] rounded-full flex justify-center items-center ${
              order_track?.reciving ? "bg-blue text-white" : "bg-paragraph"
            } absolute`}
          >
            <MdDownloadDone size={20}></MdDownloadDone>
          </div>
        </div>
        <div
          className={`${order_track?.progress ? "bg-blue" : "bg-paragraph"} h-1 relative`}
        >
          <div
            className={`track_order size-[40px] rounded-full flex justify-center items-center ${
              order_track?.progress ? "bg-blue text-white" : "bg-paragraph"
            } absolute`}
          >
            <MdDownloadDone size={20}></MdDownloadDone>
          </div>
        </div>
        <div className={`${order_track?.courier ? "bg-blue" : "bg-paragraph"} h-1 relative`}>
          <div
            className={`track_order size-[40px] rounded-full flex justify-center items-center ${
              order_track?.courier ? "bg-blue text-white" : "bg-paragraph"
            } absolute`}
          >
            <MdDownloadDone size={20}></MdDownloadDone>
          </div>
        </div>
        <div
          className={`${order_track?.complated ? "bg-blue" : "bg-paragraph"} h-1 relative`}
        >
          <div
            className={`track_order size-[40px] rounded-full flex justify-center items-center ${
              order_track?.complated ? "bg-blue text-white" : "bg-paragraph"
            } absolute`}
          >
            <MdDownloadDone size={20}></MdDownloadDone>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4  items-center">
        <div className="text-center space-y-2 ">
          <h3>receving order</h3>
          <p>20/10/2024</p>
        </div>
        <div className="text-center space-y-2 ">
          <h3>progress order</h3>
          <p>20/10/2024</p>
        </div>
        <div className="text-center space-y-2 ">
          <h3>courier Order</h3>
          <p>20/10/2024</p>
        </div>
        <div className="text-center space-y-2 ">
          <h3>complated Order</h3>
          <p>20/10/2024</p>
        </div>
      </div>
    </div>
  );
};
// order Summury
const OrderSummary = ({ orderData }) => {
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
      <div className="box-shadow p-4 bg-white space-y-3 rounded-md">
        <p className="font-semibold">Summary</p>
        <div className="flex justify-between items-center">
          <p>Order Id</p>
          <p>{orderId}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Date</p>
          <p>{createdAt?.slice(0, 10)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p>Total</p>
          <p>${total_price + shipping_price}</p>
        </div>
      </div>
      <div className="box-shadow p-4 bg-white space-y-3 rounded-md">
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
          <div>
            <p className="font-semibold">Payment Information</p>
            <p className="text-sm">{payment_infor}</p>
          </div>
        </div>
      </div>

      <div className="box-shadow p-4 bg-white space-y-3 rounded-md">
        <button className="border border-blue py-2 duration-500 hover:bg-blue w-full text-center font-semibold rounded-md hover:text-white">
          Track Order
        </button>
      </div>
    </section>
  );
};
