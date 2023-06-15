import { Card, CardMedia } from "@mui/material";
import React from "react";
import styles from '../../styles/Product.module.css';

const Product = ({ product }) => {
  return (
    <div className={styles.ProductSection}>
    <div className={styles.ProductContainer}>
      <Card className={styles.Product}>
        <CardMedia className={styles.Image} component={"img"} image={product.image.url} />
      </Card>
     <span className={styles.Name}>{product.name}</span> 
     <span className={styles.Prics}>{product.price.formatted_with_code}</span> 
    </div>
    </div>
  );
};

export default Product;
