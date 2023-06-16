import { Card, CardMedia, IconButton } from "@mui/material";
import CardOverflow from "@mui/joy/CardOverflow";
import React from "react";
import styles from "../../styles/Product.module.css";
import AddIcon from "@mui/icons-material/Add";

const Product = ({ product, onAddToCart }) => {
  return (
    <div className={styles.ProductSection}>
      <div className={styles.ProductContainer}>
        <Card className={styles.Product}>
          <CardOverflow>
            <CardMedia
              className={styles.Image}
              component={"img"}
              image={product.image.url}
            />
            <IconButton
              sx={{
                position: "absolute",
                zIndex: 2,
                borderRadius: "50%",
                right: 5,
                bottom: "87%",
                transform: "translateY(50%)",
              }}
              onClick={() => onAddToCart(product.id, 1)}
              aria-label="add to cart"
            >
              <AddIcon />
            </IconButton>
          </CardOverflow>
        </Card>

        <div className={styles.TextContainer}>
          <span className={`${styles.Name} ${styles.Text}`}>
            {product.name}
          </span>
          <span className={`${styles.Prics} ${styles.Text}`}>
            {product.price.formatted_with_code}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Product;
