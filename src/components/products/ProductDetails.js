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
      setGroupId(product.variant_groups?.[0].id);
    };

    fetchImages();
    fetchGroupId();
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
        <Typography 
        className={styles.Name}>
          {product.name}
        </Typography>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          className={styles.Description}
        ></Typography>
      </div>
      <div className={styles.Sizes}>
        <div>
          <select className={styles.Select}
            value={optionId}
            onChange={(e) => setOptionId(e.target.value)}
          >
            {product.variant_groups?.[0].options.map(({ id, name }) => (
              <option className={styles.Option} value={id} key={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button className={styles.AddToCartButton}
        onClick={() => onAddToCart(product.id, 1, { [groupId]: optionId })}
        aria-label="add to cart"
        startDecorator={<Add />}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductDetails;
