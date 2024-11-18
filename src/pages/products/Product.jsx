import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdDoubleArrow } from "react-icons/md";
import { RiLayoutGrid2Fill } from "react-icons/ri";
import { TbLayoutGridFilled } from "react-icons/tb";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import ProductCard from "../../components/ProductCard";
import useAxios from "../../hooks/useAxios";
import useProducts from "../../hooks/useProducts";
import Banner from "./Banner";
const Product = () => {
  const [products] = useProducts();
  const [layout, setLayout] = useState(4);
  const [category, setCategory] = useState("all");
  const [sort, setSorted] = useState("all");
  const [search, setSearch] = useState("");
  // pagination
  const [itemPerPage, setItemPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const numberPages = Math.ceil(products?.length / itemPerPage);
  const totalbtn = [...Array(numberPages).keys()];
  const axiosFetch = useAxios();
  // get product form server

  const {
    data: productsData = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: [
      "productsPage",
      currentPage,
      itemPerPage,
      category,
      sort,
      search,
    ],
    queryFn: async () => {
      const res = await axiosFetch.get(
        `/products?page=${currentPage}&size=${itemPerPage}&category=${category}&sort=${sort}&search=${search}`
      );
      return res.data;
    },
  });

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

  // filter by category
  const filterProducts = (e) => {
    setCategory(e.target.value);
  };

  // filter by price
  const filterByPrice = (e) => {
    setSorted(e.target.value);
  };

  return (
    <main className="max-w-7xl mx-auto px-2 xl:px-0">
      <section className="mt-6">
        <Banner></Banner>
      </section>

      <section className="py-12">
        <h1 className="text-3xl font-bold text-green lg:hidden block text-center pb-5">
          Our Products
        </h1>

        <div className="flex justify-between items-center ">
          <h1 className="text-3xl font-bold text-green hidden lg:block w-[40%]">
            Our Products
          </h1>
          <div className="flex flex-col-reverse lg:flex-row gap-4 items-center justify-evenly overflow-hidden w-full lg:w-[60%]">
            <div className="flex *:w-1/2 gap-4 w-full">
              <select
                onChange={filterProducts}
                name="category"
                className="p-2 rounded-md focus:outline-none border cursor-pointer w-[100px]"
              >
                <option disabled selected>
                  Categories
                </option>
                {["watch", "headphone", "phone", "tv", "laptop", "monitor"].map(
                  (item, id) => {
                    return <option key={id}>{item}</option>;
                  }
                )}
              </select>
              <select
                onChange={filterByPrice}
                className="p-2 rounded-md focus:outline-none border cursor-pointer"
              >
                <option disabled selected>
                  sort by
                </option>
                <option>high to low price</option>
                <option>low to high price</option>
                <option>available</option>
              </select>
            </div>
            <div className="*:cursor-pointer lg:flex items-center gap-3 hidden">
              <TfiLayoutGrid4Alt
                onClick={() => setLayout(4)}
                className="hover:text-green duration-500 hidden xl:block"
                size={25}
              ></TfiLayoutGrid4Alt>
              <RiLayoutGrid2Fill
                onClick={() => setLayout(3)}
                className="hover:text-green duration-500"
                size={30}
              ></RiLayoutGrid2Fill>
              <TbLayoutGridFilled
                onClick={() => setLayout(2)}
                className="hover:text-green duration-500"
                size={30}
              ></TbLayoutGridFilled>
            </div>
            <fieldset className="space-y-1 w-full lg:w-[300px]">
              <div className="flex">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  name="price"
                  id="price"
                  value={search}
                  placeholder="search products"
                  className="flex flex-1 focus:outline-none py-2 border sm:text-sm rounded-l-md pl-2 w-"
                />
                <span className="flex items-center px-3  sm:text-sm  rounded-r-md bg-green hover:bg-black duration-500 text-white cursor-pointer">
                  <CiSearch></CiSearch>
                </span>
              </div>
            </fieldset>
          </div>
        </div>

        <div className="md:flex gap-4 mt-10">
          <div className="w-[20%] hidden lg:block">
            <Filter_by_category
              category={category}
              setCategory={setCategory}
            ></Filter_by_category>
            {/* <TopProduct products={products}></TopProduct> */}
          </div>
          {isPending && (
            <div className="w-16 h-16 mt-20 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
          )}
          {productsData?.length > 0 && (
            <div className="lg:w-[80%]">
              <div
                className={`grid md:grid-cols-2 lg:grid-cols-${layout} xl:grid-cols-${layout} gap-6 `}
              >
                {productsData?.slice(0, 12).map((item, id) => (
                  <ProductCard
                    layout={layout}
                    key={id}
                    item={item}
                  ></ProductCard>
                ))}
              </div>
              {/* pagination container */}
              <div className="flex justify-end">
                <div className="mt-6 flex gap-3 items-center  *:box-shadow *:flex *:justify-center *:items-center *:rounded-full *:duration-500">
                  <button
                    onClick={prevBtn}
                    className=" hover:bg-blue hover:text-white size-10"
                  >
                    <MdDoubleArrow className="rotate-180"></MdDoubleArrow>
                  </button>
                  {totalbtn?.slice(0, 7).map((item, id) => {
                    return (
                      <button
                        onClick={() => setCurrentPage(id + 1)}
                        className={`hover:bg-blue hover:text-white size-10 ${
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
                    className="hover:bg-blue hover:text-white size-10"
                  >
                    <MdDoubleArrow></MdDoubleArrow>
                  </button>
                  <select
                    onChange={showProductPerPage}
                    name="category"
                    className="p-2 rounded-md size-30 focus:outline-none border cursor-pointer"
                  >
                    <option disabled selected>
                      Show
                    </option>
                    <option>5</option>
                    <option>10</option>
                    <option>15</option>
                    <option>20</option>
                    <option>30</option>
                    <option>50</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Product;

// filter by categories
const Filter_by_category = ({ category, setCategory }) => {
  return (
    <div>
      <h1 className="text-xl xl:text-2xl font-semibold">
        Filter by categories
      </h1>
      <div className="space-y-2 mt-4  *:font-semibold">
        {["watch", "headphone", "phone", "tv", "laptop", "monitor"].map(
          (item, id) => (
            <p key={id}>
              <span
                onClick={() => setCategory(item)}
                className={`hover:text-green hover:underline duration-500  cursor-pointer ${
                  item == category ? "text-green underline" : "text-paragraph"
                }`}
              >
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
      <h1 className="text-xl xl:text-2xl font-semibold mt-4">Top 5 Products</h1>
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
                <p className="text-sm text-paragraph">
                  {description.slice(0, 30)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
