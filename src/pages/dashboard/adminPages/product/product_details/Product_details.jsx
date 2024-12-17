import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import useAxios from "../../../../../hooks/useAxios";
import Detail_slider from "./Detail_slider";
const ProductDetails = () => {
  const [productData, setProductData] = useState(null);
  const axiosFetch = useAxios();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axiosFetch
      .get(`/products/${id}`)
      .then((res) => {
        setProductData(res.data.data);
        // console.log(res.data)
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

              navigate("/dashboard/all-product");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const theme = useSelector((state) => state.darkMode);

  return (
    <div className={`min-h-screen  p-4 mt-16 ${theme == "light" ? "bg-dashBgColor" : "bg-black"}`}>
      <ToastContainer></ToastContainer>
      <h1 className={`text-3xl font-bold mb-6 ${theme == "light" ? "text-gray-800" : "text-gray-200"} `}>Product Details</h1>
      <div className={`container mx-auto ${theme == "light" ? "bg-white" : "bg-black"} p-8 rounded-lg shadow-md`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="flex justify-center h-[400px] overflow-hidden">
            <Detail_slider productImage={productData?.images}></Detail_slider>
          </div>

          {/* Product Information */}
          <div>
            <h2 className={`text-2xl font-semibold mb-4  ${theme == "light" ? "text-gray-800" : "text-gray-200"}`}>
              Product Name : {productData?.product_name}
            </h2>
            <p className="text-lg mb-4 text-paragraph">
              {productData?.description}
            </p>

            <div className="mb-4">
              <span className={`font-bold  ${theme == "light" ? "text-gray-800" : "text-gray-200"}`}>Category: </span>
              <span className="text-paragraph">
                {productData?.category_name}
              </span>
            </div>

            <div className="mb-4">
              <span className={`font-bold  ${theme == "light" ? "text-gray-800" : "text-gray-200"}`}>Reguler Price: </span>
              <span className="text-paragraph">
                ${productData?.reguler_price}
              </span>
            </div>
            <div className="mb-4">
              <span className={`font-bold  ${theme == "light" ? "text-gray-800" : "text-gray-200"}`}>Sale Price: </span>
              <span className="text-paragraph">${productData?.sale_price}</span>
            </div>
            <div className="mb-4">
              <span className={`font-bold  ${theme == "light" ? "text-gray-800" : "text-gray-200"}`}>Quantity: </span>
              <span className="text-paragraph">
                {productData?.quantity_in_stock}
              </span>
            </div>

            <div className="mb-4">
              <span className={`font-bold  ${theme == "light" ? "text-gray-800" : "text-gray-200"}`}>Stock: </span>
              <span className="text-paragraph">{productData?.stock_status}</span>
            </div>

            <div className="mb-4">
              <span className={`font-bold  ${theme == "light" ? "text-gray-800" : "text-gray-200"}`}>Brand: </span>
              <span className="text-paragraph">{productData?.brand_name}</span>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 mt-6 *:rounded-full *:duration-500   *:py-[6px] *:border *:flex-1 *:text-center">
              <Link
                className="border-blue text-blue hover:bg-blue  hover:text-white"
                to={`/dashboard/update-product/${id}`}
              >
                <button>Edit</button>
              </Link>
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
