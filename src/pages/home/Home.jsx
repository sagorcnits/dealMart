import ProductCard from "../../components/ProductCard";
import SectionIntro from "../../components/SectionIntro";
import Banner from "./Banner";
import Category from "./Category";
import Discount from "./Discount";

const Home = () => {
  return (
    <div>
      <section className="mt-4 max-w-7xl mx-auto px-2">
        <Banner></Banner>
      </section>
      <section className="py-12 max-w-7xl mx-auto px-2">
        <SectionIntro title="Categories"></SectionIntro>
        <div className="w-full overflow-auto scrollbar-none">
          <Category></Category>
        </div>
      </section>
      <section className="py-12 bg-[#e9f6f6]">
        <div className="max-w-7xl mx-auto px-2">
          <SectionIntro title="Trending"></SectionIntro>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
             <ProductCard></ProductCard>
             <ProductCard></ProductCard>
             <ProductCard></ProductCard>
             <ProductCard></ProductCard>
          </div>
        </div>
      </section>
      <section className="py-12 px-2 max-w-7xl mx-auto">
           <Discount></Discount>
      </section>
    </div>
  );
};

export default Home;
