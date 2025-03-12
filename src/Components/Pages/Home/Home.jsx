import React, { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import LatestVisa from "./LatestVisa/LatestVisa";
import BestDestinations from "./BestDestinations/BestDestinations";
import Airlines from "./Airlines/Airlines";
import { Helmet } from "react-helmet";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container mx-auto">
      <Helmet>
        <title>VisaPortal | Home</title>
      </Helmet>
      <Banner></Banner>
      <LatestVisa></LatestVisa>
      <BestDestinations></BestDestinations>
      <Airlines></Airlines>
    </div>
  );
};

export default Home;
