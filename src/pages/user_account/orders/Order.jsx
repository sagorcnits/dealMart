const Order = () => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-left *:p-3 border-b *:uppercase">
          <th>#Order Id</th>
          <th>Date</th>
          <th>Total</th>
          <th>Items</th>
          <th>Payment Status</th>
          <th>Order Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {[1, 2, 3, 4, 5, 6].map((item, id) => {
          return (
            <tr key={id}
            className="*:p-3 border-b items-center hover:bg-[#f1efef] duration-500 *:text-gray-700">
              <td>#3434343434</td>
              <td>new</td>
              <td>new</td>
              <td>new</td>
              <td>new</td>
              <td>new</td>
              <td>new</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Order;
