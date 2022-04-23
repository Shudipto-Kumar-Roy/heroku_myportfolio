import React from "react";
import MetaHeading from "../../../MetaHeading";
import About from "./About";
import Banner from "./Banner";
import ContactMe from "./ContactMe";
import Education from "./Education";
import Porjects from "./Porjects";
import Skills from "./Skills";
const Home = () => {
  return (
    <>
      <MetaHeading title="Personel Portfolio" />
      <>
        <Banner />
        <About />
        <Education />
        <Skills />
        <Porjects />
        <ContactMe />
      </>
    </>
  );
};

export default Home;
