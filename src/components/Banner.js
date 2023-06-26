import React from "react";
import styles from "../styles/Banner.module.css";
import Marquee from "react-fast-marquee";

const Banner = () => {
  return (
    <Marquee className={styles.Banner}>
      <div className={styles.Text}>The modern woman</div>
      <div className={styles.Text}>The modern woman</div>
      <div className={styles.Text}>The modern woman</div>
    </Marquee>
  );
};

export default Banner;
