import React from "react";
import { Link } from "react-router-dom";

const Review = () => {
  // const [products] = useProducts();
const products = [
  {
    name: "sagor Hossain",
    rating: 4,
    review: "This is a nice product. I really like it.",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "sagor Hossain",
    rating: 4,
    review: "This is a nice product. I really like it.",
    image: "https://via.placeholder.com/150"
  },
  {
    name: "sagor Hossain",
    rating: 4,
    review: "This is a nice product. I really like it.",
    image: "https://via.placeholder.com/150"
  },
]
  return (
   <div>
    <h1 className="py-3 text-xl font-semibold">Your all reviews</h1>
     <div className="grid grid-cols-3 gap-3 *:box-shadow">
      {products?.slice(0, 6).map((item, id) => (
        <ReviewCard key={id} item={item}></ReviewCard>
      ))}
    </div>
   </div>
  );
};

export default Review;
// review card
const ReviewCard = ({item}) => {

  const { name, rating, review, image } = item;
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
     <div className="flex justify-between items-center">
     <div className="flex items-center text-gray-500">
        <button className="mr-2 flex items-center">
          ❤️ <span className="ml-1">10</span>
        </button>
        <button className="flex items-center">
          👎 <span className="ml-1">1</span>
        </button>
      </div>
      <Link><button className="font-bold underline text-customRed">See Details</button></Link>
     </div>
    </div>
  );
};

