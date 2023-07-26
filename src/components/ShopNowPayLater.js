import React from "react";
import Marquee from "react-fast-marquee";
import styles from "../styles/ShopNowPayLater.module.css";

const ShopNowPayLater = () => {
  return (
    <Marquee className={styles.ShopNowPayLater}>
      <div className={styles.Text}>Shop now, pay later available</div>
      <div className={styles.Text}>Shop now, pay later available</div>
      <div className={styles.Text}>Shop now, pay later available</div>
    </Marquee>
  );
};

export default ShopNowPayLater;
