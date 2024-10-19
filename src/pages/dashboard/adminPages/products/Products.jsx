import { IoEyeOutline } from "react-icons/io5";
import { MdDoubleArrow } from "react-icons/md";
import useProducts from "../../../../hooks/useProducts";
const Products = () => {
  const products = useProducts()

  return (
    <main className="mt-16">
      <section>
        <h1 className="text-3xl font-bold">All products</h1>
      </section>
      <section className="flex flex-col-reverse md:flex-row justify-between items-center *:flex-1 mt-4">
        <div></div>
        <div className="flex justify-between md:justify-end gap-4 items-center w-full">
          <select className="select select-bordered w-full max-w-xs focus:outline-none">
            <option disabled selected>
              Choose Category
            </option>
            <option>watch</option>
            <option>headphone</option>
            <option>phone</option>
          </select>
          <select className="select select-bordered w-full max-w-xs focus:outline-none">
            <option disabled selected>
              Sort by
            </option>
            <option>high to low price</option>
            <option>low to high price</option>
            <option>available</option>
          </select>
        </div>
      </section>
      <section className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 mt-5">
        {products?.map((item, id) => (
          <Card key={id} item={item}></Card>
        ))}
      </section>
      <div className="mt-6 flex gap-3 items-center *:size-10 *:box-shadow *:flex *:justify-center *:items-center *:rounded-full *:duration-500">
        <button className="rotate-180 hover:bg-blue hover:text-white">
          <MdDoubleArrow></MdDoubleArrow>
        </button>
        {[1, 2, 3, 4, 5].map((item, id) => {
          return (
            <button className="hover:bg-blue hover:text-white" key={id}>
              {id + 1}
            </button>
          );
        })}
        <button className="hover:bg-blue hover:text-white">
          <MdDoubleArrow></MdDoubleArrow>
        </button>
      </div>
    </main>
  );
};

export default Products;

const Card = ({ item }) => {
  const { _id, product_name, price, brand, category, photo_url, description } =
    item;
  return (
    <div className="dashboard_card relative p-2 card-compact  bg-white border poppins  h-[400px] cursor-pointer hover:border-green duration-500 rounded-md overflow-hidden">
      <figure className="h-[170px] lg:h-[130px] relative overflow-hidden rounded-md">
        <img className="w-full" src={photo_url} alt={category} />
        <div className="flex z-10  justify-center items-center gap-6 absolute dashboard_card_effect right-0 top-0 bottom-0 left-0  bg-black opacity-80 px-4">
          <div className="logo bg-darkBlue size-10 hover:bg-gray-500 duration-500 flex justify-center items-center  text-white">
            <IoEyeOutline></IoEyeOutline>
          </div>
        </div>
      </figure>
      <div className="card-body">
        <h2 className="text-sm md:text-[17px] font-semibold leading-6">
          {product_name}
        </h2>
        <p className="text-[#17aa2f]">Available : 345</p>
        <p className="text-blue">Already Sold : 345</p>
        <p className="text-paragraph">Regular Price : 445</p>
        <p className="text-paragraph">Sale Price : 305</p>
      </div>
      <div className="absolute bottom-4 left-2 right-2 flex justify-between gap-4 items-center *:rounded-full *:duration-500   *:py-[6px] *:border *:flex-1 *:text-center ">
        <button className="border-blue text-blue hover:bg-blue  hover:text-white">
          Edit
        </button>
        <button className="border-customRed hover:bg-customRed  hover:text-white">
          Delete
        </button>
      </div>
    </div>
  );
};
