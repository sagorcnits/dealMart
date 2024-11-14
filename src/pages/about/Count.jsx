import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useCustomers from "../../hooks/useCustomers";
import useProducts from "../../hooks/useProducts";


const Count = () => {
  const [salseInformation, setSalseInformation] = useState(null);
  const axiosFetch = useAxios();
  const [loading, setLoading] = useState(true);
  const [products] = useProducts()
  const [customers] = useCustomers()
  // total sale get the data
  useEffect(() => {
    axiosFetch
      .get(`/orders?filterDate=all`)
      .then((res) => {
        setSalseInformation(res.data.orderDetails);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ ]);



//  count arraye
  const countArr = [
    {
      name: "Products",
      count: products?.length,
    },
    {
      name: "Visitor",
      count: "10000+",
    },
    {
      name: "Clients",
      count: customers?.length,
    },
    {
      name: "Sale",
      count: salseInformation?.complated,
    },
  ];


// data pending
  if (loading) {
    return (
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue mx-auto"></div>
    );
  }


  return (
    <div className="flex flex-col md:flex-row gap-6 *:flex-1 max-w-7xl mx-auto poppins">
      <div>
        <p className="leading-7">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
          harum eum non ut tempora consequatur dolorum deleniti sapiente? Ea
          provident suscipit quo fugiat excepturi dicta necessitatibus dolores
          blanditiis nihil error.Lorem ipsum dolor sit amet, consectetur
          adipisicing elit. Similique harum eum non ut tempora consequatur
          dolorum deleniti sapiente? Ea provident suscipit quo fugiat excepturi
          dicta necessitatibus dolores blanditiis nihil error.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {countArr.map((item, id) => (
          <Card key={id} item={item}></Card>
        ))}
      </div>
    </div>
  );
};

export default Count;
// count card 
const Card = ({item}) => {
  return (
    <div className="border flex justify-center items-center p-4 rounded-md *:text-center">
      <div>
        <h1 className="text-3xl">{item.count}</h1>
        <p className="text-paragraph">{item.name}</p>
      </div>
    </div>
  );
};
