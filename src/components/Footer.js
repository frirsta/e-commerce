import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import styles from "../styles/Footer.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import Newsletter from "./Newsletter";
import Link from "@mui/joy/Link";
import Divider from "@mui/material/Divider";
import ShopNowPayLater from "./ShopNowPayLater";

const Footer = () => {
  return (
    <Box>
      <ShopNowPayLater />
      <Box className={styles.Footer}>
        <Grid className={styles.FooterList} container>
          <Grid className={styles.FooterContainer}>
            <span className={styles.FooterTitle}>Social media</span>
            <span>
              <Link
                className={styles.Link}
                href="https://github.com/frirsta"
                rel="noopener"
                target="_blank"
                aria-label="Open new page and go to Frirsta's Github page"
              >
                <GitHubIcon className={styles.Icon} />
              </Link>
              <Link
                className={styles.Link}
                href="https://www.linkedin.com/in/frirsta/"
                rel="noopener"
                target="_blank"
                aria-label="Open new page and go to Frirsta's Linkedin"
              >
                <LinkedInIcon className={styles.Icon} />
              </Link>
              <Link
                className={styles.Link}
                href="https://www.facebook.com/"
                rel="noopener"
                target="_blank"
                aria-label="Open new page and go to facebook "
              >
                <FacebookIcon className={styles.Icon} />
              </Link>
              <Link
                className={styles.Link}
                href="https://www.instagram.com/"
                rel="noopener"
                target="_blank"
                aria-label="Open new page and go to instagram "
              >
                <InstagramIcon className={styles.Icon} />
              </Link>
            </span>
          </Grid>
          <Grid className={styles.FooterContainer}>
            <span className={styles.FooterTitle}>Contact us</span>
            <span className={styles.Contact}>
              <span>+123456789</span>
              <span>info@gmail.com</span>
              <span>adress 123 45, Stockholm, Sweden</span>
            </span>
          </Grid>
          <Grid className={styles.FooterContainer}>
            <span className={styles.FooterTitle}>Links</span>
            <Link
              component={RouterLink}
              to={"/"}
              className={styles.Link}
              aria-label="Go to home page"
            >
              Home
            </Link>
            <Link
              component={RouterLink}
              to={"/shop"}
              className={styles.Link}
              aria-label="Go to shop page"
            >
              Shop
            </Link>
            <Link
              component={RouterLink}
              to={"/about"}
              className={styles.Link}
              aria-label="Go to about page"
            >
              About
            </Link>
            <Link
              component={RouterLink}
              to={"/contact"}
              className={styles.Link}
              aria-label="Go to contact page"
            >
              Contact
            </Link>
          </Grid>
          <Grid className={styles.FooterContainer}>
            <span className={styles.FooterTitle}>Newsletter</span>
            <span className={styles.Newsletter}>
              <Newsletter />
            </span>
          </Grid>
        </Grid>
        <Divider variant="middle" className={styles.Divider} />
        <div className={styles.Creator}>&copy;Made by Frirsta Ali Karem</div>
      </Box>
    </Box>
  );
};

export default Footer;
