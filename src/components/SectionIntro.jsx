const SectionIntro = ({title}) => {
  return (
    <div className="flex justify-between items-center poppins">
      <h3 className="text-green text-sm md:text-2xl font-semibold">{title}</h3>
      <span className="text-xs sm:text-sm text-paragraph cursor-pointer hover:text-green duration-500">View All</span>
    </div>
  );
};

export default SectionIntro;
