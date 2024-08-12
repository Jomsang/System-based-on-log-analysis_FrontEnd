import React, { useState } from "react";
import Banner from "./components/Banner";
import Category from "./components/Category";
import BestSelection from "./components/BestSelection";
//import styles from "./Main.module.css";

const main = () => {
  return (
    <div>
      <Banner />
      <Category />
      <BestSelection />
    </div>
  );
};

export default main;
