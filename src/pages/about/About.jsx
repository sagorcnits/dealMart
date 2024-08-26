import React from "react";
import SectionIntro from "../../components/SectionIntro";
import Banner from "./Banner";
import Client from "./Client";
import Count from "./Count";

const About = () => {
  return (
    <main className="mt-4">
      <section className="py-12">
        <Banner></Banner>
      </section>
      <section className="py-12 px-2">
        <Count></Count>
      </section>
      <section className="py-12 px-2 max-w-7xl mx-auto">
        <SectionIntro title="Our Client Rivew"></SectionIntro>

        <Client></Client>
      </section>
    </main>
  );
};

export default About;
