import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { commerce } from "../../library/commerce/commerce";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/joy";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [item, setItem] = useState([]);
  const [images, setImages] = useState();
  const { id } = useParams();
  const navigate = useNavigate()

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


    fetchImages();
    console.log(productId)
  }, [id, item]);
  return (
    <div>
      <IconButton aria-label="back" size="small" onClick={() => {navigate(-1)}}>
        <ArrowBackIcon />
      </IconButton>
      <Carousel>{images}</Carousel>
    </div>
  );
};

export default ProductDetails;
