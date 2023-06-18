import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { commerce } from "../../library/commerce/commerce";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/joy";
import styles from "../../styles/ProductDetails.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/joy/Button";
import Add from "@mui/icons-material/Add";

const ProductDetails = ({ onAddToCart }) => {
  const [product, setProduct] = useState([]);
  const [item, setItem] = useState([]);
  const [images, setImages] = useState();
  const [sizes, setSizes] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const productId = id;
    const fetchImages = async () => {
      commerce.products.retrieve(productId).then((product) => {
        setProduct(product);
        setItem(product.assets);
        setImages(
          item.map((image) => (
            <img key={image.id} src={image.url} alt={image.filename} />
          ))
        );
      });
    };
    const fetchSizes = async () => {
      setSizes(
        product.variant_groups[0].options.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })
      );
    };
    fetchImages();
    fetchSizes();
  }, [id, item, product.variant_groups]);

  return (
    <div className={styles.ProductDetails}>
      <IconButton
        className={styles.Button}
        aria-label="back"
        size="small"
        onClick={() => {
          navigate(-1);
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Carousel>{images}</Carousel>
      <div className={styles.ProductInformation}>
        <Typography variant="h5" gutterBottom>
          {product.name}
        </Typography>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="h6"
          gutterBottom
        ></Typography>
      </div>
      <div className={styles.Sizes}>
        <ul>{sizes}</ul>
      </div>
      <Button
        onClick={() => onAddToCart(product.id, 1)}
        aria-label="add to cart"
        startDecorator={<Add />}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductDetails;
