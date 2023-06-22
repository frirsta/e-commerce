import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { commerce } from "../../library/commerce/commerce";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/joy/IconButton";
import styles from "../../styles/ProductDetails.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ProductDetails = ({ onAddToCart }) => {
  const [product, setProduct] = useState([]);
  const [item, setItem] = useState([]);
  const [images, setImages] = useState();
  const [groupId, setGroupId] = useState();
  const [optionId, setOptionId] = useState();
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
    const fetchGroupId = async () => {
      setGroupId(product.variant_groups?.[0]?.id);
    };

    fetchImages();
    fetchGroupId();
  }, [id, item, product.variant_groups]);
  const handleSize = (event, optionId) => {
    if (optionId !== null) {
      setOptionId(optionId);
    }
  };

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
        <Typography className={styles.Name}>{product.name}</Typography>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          className={styles.Description}
        ></Typography>
      </div>
      <div className={styles.Sizes}>
        <div>
          <ToggleButtonGroup
            exclusive
            onChange={handleSize}
            value={optionId}
            aria-label="text alignment"
          >
            {product.variant_groups?.[0]?.options?.map((item) => (
              <ToggleButton
                className={styles.Option}
                key={item.id}
                value={item.id}
              >
                {item.name}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
      </div>
      <Button
        className={styles.AddToCartButton}
        onClick={() => onAddToCart(product.id, 1, { [groupId]: optionId })}
        aria-label="add to cart"
        color="info"
      >
        Add to cart
      </Button>
      <div className={styles.price}></div>
    </div>
  );
};

export default ProductDetails;
