const categoriesBtn = [
  "Electronics",
  "Furniture",
  "Clothes",
  "Shoes",
  "Sports",
  "Jewellery",
];

const Category = () => {
  return (
    <div className="w-[700px] sm:w-full grid grid-cols-6 gap-4 md:gap-6 items-center categoryEffect_main mt-4">
      {categoriesBtn.map((item, id) => (
        <Button key={id} item={item}></Button>
      ))}
      <div className="categoryEffect"></div>
    </div>
  );
};

export default Category;

const Button = ({ item }) => {
  return (
    <button className="py-2  bg-white border border-green rounded-md  hover:bg-green duration-500 poppins hover:text-white text-xs sm:text-sm">
      {item}
    </button>
  );
};
