import React from "react";
import { useForm } from "react-hook-form";
import { BiImage } from "react-icons/bi";
const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    const product_name = data.product_name;
    const price = data.price;
    const brand = data.brand;
    const category = data.category_name;
    const photo_url = data.photo_url;
    const description = data.description;

    // const axiosFetch = useAxios()
    const productData = {
      product_name,
      price,
      brand,
      category,
      photo_url,
      description,
    };
  };
  return (
    <main className="mt-16">
      <div className="py-3">
        <h1 className="text-3xl font-bold poppins">Create Product</h1>
      </div>
      <form className="bg-white box-shadow p-4 ">
        <div className="*:mt-4">
          <div>
            <label className="block mb-1 text-xs poppins font-bold text-paragraph">
              Product Name
            </label>
            <input
              {...register("product_name", { required: true })}
              type="text"
              name="product_name"
              placeholder="Enter product name"
              className="w-full px-3 py-2 border   focus:outline-none"
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
                type="text"
                name="reguler_price"
                placeholder="reguler price"
                className="w-full px-3 py-2 border  focus:outline-none"
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
                type="text"
                name="sale_price"
                placeholder="sale price"
                className="w-full px-3 py-2 border  focus:outline-none"
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
                className="py-2 border px-2  w-full  focus:outline-none"
              >
                <option disabled selected>
                  Choose Category
                </option>
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
                className="w-full px-3 py-2 border  focus:outline-none"
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
              <select  {...register("stock_status", { required: true })} className="py-2 border px-2  w-full  focus:outline-none">
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
                type="text"
                name="quantity_in_stock"
                placeholder="quantity stock"
                className="w-full px-3 py-2 border  focus:outline-none"
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
              className="w-full h-[150px] resize-none px-3 py-2 border focus:outline-none"
            />
            {errors.description && (
              <p className="text-red-500">Invalid Your Description</p>
            )}
          </div>
          {/* images */}
          <div>
            <label className="block mb-1 text-xs poppins font-bold text-paragraph">
              Product Image
            </label>
            <div className="grid grid-cols-4 gap-2">
              <div class="border border-blue border-dashed p-2 text-center flex justify-center items-center">
                <label
                  for="fileUpload"
                  class="cursor-pointer text-green poppins text-sm"
                >
                  <BiImage className="mx-auto" size={20}></BiImage>
                  Browse img
                </label>
                <input type="file" id="fileUpload" class="hidden" />
              </div>
              <div class="border border-blue border-dashed p-2 text-center flex justify-center items-center">
                <label
                  for="fileUpload"
                  class="cursor-pointer text-green poppins text-sm"
                >
                  <BiImage className="mx-auto" size={20}></BiImage>
                  Browse img
                </label>
                <input type="file" id="fileUpload" class="hidden" />
              </div>
              <div class="border border-blue border-dashed p-2 text-center flex justify-center items-center">
                <label
                  for="fileUpload"
                  class="cursor-pointer text-green poppins text-sm"
                >
                  <BiImage className="mx-auto" size={20}></BiImage>
                  Browse img
                </label>
                <input type="file" id="fileUpload" class="hidden" />
              </div>
              <div class="border border-blue border-dashed p-2 text-center flex justify-center items-center">
                <label
                  for="fileUpload"
                  class="cursor-pointer text-green poppins text-sm"
                >
                  <BiImage className="mx-auto" size={20}></BiImage>
                  Browse img
                </label>
                <input type="file" id="fileUpload" class="hidden" />
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
