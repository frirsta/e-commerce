import React from "react";
import Marquee from "react-fast-marquee";
import styles from "../styles/Banner.module.css";

const Announcement = () => {
  return (
    <div>
      <Marquee className={styles.Announcement}>
        <div className={styles.Sale}>Sale starting tomorrow!</div>
      </Marquee>
    </div>
  );
};

export default Announcement;
