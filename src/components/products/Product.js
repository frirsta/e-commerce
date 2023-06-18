import { Card, CardMedia, IconButton } from "@mui/material";
import CardOverflow from "@mui/joy/CardOverflow";
import React from "react";
import styles from "../../styles/Product.module.css";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Link } from "react-router-dom";

const Product = ({ product, onAddToCart }) => {
  return (
    <div className={styles.ProductSection}>
      <div className={styles.ProductContainer}>
        <Card className={styles.Product}>
          <CardOverflow>
            <Link to={`/item/${product.id}`} className={styles.ProductLink}>
              <CardMedia
                className={styles.Image}
                component={"img"}
                image={product.image.url}
              />
            </Link>
          </CardOverflow>
        </Card>
        <div className={styles.ProductInformation}>
          <div className={styles.TextContainer}>
            <span className={`${styles.Name} ${styles.Text}`}>
              {product.name}
            </span>
            <span className={`${styles.Prics} ${styles.Text}`}>
              {product.price.formatted_with_code}
            </span>
          </div>
          <IconButton
            onClick={() => onAddToCart(product.id, 1)}
            aria-label="add to cart"
          >
            <AddShoppingCartOutlinedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Product;
