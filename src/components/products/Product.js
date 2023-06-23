import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardOverflow from "@mui/joy/CardOverflow";
import React, { useEffect, useState } from "react";
import styles from "../../styles/Product.module.css";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const Product = ({ product }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className={styles.ProductSection}>
      <div className={styles.ProductContainer}>
        {loading ? (
          <>
            <Skeleton className={styles.ImageSkeleton} variant="rectangular" />
            <div className={styles.ProductInformation}>
              <div className={styles.TextContainer}>
                <Skeleton className={styles.SkeletonName} variant="text" />
                <Skeleton className={styles.SkeletonPrice} variant="text" />
              </div>
            </div>
          </>
        ) : (
          <>
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

                <span className={`${styles.Price} ${styles.Text}`}>
                  {product.price.formatted_with_code}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Product;
