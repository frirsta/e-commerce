import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import styles from "../styles/Footer.module.css";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Newsletter from "./Newsletter";

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <Paper>
        <Box sx={{ width: "100%" }}>
          <Grid className={styles.FooterList} container>
            <Grid className={styles.FooterContainer} ><span className={styles.FooterTitle}>Social media</span>
            <span className={styles.Socialmedia}>
                <GitHubIcon /> <LinkedInIcon /> <FacebookIcon /> <InstagramIcon /> </span></Grid>
            <Grid className={styles.FooterContainer} ><span className={styles.FooterTitle}>Contact us</span>
            <span className={styles.Contact}><span>+123456789</span><span>info@gmail.com</span><span>adress 123 45, Stockholm, Sweden</span></span></Grid>
            <Grid className={styles.FooterContainer} ><span className={styles.FooterTitle}>Links</span>
            <span className={styles.Links}></span></Grid>
            <Grid className={styles.FooterContainer} ><span className={styles.FooterTitle}>Newsletter</span>
            <span className={styles.Newsletter}><Newsletter /></span></Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  );
};

export default Footer;
