import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiImage } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import useAxios from "../../../../../hooks/useAxios";
const CreateProduct = () => {
  const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const axiosFetch = useAxios();

  const submit = (data) => {
    const product_name = data.product_name;
    const brand_name = data.brand;
    const reguler_price = parseInt(data.reguler_price);
    const sale_price = parseInt(data.sale_price);
    const category_name = data.category_name;
    const quantity_in_stock = data.quantity_in_stock;
    const stock_status = data.stock_status;
    const description = data.description;

    const productData = {
      product_name,
      brand_name,
      reguler_price,
      sale_price,
      category_name,
      quantity_in_stock,
      stock_status,
      description,
      images: images,
    };

    if (images.length < 2) {
      return Swal.fire({
        icon: "error",
        title: "Please Provide at least two image",
        text: "Something went wrong!",
      });
    }

    axiosFetch
      .post("/products", productData)
      .then((res) => {
        if (res.data._id) {
          Swal.fire({
            icon: "success",
            title: "Your Product add has been Success",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          setImages([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(productData);
  };
  // images upload method in cloundinary
  const handleFileChange = (event) => {
    console.log("ok");

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "dealMart");
    formData.append("api_key", "941311292871449");

    axios
      .post("https://api.cloudinary.com/v1_1/dqsqzp3an/image/upload", formData)
      .then((response) => {
        if (response.data.asset_id) {
          setImages((prev) => [...prev, response.data.secure_url]);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //  delete images
  const removeProductImage = (imgLength) => {
    const removeImages = images.filter((item, id) => id !== imgLength);
    setImages(removeImages);
  };


  // dark mode
  const theme = useSelector((state) => state.darkMode);

  return (
    <main className="mt-16">
      <div className="py-3">
        <h1 className={`text-3xl font-bold poppins  ${theme == "light" ? "" : "text-gray-200"}`}>Create Product</h1>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        className={` box-shadow p-4 ${theme == "light" ? "bg-white" : "bg-black"}`}
      >
        <div className="*:mt-4 ">
          <div>
            <label className={`block mb-1 text-xs poppins font-bold text-paragraph`}>
              Product Name
            </label>
            <input
              {...register("product_name", { required: true })}
              type="text"
              name="product_name"
              placeholder="Enter product name"
              className={`w-full px-3 py-2 border   focus:outline-none ${theme == "light" ? "bg-white" : "bg-black"}`}
            />
            {errors.product_name && (
              <p className="text-red-500">Invalid Your Product Name</p>
            )}
          </div>
          {/* price */}
          <div className="flex gap-2 items-center *:flex-1">
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                reguler price
              </label>
              <input
                {...register("reguler_price", { required: true })}
                type="number"
                name="reguler_price"
                placeholder="reguler price"
                className={`w-full px-3 py-2 border   focus:outline-none ${theme == "light" ? "bg-white" : "bg-black"}`}
              />
              {errors.reguler_price && (
                <p className="text-red-500">Invalid Your reguler price</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                sale price
              </label>
              <input
                {...register("sale_price", { required: true })}
                type="number"
                name="sale_price"
                placeholder="sale price"
                className={`w-full px-3 py-2 border   focus:outline-none ${theme == "light" ? "bg-white" : "bg-black"}`}
              />
              {errors.sale_price && (
                <p className="text-red-500">Invalid Your sale price</p>
              )}
            </div>
          </div>
          {/* category and brand */}
          <div className="flex gap-2 items-center *:flex-1">
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                Category Name
              </label>
              <select
                {...register("category_name", { required: true })}
                className={`w-full px-3 py-2 border   focus:outline-none ${theme == "light" ? "bg-white" : "bg-black"}`}
              >
                <option>watch</option>
                <option>phone</option>
                <option>headphone</option>
              </select>
              {errors.category_name && (
                <p className="text-red-500">Invalid Your category Name</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                brand name
              </label>
              <input
                {...register("brand", { required: true })}
                type="text"
                name="brand"
                placeholder="brand name"
                className={`w-full px-3 py-2 border   focus:outline-none ${theme == "light" ? "bg-white" : "bg-black"}`}
              />
              {errors.brand && (
                <p className="text-red-500">Invalid Your brand</p>
              )}
            </div>
          </div>
          {/* stock and quantity*/}
          <div className="flex gap-2 items-center *:flex-1">
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                Stock Status
              </label>
              <select
                {...register("stock_status", { required: true })}
                className={`w-full px-3 py-2 border   focus:outline-none ${theme == "light" ? "bg-white" : "bg-black"}`}
              >
                <option>In Stock</option>
                <option>Out Of Stock</option>
              </select>
              {errors.stock_status && (
                <p className="text-red-500">Invalid Your stock status</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                Quantity in Stck
              </label>
              <input
                {...register("quantity_in_stock", { required: true })}
                type="number"
                name="quantity_in_stock"
                placeholder="quantity stock"
                className={`w-full px-3 py-2 border   focus:outline-none ${theme == "light" ? "bg-white" : "bg-black"}`}
              />
              {errors.quantity_in_stock && (
                <p className="text-red-500">Invalid Your quantity in stock</p>
              )}
            </div>
          </div>
          {/* description */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                Description
              </label>
            </div>
            <textarea
              {...register("description", { required: true })}
              type="text"
              name="description"
              placeholder="product description"
              className={`w-full h-[150px] resize-none px-3 py-2 border focus:outline-none ${theme == "light" ? "bg-white" : "bg-black"}`}
            />
            {errors.description && (
              <p className="text-red-500">Invalid Your Description</p>
            )}
          </div>
          {/* images */}
          <div>
            <label className={`block mb-1 text-xs poppins font-bold text-paragraph ${theme == "light" ? "bg-white" : "bg-black"}`}>
              Product Image
            </label>
            <div className="grid grid-cols-4 gap-2 *:border *:border-blue *:border-dashed *:p-2 *:text-center *:flex *:justify-center *:items-center  *:h-[200px] *:overflow-hidden *:relative">
              <div>
                {images.length == 0 ? (
                  <>
                    <label
                      htmlFor="fileUpload"
                      className="cursor-pointer text-green poppins text-sm"
                    >
                      <BiImage className="mx-auto" size={20}></BiImage>
                      Browse img
                    </label>
                    <input
                      onChange={handleFileChange}
                      type="file"
                      id="fileUpload"
                      className="hidden"
                    />
                  </>
                ) : (
                  <>
                    <img
                      className="w-full h-full object-cover"
                      src={images[0]}
                      alt="img1"
                    />
                    <div
                      onClick={() => removeProductImage(0)}
                      className="absolute top-2 right-2 size-6 rounded-full bg-red-500 text-white hover:bg-blue duration-500 cursor-pointer flex justify-center items-center"
                    >
                      <IoCloseSharp></IoCloseSharp>
                    </div>
                  </>
                )}
              </div>
              <div>
                {images.length == 1 || images.length == 0 ? (
                  <>
                    <label
                      htmlFor="fileUpload2"
                      className="cursor-pointer text-green poppins text-sm"
                    >
                      <BiImage className="mx-auto" size={20}></BiImage>
                      Browse img
                    </label>
                    <input
                      onChange={handleFileChange}
                      type="file"
                      id="fileUpload2"
                      className="hidden"
                    />{" "}
                  </>
                ) : (
                  <>
                    <img
                      className="w-full h-full object-cover"
                      src={images[1]}
                      alt="img2"
                    />
                    <div
                      onClick={() => removeProductImage(1)}
                      className="absolute top-2 right-2 size-6 rounded-full bg-red-500 text-white hover:bg-blue duration-500 cursor-pointer flex justify-center items-center"
                    >
                      <IoCloseSharp></IoCloseSharp>
                    </div>
                  </>
                )}
              </div>
              <div>
                {images.length == 0 ||
                images.length == 1 ||
                images.length == 2 ? (
                  <>
                    <label
                      htmlFor="fileUpload3"
                      className="cursor-pointer text-green poppins text-sm"
                    >
                      <BiImage className="mx-auto" size={20}></BiImage>
                      Browse img
                    </label>
                    <input
                      onChange={handleFileChange}
                      type="file"
                      id="fileUpload3"
                      className="hidden"
                    />
                  </>
                ) : (
                  <>
                    <img
                      className="w-full h-full object-cover"
                      src={images[2]}
                      alt="img2"
                    />
                    <div
                      onClick={() => removeProductImage(2)}
                      className="absolute top-2 right-2 size-6 rounded-full bg-red-500 text-white hover:bg-blue duration-500 cursor-pointer flex justify-center items-center"
                    >
                      <IoCloseSharp></IoCloseSharp>
                    </div>
                  </>
                )}
              </div>
              <div>
                {images.length == 0 ||
                images.length == 1 ||
                images.length == 2 ||
                images.length == 3 ? (
                  <>
                    <label
                      htmlFor="fileUpload4"
                      className="cursor-pointer text-green poppins text-sm"
                    >
                      <BiImage className="mx-auto" size={20}></BiImage>
                      Browse img
                    </label>
                    <input
                      onChange={handleFileChange}
                      type="file"
                      id="fileUpload4"
                      className="hidden"
                    />
                  </>
                ) : (
                  <>
                    <img
                      className="w-full h-full object-cover"
                      src={images[3]}
                      alt="img3"
                    />
                    <div
                      onClick={() => removeProductImage(3)}
                      className="absolute top-2 right-2 size-6 rounded-full bg-red-500 text-white hover:bg-blue duration-500 cursor-pointer flex justify-center items-center"
                    >
                      <IoCloseSharp></IoCloseSharp>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="w-full poppins px-8 py-3 font-semibold rounded-md bg-darkBlue hover:bg-black duration-500 text-white"
          >
            Add Product
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateProduct;
