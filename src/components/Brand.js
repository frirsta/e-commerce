import React from "react";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import ButtonStyles from "../styles/Button.module.css";
import styles from "../styles/Brand.module.css";

const Brand = () => {
  return (
    <Box className={styles.Brand}>
      <Typography level="h2">Behind the brand</Typography>
      <Typography level="body1">
        Welcome to the world of timeless sophistication and contemporary
        elegance - where fashion meets artistry. Our women's clothing brand is a
        captivating fusion of classic charm and modern allure, redefining the
        essence of style for the empowered and discerning woman of today.
      </Typography>
      <Button className={ButtonStyles.Button}>Read our story</Button>
    </Box>
  );
};

export default Brand;
