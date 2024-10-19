import React from "react";
import ProductCard from "../../components/ProductCard";
import useProducts from "../../hooks/useProducts";
import Banner from "./Banner";

const Product = () => {

const products = useProducts()


  return (
    <main className="max-w-7xl mx-auto px-2 xl:px-0">
      <section className="mt-6">
        <Banner></Banner>
      </section>
      <section className="py-12">
        <h1 className=" font-bold poppins text-green text-2xl py-6">
          Choose Your Product
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((item, id) => (
            <ProductCard key={id} item={item}></ProductCard>
          ))}
        </div>
        <nav
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
              <button key={id}
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
        </nav>
      </section>
    </main>
  );
};

export default Product;
