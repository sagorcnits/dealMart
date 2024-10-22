import axios from "axios";
import React, { useEffect, useState } from "react";
import { BiImage } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../../../../hooks/useAxios";

const Product_update = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    product_name: "",
    brand_name: "",
    reguler_price: "",
    sale_price: "",
    category_name: "",
    quantity_in_stock: "",
    stock_status: "",
    description: "",
  });
  const axiosFetch = useAxios();
  const [images, setImages] = useState([]);

  useEffect(() => {
    axiosFetch
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setImages(res.data.images);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // input change

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    const form = e.target;
    const product_name = form.product_name.value;
    const brand_name = form.brand_name.value;
    const reguler_price = form.reguler_price.value;
    const sale_price = form.sale_price.value;
    const category_name = form.category_name.value;
    const quantity_in_stock = form.quantity_in_stock.value;
    const stock_status = form.stock_status.value;
    const description = form.description.value;

    

    if (
      product_name == " " ||
      brand_name == " " ||
      reguler_price == " " ||
      sale_price == " " ||
      category_name == " " ||
      quantity_in_stock == " " ||
      stock_status == " " ||
      description == " "
    ) {
      return Swal.fire({
        icon: "error",
        title: "Please Provide Valid Input",
        text: "Something went wrong!",
      });
    }

    if (!images.length > 2) {
      return Swal.fire({
        icon: "error",
        title: "Please Provide at least two image",
        text: "Something went wrong!",
      });
    }

    axiosFetch
      .put(`/products/${id}`, { ...product, images: images })
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Your Product Update has been Success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(productData);
  };
  // images upload method in cloundinary

  const handleFileChange = (event) => {
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

  return (
    <main className="mt-16">
      <div className="py-3">
        <h1 className="text-3xl font-bold poppins">Create Product</h1>
      </div>
      <form onSubmit={submit} className="bg-white box-shadow p-4 ">
        <div className="*:mt-4">
          <div>
            <label className="block mb-1 text-xs poppins font-bold text-paragraph">
              Product Name
            </label>
            <input
              type="text"
              value={product?.product_name}
              onChange={handleChange}
              name="product_name"
              placeholder="Enter product name"
              className="w-full px-3 py-2 border   focus:outline-none"
            />
          </div>
          {/* price */}
          <div className="flex gap-2 items-center *:flex-1">
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                reguler price
              </label>
              <input
                type="text"
                value={product?.reguler_price}
                onChange={handleChange}
                name="reguler_price"
                placeholder="reguler price"
                className="w-full px-3 py-2 border  focus:outline-none"
              />
            </div>
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                sale price
              </label>
              <input
                type="text"
                value={product?.sale_price}
                onChange={handleChange}
                name="sale_price"
                placeholder="sale price"
                className="w-full px-3 py-2 border  focus:outline-none"
              />
            </div>
          </div>
          {/* category and brand */}
          <div className="flex gap-2 items-center *:flex-1">
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                Category Name
              </label>
              <select
                name="category_name"
                value={product?.category_name}
                className="py-2 border px-2  w-full  focus:outline-none"
              >
                <option>watch</option>
                <option>phone</option>
                <option>headphone</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                brand name
              </label>
              <input
                type="text"
                value={product?.brand_name}
                onChange={handleChange}
                name="brand_name"
                placeholder="brand name"
                className="w-full px-3 py-2 border  focus:outline-none"
              />
            </div>
          </div>
          {/* stock and quantity*/}
          <div className="flex gap-2 items-center *:flex-1">
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                Stock Status
              </label>
              <select
              name="stock_status"
                value={product?.stock_status}
                onChange={handleChange}
                className="py-2 border px-2  w-full  focus:outline-none"
              >
                <option>In Stock</option>
                <option>Out Of Stock</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-xs poppins font-bold text-paragraph">
                Quantity in Stck
              </label>
              <input
                onChange={handleChange}
                type="text"
                value={product?.quantity_in_stock}
                name="quantity_in_stock"
                placeholder="quantity stock"
                className="w-full px-3 py-2 border  focus:outline-none"
              />
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
              onChange={handleChange}
              type="text"
              value={product?.description}
              name="description"
              placeholder="product description"
              className="w-full h-[150px] resize-none px-3 py-2 border focus:outline-none"
            />
          </div>
          {/* images */}
          <div>
            <label className="block mb-1 text-xs poppins font-bold text-paragraph">
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

export default Product_update;
