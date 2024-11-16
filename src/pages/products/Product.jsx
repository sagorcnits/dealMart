import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdDoubleArrow } from "react-icons/md";
import ProductCard from "../../components/ProductCard";
import useProducts from "../../hooks/useProducts";
import Banner from "./Banner";

const Product = () => {
  const [products] = useProducts();

  // pagination
  const [itemPerPage, setItemPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const numberPages = Math.ceil(40 / itemPerPage);
  const totalbtn = [...Array(numberPages).keys()];

  // setitem par page
  const showProductPerPage = (e) => {
    setItemPerPage(e.target.value);
  };

  //  pagination next btn
  const nextbtn = () => {
    if (currentPage < totalbtn.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  // previous button
  const prevBtn = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <main className="max-w-7xl mx-auto px-2 xl:px-0">
      <section className="mt-6">
        <Banner></Banner>
      </section>
      <section className="py-12">
        {/* <h1 className="text-center font-bold poppins text-green text-3xl py-6">
          Our Products
        </h1> */}

        <section className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-green">Our Products</h1>
          <fieldset className="space-y-1 w-[300px]">
            <div className="flex">
              <input
                type="text"
                name="price"
                id="price"
                placeholder="search products"
                className="flex flex-1 focus:outline-none py-2 border sm:text-sm rounded-l-md pl-2"
              />
              <span className="flex items-center px-3  sm:text-sm  rounded-r-md bg-green hover:bg-black duration-500 text-white cursor-pointer">
                <CiSearch></CiSearch>
              </span>
            </div>
          </fieldset>
        </section>

        <section className="flex gap-4 mt-10">
          <div className="w-[20%]">
            <div className="flex gap-2 items-center *:text-sm">
              <select
                onChange={showProductPerPage}
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
            <Filter_by_category></Filter_by_category>
            <TopProduct products={products}></TopProduct>
          </div>
          <div className="w-[80%]">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
              {products?.slice(0, 12).map((item, id) => (
                <ProductCard key={id} item={item}></ProductCard>
              ))}
            </div>
            {/* pagination container */}
            <div className="flex justify-end">
              <div className="mt-6 flex gap-3 items-center *:size-10 *:box-shadow *:flex *:justify-center *:items-center *:rounded-full *:duration-500">
                <button
                  onClick={prevBtn}
                  className=" hover:bg-blue hover:text-white"
                >
                  <MdDoubleArrow className="rotate-180"></MdDoubleArrow>
                </button>
                {totalbtn?.slice(0, 7).map((item, id) => {
                  return (
                    <button
                      onClick={() => setCurrentPage(id + 1)}
                      className={`hover:bg-blue hover:text-white ${
                        currentPage == id + 1 && "bg-blue text-white"
                      }`}
                      key={id}
                    >
                      {id + 1}
                    </button>
                  );
                })}
                <button
                  onClick={nextbtn}
                  className="hover:bg-blue hover:text-white"
                >
                  <MdDoubleArrow></MdDoubleArrow>
                </button>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Product;

// filter by categories
const Filter_by_category = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mt-4">Filter by categories</h1>
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
  );
};
// top rated product card
const TopProduct = ({ products }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold mt-4">Top 5 Products</h1>
      <div className="space-y-6 mt-4 *:cursor-pointer *:font-semibold *:flex *:gap-3 *:box-shadow *:rounded-md *:p-2">
        {products?.slice(0, 5).map((item, id) => {
          const {
            _id,
            product_name,
            reguler_price,
            sale_price,
            brand_name,
            category_name,
            images,
            description,
            quantity_in_stock,
            stock_status,
          } = item;
          return (
            <div key={id}>
              <figure className="w-[30%]">
                <img className="h-full w-full" src={images[0]} alt="img" />
              </figure>
              <div className="w-[70%]">
                <h3>{product_name}</h3>
                <p className="text-sm text-paragraph">{description.slice(0,30)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
