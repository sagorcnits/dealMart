import { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { GiSelfLove } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { addToCart } from "../../features/cartItem/cartSlice";
import useAxios from "../../hooks/useAxios";
import Detail_slider from "../dashboard/adminPages/product/product_details/Detail_slider";
const Product_details = () => {
  const axiosFetch = useAxios();
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  // get product data from server
  useEffect(() => {
    axiosFetch
      .get(`/products/${id}`)
      .then((res) => {
        if (res.data.message == "ok") {
          setProductData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // add to cart product information
  const addToCartProduct = {
    _id: productData?._id,
    product_name: productData?.product_name,
    reguler_price: productData?.reguler_price,
    sale_price: productData?.sale_price,
    images: productData?.images,
    totalAmount: productData?.sale_price,
    quantity: 1,
  };

  const disptach = useDispatch();

  const category = productData?.category_name;

  return (
    <div className="p-4">
      <div className="container mx-auto bg-white lg:p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Product Details
        </h1>
        <div className="grid grid-cols-1  lg:grid-cols-2 gap-6 border-b pb-10">
          {/* Product Image */}
          <div className="flex justify-center xl:h-[500px] lg:h-[400px]">
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
              <button
                onClick={() => disptach(addToCart(addToCartProduct))}
                className="border w-[170px] border-darkBlue bg-white text-darkBlue hover:bg-darkBlue duration-500 hover:text-white"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto lg:px-8 mt-6 ">
        <CustomerReviews id={id}></CustomerReviews>
      </div>

      <div className="container mx-auto lg:px-8 mt-10">
        <h1 className="text-3xl font-poppins font-semibold pb-10">
          Related Products
        </h1>
        <Related_products category={category}></Related_products>
      </div>
    </div>
  );
};

export default Product_details;

// Individual Review Component
const Review = ({ name, rating, review, image }) => {
  return (
    <div className="p-4 rounded-lg mb-4">
      <div className="flex items-center mb-2">
        <img src={image} alt={name} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <h4 className="font-semibold">{name}</h4>
          <div className="flex">
            {[...Array(rating)].map((_, index) => (
              <span key={index} className="text-yellow-400">
                ★
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{review}</p>
      <div className="flex items-center text-gray-500">
        <button className="mr-2 flex items-center">
          ❤️ <span className="ml-1">10</span>
        </button>
        <button className="flex items-center">
          👎 <span className="ml-1">1</span>
        </button>
      </div>
    </div>
  );
};

// Main Customer Reviews Component
const CustomerReviews = ({ id }) => {
  const [reviewForm, setReviewForm] = useState(false);
  const [productReview, setProductReview] = useState([]);
  const [productStar, setProductStar] = useState(null);
  // product star rating function
  const productStarRating = () => {
    const starCounts = {
      fiveStar: 0,
      fourStar: 0,
      threeStar: 0,
      twoStar: 0,
      oneStar: 0,
    };

    productReview.forEach((item) => {
      if (item.rating === 5) {
        starCounts.fiveStar += 1;
      } else if (item.rating === 4) {
        starCounts.fourStar += 1;
      } else if (item.rating === 3) {
        starCounts.threeStar += 1;
      } else if (item.rating === 2) {
        starCounts.twoStar += 1;
      } else if (item.rating === 1) {
        starCounts.oneStar += 1;
      }
    });

    // Update state only once with the final counts
    setProductStar(starCounts);
  };

  const axiosFetch = useAxios();

  // get this product review from server
  useEffect(() => {
    axiosFetch
      .get(`/reviews/${id}`)
      .then((res) => {
        if (res.data.message == "ok") {
          setProductReview(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // rating filter
  useEffect(() => {
    try {
      productStarRating();
    } catch (err) {
      console.log(err.message);
    }
  }, [productReview]);

  // filtering by reviews rating



  const ratingArray = [
    {
      id: 5,
      rating: productStar?.fiveStar,
    },
    {
      id: 4,
      rating: productStar?.fourStar,
    },
    {
      id: 3,
      rating: productStar?.threeStar,
    },
    {
      id: 2,
      rating: productStar?.twoStar,
    },
    {
      id: 1,
      rating: productStar?.oneStar,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
        <div className="flex items-center mb-2">
          <div className="text-yellow-400 text-2xl mr-2">★★★★★</div>
          <span className="text-gray-600">{productReview?.length} reviews</span>
        </div>
        {ratingArray?.map((rating, id) => (
          <div key={id} className="flex items-center mb-1">
            <span className="w-4 text-gray-500">{rating?.id}</span>
            <div className="w-full h-2 bg-gray-200 mx-2 rounded">
              <div
                className={`h-2 bg-yellow-400 rounded`}
                style={{ width: `${rating?.id * 20}%` }}
              ></div>
            </div>
            <span className="text-gray-500">{rating?.rating}</span>
          </div>
        ))}
        <button
          onClick={() => setReviewForm(!reviewForm)}
          className="mt-4 px-4 py-2 bg-black hover:bg-green duration-500 font-semibold text-white rounded"
        >
          {reviewForm ? "Close a Review" : "Write A Review"}
        </button>
        {reviewForm && <RatingStar id={id}></RatingStar>}
      </div>


      <div className="md:w-2/3 grid grid-cols-2 gap-2 *:box-shadow">
        {productReview?.map((review, index) => (
          <Review key={index} {...review} />
        ))}
      </div>
    </div>
  );
};

// rating star
const RatingStar = ({ id }) => {
  const [starValue, setStarValue] = useState();
  const [hoverValue, setHoverValue] = useState(0);
  const user = useSelector((state) => state.user.user);

  const axiosFetch = useAxios();
  // handle review submit
  const handleReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const review = form.review.value;

    const reviewData = {
      product_id: id,
      name,
      email: user?.email || "randomuser",
      review,
      rating: starValue,
      image:
        user?.photoUrl ||
        "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
    };

    if (!name || !review || !starValue) {
      return alert("Please Rating complated");
    }

    //  review post of the server
    axiosFetch
      .post("/reviews", reviewData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="flex items-center gap-2 *:cursor-pointer *:text-[20px] justify-center mt-10">
        {new Array(5).fill(0).map((_, index) => {
          return (
            <span
              className={`${
                (hoverValue == 0 && index < starValue) || index < hoverValue
                  ? "text-yellow-500"
                  : ""
              }`}
              key={index}
              onClick={() => setStarValue(index + 1)}
              onMouseEnter={() => setHoverValue(index + 1)}
              onMouseLeave={() => setHoverValue(0)}
            >
              <FaRegStar></FaRegStar>
            </span>
          );
        })}
      </div>

      <form onSubmit={handleReview}>
        <div>
          <label className="font-bold">Name</label>
          <input
            type="text"
            placeholder="name"
            className="w-full border p-2 focus:outline-none"
            name="name"
          />
        </div>
        <div className="mt-2">
          <label className="font-bold">Review</label>
          <textarea
            type="text"
            placeholder="review"
            className="w-full h-[100px] resize-none border p-2 focus:outline-none"
            name="review"
          />
        </div>
        <button className="w-full mt-2 py-2 bg-darkBlue text-white hover:bg-black duration-500 rounded-md font-semibold">
          Submit Your Review
        </button>
      </form>
    </>
  );
};

// related Products
const Related_products = ({ category }) => {
  // console.log(category);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const axiosFetch = useAxios();
  // get related product by category_name
  useEffect(() => {
    axiosFetch
      .get(`/products?category=${category}`)
      .then((res) => {
        // console.log(res.data);
        setRelatedProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [category]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {relatedProducts?.slice(0, 8).map((item, id) => (
        <ProductCard key={id} item={item}></ProductCard>
      ))}
    </div>
  );
};
