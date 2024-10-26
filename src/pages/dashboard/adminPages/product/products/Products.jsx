import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../../../../hooks/useAxios";
import useProducts from "../../../../../hooks/useProducts";
const Products = () => {
  const axiosFetch = useAxios();
  const [products] = useProducts();
  const [category, setCategory] = useState("all");
  const [sort, setSorted] = useState("all");
  // pagination
  const [itemPerPage, setItemPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const numberPages = Math.ceil(products.length / itemPerPage);
  const totalbtn = [...Array(numberPages).keys()];
  // get product form server
  // console.log(currentPage, itemPerPage, sort, category);
  const {
    data: productsData = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["products", currentPage, itemPerPage, category, sort],
    queryFn: async () => {
      const res = await axiosFetch.get(
        `/products?page=${currentPage}&size=${itemPerPage}&category=${category}&sort=${sort}`
      );
      return res.data;
    },
  });
  // showproduct in perPage
  const showProductPerPage = (e) => {
    setItemPerPage(e.target.value);
  };

  // filter product by category
  const filterProduct = (e) => {
    setCategory(e.target.value);
  };

  // sorted product by price
  const sorted = (e) => {
    setSorted(e.target.value);
  };

  // pagination button next prev function

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
    <>
      <main className="mt-16">
        <section className="py-3">
          <h1 className="text-3xl font-bold">All products</h1>
        </section>
        <section className="flex flex-col-reverse md:flex-row justify-between items-center *:flex-1 mt-4">
          <div>
            <select
              onChange={showProductPerPage}
              className="select select-bordered  max-w-xs focus:outline-none"
              name="show_product"
            >
              <option disabled selected>
                Show Products
              </option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
              <option>30</option>
              <option>40</option>
            </select>
          </div>
          <div className="flex justify-between md:justify-end gap-4 items-center w-full">
            <select
              onChange={filterProduct}
              name="category"
              className="select select-bordered w-full max-w-xs focus:outline-none"
            >
              <option disabled selected>
                Choose Category
              </option>
              <option>watch</option>
              <option>headphone</option>
              <option>phone</option>
            </select>
            <select
              name="sorted"
              onChange={sorted}
              className="select select-bordered w-full max-w-xs focus:outline-none"
            >
              <option disabled selected>
                Sort by
              </option>
              <option>high to low price</option>
              <option>low to high price</option>
              <option>available</option>
            </select>
          </div>
        </section>
        {productsData.length > 0 ? (
          <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 mt-5">
            {productsData?.map((item, id) => (
              <Card refetch={refetch} key={id} item={item}></Card>
            ))}
          </section>
        ) : (
          <div className="flex justify-center items-center h-screen text-3xl font-bold">
            <h1>No Products</h1>
          </div>
        )}
        {products.length > 8 && (
          <section className="mt-6 flex gap-3 items-center *:size-10 *:box-shadow *:flex *:justify-center *:items-center *:rounded-full *:duration-500">
            <button
              onClick={prevBtn}
              className=" hover:bg-blue hover:text-white"
            >
              <MdDoubleArrow className="rotate-180"></MdDoubleArrow>
            </button>
            {totalbtn?.map((item, id) => {
              return (
                <button
                  onClick={() => setCurrentPage(id + 1)}
                  className={`hover:bg-blue hover:text-white ${
                    currentPage == item + 1 && "bg-blue text-white"
                  }`}
                  key={id}
                >
                  {item + 1}
                </button>
              );
            })}
            <button
              onClick={nextbtn}
              className="hover:bg-blue hover:text-white"
            >
              <MdDoubleArrow></MdDoubleArrow>
            </button>
          </section>
        )}
      </main>
    </>
  );
};

export default Products;

const Card = ({ item, refetch }) => {
  const axiosFetch = useAxios();
  // remove product
  const removeProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosFetch
          .delete(`/products/${id}`)
          .then((res) => {
            if (res.data.message === "ok") {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });

              refetch();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const {
    _id,
    product_name,
    brand_name,
    reguler_price,
    sale_price,
    category_name,
    quantity_in_stock,
    stock_status,
    images,
    description,
  } = item;
  return (
    <div className="dashboard_card relative p-2 card-compact  bg-white border poppins  h-[400px] cursor-pointer hover:border-green duration-500 rounded-md overflow-hidden">
      <figure className="h-[170px] lg:h-[130px] relative overflow-hidden rounded-md">
        <img className="w-full" src={images[0]} alt={category_name} />
        <div className="flex z-10  justify-center items-center gap-6 absolute dashboard_card_effect right-0 top-0 bottom-0 left-0  bg-black opacity-80 px-4">
          <Link to={`/dashboard/product-details/${_id}`}>
            <div className="logo bg-darkBlue size-10 hover:bg-gray-500 duration-500 flex justify-center items-center  text-white">
              <IoEyeOutline></IoEyeOutline>
            </div>
          </Link>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="text-sm md:text-[17px] font-semibold leading-6">
          {product_name}
        </h2>
        <p className="text-[#17aa2f]">Available : {quantity_in_stock}</p>
        <p className="text-paragraph">Regular Price : {reguler_price}</p>
        <p className="text-paragraph">Sale Price : {sale_price}</p>
        <p className="text-paragraph text-xs">{description.slice(0, 40)}...</p>
      </div>
      <div className="absolute bottom-4 left-2 right-2 flex justify-between gap-4 items-center *:rounded-full *:duration-500   *:py-[6px] *:border *:flex-1 *:text-center ">
        <Link
          className="border-blue text-blue hover:bg-blue  hover:text-white"
          to={`/dashboard/update-product/${_id}`}
        >
          <button>Edit</button>
        </Link>
        <button
          onClick={() => removeProduct(_id)}
          className="border-customRed hover:bg-customRed  hover:text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
