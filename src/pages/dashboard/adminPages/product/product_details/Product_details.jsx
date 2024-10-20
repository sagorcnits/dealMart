import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAxios from "../../../../../hooks/useAxios";
import Detail_slider from "./Detail_slider";
const ProductDetails = () => {
  const [productData, setProductData] = useState(null);
  const axiosFetch = useAxios();
  const { id } = useParams();

  useEffect(() => {
    axiosFetch
      .get(`/products/${id}`)
      .then((res) => {
        setProductData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const removeProduct = (id) => {
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
          .delete(`/products/${id}`)
          .then((res) => {
            if (res.data.message === "ok") {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 mt-16">
      <ToastContainer></ToastContainer>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Details</h1>
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="flex justify-center h-[400px] overflow-hidden">
            <Detail_slider productImage={productData?.images}></Detail_slider>
          </div>

          {/* Product Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Product Name : {productData?.product_name}
            </h2>
            <p className="text-lg mb-4 text-gray-600">
              {productData?.description}
            </p>

            <div className="mb-4">
              <span className="font-bold text-gray-800">Category: </span>
              <span className="text-gray-600">
                {productData?.category_name}
              </span>
            </div>

            <div className="mb-4">
              <span className="font-bold text-gray-800">Reguler Price: </span>
              <span className="text-gray-600">
                ${productData?.reguler_price}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Sale Price: </span>
              <span className="text-gray-600">${productData?.sale_price}</span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-800">Quantity: </span>
              <span className="text-gray-600">
                {productData?.quantity_in_stock}
              </span>
            </div>

            <div className="mb-4">
              <span className="font-bold text-gray-800">Stock: </span>
              <span className="text-gray-600">{productData?.stock_status}</span>
            </div>

            <div className="mb-4">
              <span className="font-bold text-gray-800">Brand: </span>
              <span className="text-gray-600">{productData?.brand_name}</span>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 mt-6 *:rounded-full *:duration-500   *:py-[6px] *:border *:flex-1 *:text-center">
              <button className="border-blue text-blue hover:bg-blue  hover:text-white">
                Edit
              </button>
              <button
                onClick={() => removeProduct(id)}
                className="border-customRed hover:bg-customRed  hover:text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
