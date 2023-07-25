import React from "react";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import ButtonStyles from "../styles/Button.module.css";
import styles from "../styles/Brand.module.css";
import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <Box className={styles.Brand} sx={{ width: "80vw", textAlign: "center" }}>
      <Typography
        sx={{
          textTransform: "uppercase",
          fontWeight: 100,
          letterSpacing: 2,
          textAlign: "center",
        }}
        level="h2"
      >
        Behind the brand
      </Typography>
      <Typography sx={{ margin: "20px 0", lineHeight: 2 }} level="body1">
        Welcome to the world of timeless sophistication and contemporary
        elegance - where fashion meets artistry. <br /> Our women's clothing
        brand is a captivating fusion of classic charm and modern allure, <br />{" "}
        redefining the essence of style for the empowered and discerning woman
        of today.
      </Typography>
      <Typography level="h5" sx={{ letterSpacing: 2, fontWeight: 100 }}>
        "Embrace elegance, choose timeless. Invest in pieces that whisper
        eternity, as fashion transcends seasons."
      </Typography>
      <Typography sx={{ margin: "20px 0", lineHeight: 2 }} level="body1">
        At the heart of our brand lies a deep commitment to sustainability and
        ethical practices. <br /> We take pride in our responsible sourcing of
        materials and environmentally conscious production processes, <br />{" "}
        ensuring that every creation respects the world we live in.
      </Typography>
      <Button
        component={Link}
        to={`/about`}
        sx={{ margin: "20px 0" }}
        className={ButtonStyles.Button}
      >
        Read our story
      </Button>
    </Box>
  );
};

export default Brand;
