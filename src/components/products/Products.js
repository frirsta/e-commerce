import React from "react";
import Grid from "@mui/material/Grid";
import Product from "./Product";
import styles from "../../styles/Products.module.css";
import Categories from "../Categories";

const Products = ({ products, categories }) => {
  return (
    <div>
      <Categories categories={categories} />
      <Grid className={styles.ProductsContainer} container>
        {products.map((product) => (
          <Grid key={product.id}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Products;
