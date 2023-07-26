import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import styles from "../../styles/Product.module.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardOverflow from "@mui/joy/CardOverflow";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/joy/Box";
import CardCover from "@mui/joy/CardCover";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Button from "@mui/joy/Button";

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
              <CardOverflow className={styles.CardOverflow}>
                <Link to={`/item/${product.id}`} className={styles.ProductLink}>
                  <CardMedia
                    className={styles.Image}
                    component={"img"}
                    image={product.image.url}
                  />
                </Link>
                <CardCover
                  className="gradient-cover"
                  sx={{
                    "&:hover, &:focus-within": {
                      opacity: 1,
                    },
                    opacity: 0,
                    transition: "0.3s ease-in",
                    background:
                      "linear-gradient(90deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.44796380090497734) 50%, rgba(0,0,0,0.45) 100%)",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flexGrow: 1,
                        alignSelf: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography level="h2" noWrap sx={{ fontSize: "lg" }}>
                        <Link
                          component={RouterLink}
                          to={`/item/${product.id}`}
                          overlay
                          underline="none"
                          sx={{
                            color: "#fff",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            display: "block",
                          }}
                        >
                          <Button className={styles.Button} variant="outlined">
                            Shop now
                          </Button>
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </CardCover>
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
