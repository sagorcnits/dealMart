const Client = () => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-4 gap-4 mt-10">
      <div className="lg:row-span-2"><Card></Card></div>
      <div className="lg:row-span-3"><Card></Card></div>
      <div className="lg:row-span-2"><Card></Card></div>
      <div className="lg:row-span-2 lg:row-start-3"><Card></Card></div>
      <div className="lg:row-span-2 lg:col-start-3 lg:row-start-3"><Card></Card></div>
      <div className="lg:row-span-3 lg:col-start-2 lg:row-start-4"><Card></Card></div>
      <div className="lg:row-span-2 lg:row-start-5"><Card></Card></div>
      <div className="lg:row-span-2 lg:col-start-3 lg:row-start-5"><Card></Card></div>
    </div>
  );
};

export default Client;

const Card = () => {
  return (
    <div className="bg-[#F5F5F5] p-6 space-y-8 poppins  cursor-pointer h-full hover:bg-darkBlue duration-500 hover:text-white rounded-md">
      <div className="flex justify-between  items-center">
        <div className="w-[70px] rounded-lg overflow-hidden">
          <img src="https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?t=st=1724645555~exp=1724649155~hmac=fa7c479f04113af91a7530692cdb453219a9c9a8d6fd72274637e4a21ee620ac&w=740" />
        </div>
       
      </div>
      <div className="flex justify-between border-b border-black border-dashed pb-3">
        <p className="font-bold">jone</p>
        <p>1 day ago</p>
      </div>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi at repudiandae modi id natus corrupti </p>
    </div>
  );
};
