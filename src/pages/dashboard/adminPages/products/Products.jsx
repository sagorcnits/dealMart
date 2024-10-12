import { IoEyeOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin4Line } from "react-icons/ri";
import { useSelector } from "react-redux";
const Products = () => {
  const { loading, products, error } = useSelector((state) => state.products);

  return (
    <div className="mt-16">
      <h1 className="text-3xl font-bold">All products</h1>
      <div className="grid grid-cols-4 gap-4 mt-5">
        {products?.map((item, id) => (
          <Card key={id} item={item}></Card>
        ))}
      </div>
    </div>
  );
};

export default Products;

const Card = ({ item }) => {
  const { _id, product_name, price, brand, category, photo_url, description } =
    item;
  return (
    <div className="dashboard_card card-compact  bg-white border poppins  md:h-[300px] cursor-pointer hover:border-green duration-500 rounded-md overflow-hidden">
      <figure className="h-[130px] relative overflow-hidden">
        <img src={photo_url} alt={category} />
        <div className="flex  justify-center items-center gap-6 absolute dashboard_card_effect right-0 top-0 bottom-0 left-0  bg-black opacity-80 px-4">
          <div className="logo bg-green size-10 hover:bg-gray-500 duration-500 flex justify-center items-center  text-white">
            <MdEdit></MdEdit>
          </div>
          <div className="logo bg-darkBlue size-10 hover:bg-gray-500 duration-500 flex justify-center items-center  text-white">
            <IoEyeOutline></IoEyeOutline>
          </div>
          <div className="logo bg-red-500 size-10 hover:bg-gray-500 duration-500 flex justify-center items-center  text-white">
            <RiDeleteBin4Line></RiDeleteBin4Line>
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="text-sm md:text-[17px] font-semibold leading-6">
          {product_name}
        </h2>
        <p className="text-paragraph">{category}</p>
        <div className="flex items-center justify-between *:flex *:items-center *:gap-2">
          <div>
            <del className="text-paragraph text-sm">$400</del>
            <h2 className="font-semibold text-xl md:text-3xl">${price}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
