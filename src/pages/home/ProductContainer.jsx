import { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import ProductCard from "../../components/ProductCard";
import useProducts from "../../hooks/useProducts";

const ProductContainer = () => {
  const trendingRef = useRef(null);
  const [prevScroll, setPrevScroll] = useState(false);
  const [products] = useProducts()
  // next scroll product
  const nextProduct = () => {
    trendingRef.current.scrollLeft += 700;
    setPrevScroll(true);
  };
// previous scroll product
  const prevProduct = () => {
    trendingRef.current.scrollLeft -= 700;
    console.log(trendingRef.current.scrollLeft);
    if (trendingRef.current.scrollLeft <= 700) {
      setPrevScroll(false);
      console.log(trendingRef.current.scrollLeft);
    }
  };

  return (
    <div className="relative">
      <div
        className={`w-full px-2 flex ${
          prevScroll ? "justify-between" : "justify-end"
        } absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 *:size-12 *:rounded-full *:bg-green *:text-white *:justify-center *:items-center *:text-xl *:duration-500`}
      >
        <button
          onClick={prevProduct}
          className={prevScroll ? "flex hover:bg-black" : "hidden"}
        >
          <IoIosArrowBack></IoIosArrowBack>
        </button>
        <button onClick={nextProduct} className="hover:bg-black flex ">
          <IoIosArrowForward></IoIosArrowForward>
        </button>
      </div>
      <div ref={trendingRef} className="overflow-auto w-full scrollbar-none">
        <div className="grid grid-cols-8 gap-6 mt-10 overflow-auto w-[2600px] ">
          {products?.map((item, id) => (
            <ProductCard key={id} item={item}></ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductContainer;
