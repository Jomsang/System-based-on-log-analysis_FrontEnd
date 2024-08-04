import React, { useState } from "react";
import Banner from "./components/Banner";
import Category from "./components/Category";
import ProductSection from "./components/ProductSection";
//import styles from "./Main.module.css";

const main = () => {
  return (
    <div>
      <Banner />
      <Category />
      <ProductSection />
    </div>
  );
};

export default main;
