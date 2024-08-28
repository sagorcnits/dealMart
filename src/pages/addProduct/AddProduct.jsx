import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { productFetch } from "../../features/products/productSlice";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const submit = (data) => {
    const product_name = data.product_name;
    const price = data.price;
    const brand = data.brand;
    const category = data.category;
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
    dispatch(productFetch(productData));
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="flex flex-col w-full md:w-[480px]  rounded-md p-2 md:px-6 md:py-4 bg-[#ebe8e8]">
        <div className=" text-center">
          <h1 className="text-3xl font-bold poppins">Create Product</h1>
        </div>
        <form className="mt-3" onSubmit={handleSubmit(submit)}>
          <div className="*:mt-2">
            <div className="flex gap-2 items-center *:flex-1">
              <div>
                <label className="block mb-1 text-sm poppins">
                  Product Name
                </label>
                <input
                  {...register("product_name", { required: true })}
                  type="text"
                  name="product_name"
                  placeholder="product name"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                />
                {errors.product_name && (
                  <p className="text-red-500">Invalid Your Product Name</p>
                )}
              </div>
              <div>
                <label className="block mb-1 text-sm poppins">
                  Product Price
                </label>
                <input
                  {...register("price", { required: true })}
                  type="number"
                  name="price"
                  placeholder="price"
                  className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                />
                {errors.price && (
                  <p className="text-red-500">Invalid Your price</p>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm poppins">Photo URL</label>
              <input
                {...register("photo_url", { required: true })}
                type="text"
                name="photo_url"
                placeholder="Photo URL"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
              {errors.photo_url && (
                <p className="text-red-500">Invalid Your photo URL</p>
              )}
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm poppins">Description</label>
              </div>
              <textarea
                {...register("description", { required: true })}
                type="text"
                name="description"
                placeholder="product description"
                className="w-full h-[120px] resize-none px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
              />
              {errors.description && (
                <p className="text-red-500">Invalid Your Description</p>
              )}
            </div>
          </div>
          <div className="mt-2">
            <button
              type="submit"
              className="w-full poppins px-8 py-3 font-semibold rounded-md bg-darkBlue hover:bg-black duration-500 text-white"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
