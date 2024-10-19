import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

  console.log(productData);

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Product Details</h1>
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="flex justify-center h-[400px] overflow-hidden">
            {/* <img
              className="w-full h-full object-cover rounded-lg shadow-lg"
              src="https://img.freepik.com/free-photo/smartphone-nature-concept_23-2150246099.jpg?t=st=1728749055~exp=1728752655~hmac=f6f658e2da13e201791ea049c11aff47c71d6466a3a7cde125c1ab05fda62f35&w=360"
              alt="Product"
            /> */}

            <Detail_slider  productImage={productData.images}></Detail_slider>
          </div>

          {/* Product Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Product Name : IPhone
            </h2>
            <p className="text-lg mb-4 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Pellentesque et eros auctor, luctus erat a, tincidunt elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque et
              eros auctor, luctus erat a, tincidunt elit.
            </p>

            <div className="mb-4">
              <span className="font-bold text-gray-800">Category: </span>
              <span className="text-gray-600">Electronics</span>
            </div>

            <div className="mb-4">
              <span className="font-bold text-gray-800">Price: </span>
              <span className="text-gray-600">$499.99</span>
            </div>

            <div className="mb-4">
              <span className="font-bold text-gray-800">Stock: </span>
              <span className="text-gray-600">In Stock</span>
            </div>

            <div className="mb-4">
              <span className="font-bold text-gray-800">Brand: </span>
              <span className="text-gray-600">Apple</span>
            </div>

            {/* Actions */}
            <div className="flex space-x-4 mt-6 *:rounded-full *:duration-500   *:py-[6px] *:border *:flex-1 *:text-center">
              <button className="border-blue text-blue hover:bg-blue  hover:text-white">
                Edit
              </button>
              <button className="border-customRed hover:bg-customRed  hover:text-white">
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Additional Information
          </h3>
          <p className="text-gray-600 mb-2">- Manufacturer: XYZ Company</p>
          <p className="text-gray-600 mb-2">- Warranty: 2 Years</p>
          <p className="text-gray-600 mb-2">- Weight: 1.5kg</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
