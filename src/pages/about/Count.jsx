const countArr = [
  {
    name: "Products",
    count: "1000+",
  },
  {
    name: "Visitor",
    count: "10000+",
  },
  {
    name: "Clients",
    count: "3000+",
  },
  {
    name: "Sell",
    count: "100000+",
  },
];

const Count = () => {
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
