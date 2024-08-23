import SectionIntro from "../../components/SectionIntro";
import Banner from "./Banner";
import Category from "./Category";

const Home = () => {
  return (
    <div>
      <section className="mt-4">
        <Banner></Banner>
      </section>
      <section className="py-12">
        <SectionIntro title="Categories"></SectionIntro>
        <div  className="w-full overflow-auto scrollbar-none">
          <Category></Category>
        </div>
      </section>
    </div>
  );
};

export default Home;
