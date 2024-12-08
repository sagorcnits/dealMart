import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";

const Review = () => {
  const user = useSelector((state) => state.user.user);
  const [reviewsData, setReviewsdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosFetch = useAxios();
  // fetch reviews data from server 
  useEffect(() => {
    if (user?.email) {
      axiosFetch
        .get(`/reviews?email=${user?.email}`)
        .then((res) => {
          if (res.data.message == "ok") {
            setReviewsdata(res.data.data);
            setLoading(false);
          }
        })
        .catch((err) => console.error(err.message));
    }
  }, [user]);

  // const products = [
  //   {
  //     name: "sagor Hossain",
  //     rating: 4,
  //     review: "This is a nice product. I really like it.",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     name: "sagor Hossain",
  //     rating: 4,
  //     review: "This is a nice product. I really like it.",
  //     image: "https://via.placeholder.com/150",
  //   },
  //   {
  //     name: "sagor Hossain",
  //     rating: 4,
  //     review: "This is a nice product. I really like it.",
  //     image: "https://via.placeholder.com/150",
  //   },
  // ];

  // loading
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-semibold">Your all reviews</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 *:box-shadow pt-2">
        {reviewsData?.map((item, id) => (
          <ReviewCard key={id} item={item}></ReviewCard>
        ))}
      </div>
    </div>
  );
};

export default Review;
// review card
const ReviewCard = ({ item }) => {
  const { name, rating, review, image, product_id } = item;
  return (
    <div className="p-4 rounded-lg">
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
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-500">
          <button className="mr-2 flex items-center">
            ❤️ <span className="ml-1">10</span>
          </button>
          <button className="flex items-center">
            👎 <span className="ml-1">1</span>
          </button>
        </div>
        <Link to={`/product/details/${product_id}`}>
          <button className="font-bold underline text-customRed">
            See Details
          </button>
        </Link>
      </div>
    </div>
  );
};
