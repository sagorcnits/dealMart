import React from "react";
import { FaHandHoldingUsd } from "react-icons/fa";
const OrderList = () => {
  return (
    <>
      <main>
        <div className="pt-16">
          <h1 className="text-3xl font-bold">Order List</h1>
        </div>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 4, 5].map((item, id) => (
            <Card key={id}></Card>
          ))}
        </section>
      </main>
    </>
  );
};

export default OrderList;

const Card = () => {
  return (
    <div className="flex gap-3 items-center box-shadow p-4 rounded-md">
      <div className="space-y-3">
        <h1 className="font-semibold">Payment Refund</h1>
        <p className="text-paragraph">490</p>
      </div>
      <div>
        <FaHandHoldingUsd size={30}></FaHandHoldingUsd>
      </div>
    </div>
  );
};
