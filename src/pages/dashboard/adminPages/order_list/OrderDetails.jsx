import { useEffect, useState } from "react";
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
            <CustomerLocation></CustomerLocation>
          </div>

          <div className="col-span-2 mt-6 lg:mt-0">
            <OrderSummary orderData={orderData}></OrderSummary>
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
const CustomerLocation = () => {
  return (
    <div>
      <iframe
        className="w-full h-[350px] rounded-md"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d164973.09597354202!2d89.2291932378806!3d23.980770535818408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe84d98fa5bf3d%3A0xb038902617eb9884!2sPabna!5e0!3m2!1sen!2sbd!4v1729849286907!5m2!1sen!2sbd"
        loading="lazy"
      ></iframe>
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
