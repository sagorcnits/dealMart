import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { MdDoubleArrow, MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxios from "../../../../hooks/useAxios";
import useCustomers from "../../../../hooks/useCustomers";

const Customers = () => {
  const axiosFetch = useAxios();
  const [customers] = useCustomers();
  // pagination
  const [itemPerPage, setItemPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const numberPages = Math.ceil(20 / itemPerPage);
  const totalbtn = [...Array(numberPages).keys()];

  // order data fetch
  const {
    data: customersData = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["customersData", currentPage, itemPerPage, filter],
    queryFn: async () => {
      const res = await axiosFetch.get(
        `/customers?page=${currentPage}&size=${itemPerPage}&filter=${filter}`
      );
      return res.data;
    },
  });

  console.log(customersData);

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
    <>
      <main
        className={`mt-16 bg-dashBgColor ${
          customersData.length > 8 && customers.length > 8
            ? "h-full"
            : "h-screen"
        }`}
      >
        <div className="flex justify-between items-center ">
          <p className="font-semibold uppercase text-2xl">customer list</p>
          <div className="md:flex justify-between items-center  border px-3 rounded-md  hidden bg-white">
            <input
              onChange={(e) => setFilter(e.target.value)}
              className="focus:outline-none py-2"
              type="text"
              placeholder="serach name"
            />
            <CiSearch className="cursor-pointer" size={20}></CiSearch>
          </div>
        </div>
        {isPending ? (
          <div>
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
          </div>
        ) : customersData.length > 0 ? (
          <section className="mt-10 box-shadow bg-white rounded-md">
            <Table customersData={customersData} refetch={refetch}></Table>
          </section>
        ) : (
          <div className="flex justify-center items-center h-[500px]">
            <h1 className="font-semibold text-3xl">No Data</h1>
          </div>
        )}
        {customersData.length > 8 && customers.length > 8 ? (
          <section className="mt-6 flex gap-3 items-center *:size-10 *:box-shadow *:flex *:justify-center *:items-center *:rounded-full *:duration-500">
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
          </section>
        ) : (
          " "
        )}
      </main>
    </>
  );
};

export default Customers;

const Table = ({ customersData, refetch }) => {
  const axiosFetch = useAxios();

  const deleteCustomer = (id) => {
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
          .delete(`/customers/${id}`)
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

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full">
        <thead>
          <tr className="border-b *:py-3 *:px-6">
            <th className="bg-blue-600  text-left text-sm uppercase font-semibold">
              Customer
            </th>
            <th className="bg-blue-600  text-left text-sm uppercase font-semibold">
              Email
            </th>
            <th className="bg-blue-600  text-left text-sm uppercase font-semibold">
              Phone
            </th>
            <th className="bg-blue-600  text-left text-sm uppercase font-semibold">
              Address
            </th>
            <th className="bg-blue-600  text-left text-sm uppercase font-semibold">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {customersData?.map((customer, id) => (
            <tr key={id} className="border-b hover:bg-gray-100 *:py-3 *:px-6">
              <td className=" text-gray-700">
                <div className="flex gap-2">
                  <figure className="size-[40px] rounded-md overflow-hidden">
                    <img src={customer?.customer_img} alt={customer.name} />
                  </figure>
                  <p>{customer?.customer}</p>
                </div>
              </td>
              <td className="py-4 px-6 text-gray-700">{customer.email}</td>
              <td className="py-4 px-6 text-gray-700">{customer.phone}</td>
              <td className="py-4 px-6 text-gray-700">{customer.address}</td>
              <td className="py-4 px-6 text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 *:cursor-pointer">
                    <Link to={`/dashboard/customer-details/${customer?.email}`}>
                      <IoEyeOutline size={20}></IoEyeOutline>
                    </Link>
                    <MdOutlineDeleteForever
                      onClick={() => deleteCustomer(customer?._id)}
                      size={20}
                    ></MdOutlineDeleteForever>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
