import React from "react";
import { CiSearch } from "react-icons/ci";
import ProductCard from "../../components/ProductCard";
import useProducts from "../../hooks/useProducts";
import Banner from "./Banner";

const Product = () => {
  const [products] = useProducts();

  return (
    <main className="max-w-7xl mx-auto px-2 xl:px-0">
      <section className="mt-6">
        <Banner></Banner>
      </section>
      <section className="py-12">
        {/* <h1 className="text-center font-bold poppins text-green text-3xl py-6">
          Our Products
        </h1> */}

        <div className="flex justify-between items-center">
          <div className="hidden sm:flex items-center border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="search"
              className="px-3 focus:outline-none"
            />
            <button className="bg-green px-3 py-3 border-none text-white hover:bg-black duration-500">
              <CiSearch></CiSearch>
            </button>
          </div>
          <div className="flex gap-2 items-center">
            <select
              // onChange={showProductPerPage}
              name="category"
              className="p-2 rounded-md max-w-xs focus:outline-none border cursor-pointer"
            >
              <option disabled selected>
                Show Orders
              </option>
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>30</option>
              <option>50</option>
            </select>
            <select
              // onChange={filterOrders}
              name="category"
              className="p-2 rounded-md  max-w-xs focus:outline-none border cursor-pointer"
            >
              <option disabled selected>
                filter by
              </option>
              <option>canceled</option>
              <option>complated</option>
              <option>progress</option>
              <option>refund</option>
              <option>unpaid</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <div className="w-[20%]">
            <h1 className="text-2xl font-semibold">Filter by categories</h1>
            <div className="space-y-2 mt-4 *:cursor-pointer *:font-semibold">
              {["watch", "headphone", "phone", "tv", "laptop", "monitor"].map(
                (item, id) => (
                  <p key={id}>
                    <span className="hover:text-green hover:underline duration-500 text-paragraph">
                      {item}
                    </span>
                  </p>
                )
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-[80%]">
            {products?.slice(0,8).map((item, id) => (
              <ProductCard key={id} item={item}></ProductCard>
            ))}
          </div>
        </div>
        {/* <nav
          aria-label="Pagination"
          className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-100 dark:text-gray-800 mt-10"
        >
          <button
            type="button"
            className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-300"
          >
            <span className="sr-only">Previous</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          {[1, 2, 4, 5, 6].map((item, id) => {
            return (
              <button
                key={id}
                type="button"
                aria-current="page"
                className="inline-flex items-center px-4 py-2 text-sm font-semibold border text-black  dark:border-gray-300"
              >
                {id + 1}
              </button>
            );
          })}

          <button
            type="button"
            className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-300"
          >
            <span className="sr-only">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </nav> */}
      </section>
    </main>
  );
};

export default Product;
