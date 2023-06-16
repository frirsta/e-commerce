import React from "react";
import Product from "./Product";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Products.module.css";

const Products = ({ products }) => {
  return (
    <Grid className={styles.ProductsContainer} container rowSpacing={1}>
      {products.map((product) => (
        <Grid key={product.id}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
