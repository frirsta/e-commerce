import { Card, CardMedia } from "@mui/material";
import React from "react";
import styles from '../../styles/Product.module.css';

const Product = ({ product }) => {
  return (
    <div>
      <Card className={styles.Product}>
        <CardMedia component={"img"} image={product.image.url} />
      </Card>
    </div>
  );
};

export default Product;
