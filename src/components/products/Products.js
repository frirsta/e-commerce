import React from "react";
import Grid from "@mui/material/Grid";
import Product from "./Product";
import styles from "../../styles/Products.module.css";

const Products = ({ products }) => {
  return (
    <Grid className={styles.ProductsContainer} container>
      {products.map((product) => (
        <Grid key={product.id}>
          <Product product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Products;
