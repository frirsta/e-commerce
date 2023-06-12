import React from 'react';
import Product from './Product';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styles from '../../styles/Products.module.css';

const Products = ({products}) => {
  return (
    <Paper className={styles.Products}>
      
        <Grid className={styles.ProductsContainer} container rowSpacing={1}>
      {products.map((product) => (
        <Grid key={product.id}>
            <Product product={product} />
        </Grid>

      ))}

  </Grid>
    
    </Paper>
  )
}

export default Products
