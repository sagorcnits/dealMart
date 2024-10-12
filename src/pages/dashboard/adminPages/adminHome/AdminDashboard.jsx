import React from "react";

const AdminDashboard = () => {
  return (
    <div className="bg-dashBgColor  mt-16">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4 mt-6">
        <SalesCard></SalesCard>
        <SalesCard></SalesCard>
        <SalesCard></SalesCard>
        <SalesCard></SalesCard>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4 *:h-[300px]">
        <div className="flex justify-center items-center col-span-1 box-shadow bg-white">
          <h1>Comming soon.....</h1>
        </div>
        <div className="flex justify-center items-center col-span-3 box-shadow bg-white">
          <h1>Comming soon.....</h1>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-4 *:h-[300px]">
        <div className="flex justify-center items-center col-span-3 box-shadow bg-white">
          <h1>Comming soon.....</h1>
        </div>
        <div className="flex justify-center items-center col-span-1 box-shadow bg-white">
          <h1>Comming soon.....</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

const SalesCard = () => {
  return (
    <div className="box-shadow bg-white leading-8 p-3">
      <p>Total Sales</p>
      <h1>$3799.00</h1>
    </div>
  );
};
