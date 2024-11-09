import { GiSelfLove } from "react-icons/gi";
import { useParams } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import Detail_slider from "../dashboard/adminPages/product/product_details/Detail_slider";

const Product_details = () => {

const {id} = useParams()

console.log(id)
  const [products] = useProducts();
  const productData = products[0];
  return (
    <div className="p-4">
      <div className="container mx-auto bg-white p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Product Details
        </h1>
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
            {/* details button */}
            <div className="flex gap-4 *:rounded-md mt-4  *:py-2">
              <button className="bg-white w-[100px] border border-darkBlue flex justify-center items-center text-xl hover:bg-darkBlue duration-500 hover:text-white">
                <GiSelfLove></GiSelfLove>
              </button>
              <button className="border w-[170px] border-darkBlue bg-white text-darkBlue hover:bg-darkBlue duration-500 hover:text-white">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_details;
