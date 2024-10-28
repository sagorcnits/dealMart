import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { MdDoubleArrow, MdOutlineDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";

const Customers = () => {
  // pagination
  const [itemPerPage, setItemPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const numberPages = Math.ceil(20 / itemPerPage);
  const totalbtn = [...Array(numberPages).keys()];

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
      <main className="mt-16">
        <div className="flex justify-between items-center ">
          <p className="font-semibold uppercase text-2xl">customer list</p>
          <div className="md:flex justify-between items-center  border px-3 rounded-md  hidden bg-white">
            <input
              className="focus:outline-none py-2"
              type="text"
              placeholder="serach name"
            />
            <CiSearch className="cursor-pointer" size={20}></CiSearch>
          </div>
        </div>
        <section className="mt-10 box-shadow bg-white rounded-md">
          <Table></Table>
        </section>
        <section className="mt-6 flex gap-3 items-center *:size-10 *:box-shadow *:flex *:justify-center *:items-center *:rounded-full *:duration-500">
          <button onClick={prevBtn} className=" hover:bg-blue hover:text-white">
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
          <button onClick={nextbtn} className="hover:bg-blue hover:text-white">
            <MdDoubleArrow></MdDoubleArrow>
          </button>
        </section>
      </main>
    </>
  );
};

export default Customers;

const Table = () => {
  const customers = [
    {
      _id: 1,
      customer: "John Doe",
      customer_img:
        "https://lh3.googleusercontent.com/a/ACg8ocJHNtFThSGq16tvsVl2iDzNlEK1q6dDeDVVwJrQhVNtn7AUgug=s288-c-no",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
    },
    {
      _id: 2,
      customer: "Jane Smith",
      customer_img:
        "https://lh3.googleusercontent.com/a/ACg8ocJHNtFThSGq16tvsVl2iDzNlEK1q6dDeDVVwJrQhVNtn7AUgug=s288-c-no",
      email: "jane@example.com",
      phone: "098-765-4321",
      address: "456 Oak St",
    },
    {
      _id: 3,
      customer: "Alice Johnson",
      customer_img:
        "https://lh3.googleusercontent.com/a/ACg8ocJHNtFThSGq16tvsVl2iDzNlEK1q6dDeDVVwJrQhVNtn7AUgug=s288-c-no",
      email: "alice@example.com",
      phone: "567-890-1234",
      address: "789 Pine St",
    },
    {
      _id: 3,
      customer: "Alice Johnson",
      customer_img:
        "https://lh3.googleusercontent.com/a/ACg8ocJHNtFThSGq16tvsVl2iDzNlEK1q6dDeDVVwJrQhVNtn7AUgug=s288-c-no",
      email: "alice@example.com",
      phone: "567-890-1234",
      address: "789 Pine St",
    },
    {
      _id: 3,
      customer: "Alice Johnson",
      customer_img:
        "https://lh3.googleusercontent.com/a/ACg8ocJHNtFThSGq16tvsVl2iDzNlEK1q6dDeDVVwJrQhVNtn7AUgug=s288-c-no",
      email: "alice@example.com",
      phone: "567-890-1234",
      address: "789 Pine St",
    },
    {
      _id: 3,
      customer: "Alice Johnson",
      customer_img:
        "https://lh3.googleusercontent.com/a/ACg8ocJHNtFThSGq16tvsVl2iDzNlEK1q6dDeDVVwJrQhVNtn7AUgug=s288-c-no",
      email: "alice@example.com",
      phone: "567-890-1234",
      address: "789 Pine St",
    },
    // More customers can be added here
  ];

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
          {customers.map((customer, id) => (
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
                    <Link to={`/dashboard/customer-details/${customer?._id}`}>
                      <IoEyeOutline size={20}></IoEyeOutline>
                    </Link>
                    <MdOutlineDeleteForever size={20}></MdOutlineDeleteForever>
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
