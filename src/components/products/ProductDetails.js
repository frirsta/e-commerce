import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { commerce } from "../../library/commerce/commerce";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [item, setItem] = useState([]);
  const [size, setSize] = useState();
  const [images, setImages] = useState();
  const { id } = useParams();

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
    const fetchSize = async () => {
      console.log(product.variant_groups.options.filter((item) => {

      }));
    };

    fetchImages();
    fetchSize();
    console.log(productId)
  }, [id, item]);
  return (
    <div>
      <Carousel>{images}</Carousel>
    </div>
  );
};

export default ProductDetails;
