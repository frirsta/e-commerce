import React from "react";
import styles from "../styles/About.module.css";

const About = () => {
  return (
    <div>
      <div className={styles.Hero}>
        <h4 className={styles.HeroText}>A few words</h4>
        <h3 className={styles.HeroText}>About us</h3>
      </div>
      <div className={`${styles.Container}`}>
        <div className={styles.AboutTextContainer}>
          <span className={styles.Title}>who we are</span>
          <h2>
            We are the worlds largest fashion retailer with 300 stores across
            Europe.
          </h2>
          <p>
            Ex ad ad et eiusmod enim. Proident cupidatat non cupidatat elit ad
            laborum irure aliquip et ipsum aute. Consequat sit incididunt do
            occaecat amet. Reprehenderit laborum elit fugiat do duis culpa magna
            aliquip sunt magna qui eu in irure. Duis do nulla est velit occaecat
            ullamco laboris aute nostrud amet Lorem.
          </p>
        </div>
      </div>
      <div className={`${styles.Container}`}>
        <div className={`${styles.Image} ${styles.HistoryImage}`}></div>
        <div className={styles.TextContainer}>
          <span className={styles.Title}>since 1998</span>
          <h2>Our History</h2>
          <p>
            Nisi occaecat minim laboris sunt. Cillum fugiat nulla sint sit
            adipisicing adipisicing pariatur duis pariatur magna eu deserunt.
            Mollit excepteur fugiat sit nostrud laborum incididunt. Laboris enim
            duis non pariatur mollit aute. Qui id aute incididunt laboris qui
            esse aliquip eu. Fugiat adipisicing fugiat elit ut veniam laboris.
          </p>
        </div>
      </div>
      <div className={`${styles.Container} ${styles.Why}`}>
        <div className={`${styles.Image} ${styles.MissionImage}`}></div>
        <div className={styles.TextContainer}>
          <span className={styles.Title}>we are visionaries</span>
          <h2>Our Mission</h2>
          <p>
            Tempor non minim cupidatat sit ut velit aute sit aliqua officia
            culpa officia. Qui minim mollit amet dolore in irure minim aliquip
            id aliquip adipisicing deserunt consequat sit. Enim elit dolore et
            amet fugiat magna veniam nisi. Consectetur do est non eu esse
            aliquip aliqua occaecat aute officia id aliqua consequat.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
