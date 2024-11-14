import React from "react";
import About_title from "./About_titel";
import Banner from "./Banner";
import Count from "./Count";

const About = () => {
  return (
    <main className="mt-4">
      <section className="py-12 px-2 max-w-7xl mx-auto">
       <About_title></About_title>
      </section>
      <section className="py-12">
        <Banner></Banner>
      </section>
      <section className="py-12 px-2">
        <Count></Count>
      </section>
    </main>
  );
};

export default About;
