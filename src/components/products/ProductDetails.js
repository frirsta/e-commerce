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
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import { Box } from "@mui/joy";

const ProductDetails = ({ onAddToCart }) => {
  const [product, setProduct] = useState([]);
  const [groupId, setGroupId] = useState();
  const [optionId, setOptionId] = useState("");
  const [clicked, setClicked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      commerce.products.retrieve(id).then((product) => {
        setProduct(product);
      });
    };
    const fetchGroupId = async () => {
      setGroupId(product.variant_groups?.[0]?.id);
    };

    fetchImages();
    fetchGroupId();
  }, [id, product.variant_groups]);
  const handleSize = (event, optionId) => {
    if (optionId !== null) {
      setOptionId(optionId);
      setClicked(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (clicked === false) {
      window.alert("Please Select a Size");
    } else {
      onAddToCart(product.id, 1, { [groupId]: optionId });
    }
  };

  return (
    <>
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
        <Carousel className={styles.Carousel}>
          {product.assets?.map((image) => (
            <img key={image.id} src={image.url} alt={image.filename} />
          ))}
        </Carousel>
        <div className={styles.Product}>
          <div className={styles.ProductInformation}>
            <Typography className={styles.Name}>{product.name}</Typography>
            <Typography
              dangerouslySetInnerHTML={{ __html: product.description }}
              className={styles.Description}
            ></Typography>
            <Typography>{product.price?.formatted_with_code}</Typography>
          </div>
          <div className={styles.Sizes}>
            <form className={styles.Form} onSubmit={handleSubmit}>
              <ToggleButtonGroup
                className={styles.ButtonGroup}
                exclusive
                onChange={handleSize}
                value={optionId}
                aria-label="text alignment"
              >
                {product.variant_groups?.[0]?.options?.map((item) => (
                  <ToggleButton
                    onClick={() => setSelectedSize(item.id)}
                    style={{
                      backgroundColor: selectedSize === item.id ? "grey" : "pink",
                    }}
                    className={styles.Option}
                    key={item.id}
                    value={item.id}
                  >
                    {item.name}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
              <Button
                className={styles.AddToCartButton}
                type="submit"
                aria-label="add to cart"
              >
                Add to cart
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className={styles.MaterialInformation}>
        <Box
          sx={{
            bgcolor: "background.body",
            flexGrow: 1,
            m: -3,
            overflowX: "hidden",
            borderRadius: "md",
          }}
        >
          <Tabs
            aria-label="Basic tabs"
            defaultValue={0}
            sx={{ borderRadius: "lg" }}
          >
            <TabList
              variant="plain"
              sx={{
                width: "100vw",
                maxWidth: "1200px",
                display: "flex",
                justifyContent: "space-between",
                mx: "auto",
                pt: 2,
                alignSelf: "flex-start",
                [`& .${tabClasses.root}`]: {
                  bgcolor: "transparent",
                  boxShadow: "none",
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                  [`&.${tabClasses.selected}`]: {
                    color: "primary.plainColor",
                    fontWeight: "lg",
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      zIndex: 1,
                      bottom: "-1px",
                      left: "var(--ListItem-paddingLeft)",
                      right: "var(--ListItem-paddingRight)",
                      height: "3px",
                      borderTopLeftRadius: "3px",
                      borderTopRightRadius: "3px",
                      bgcolor: "primary.500",
                    },
                  },
                },
              }}
            >
              <Tab>First tab</Tab>
              <Tab>Second tab</Tab>
              <Tab>Third tab</Tab>
            </TabList>
            <TabPanel value={0} sx={{ p: 2 }}>
              <b>First</b> tab panel
            </TabPanel>
            <TabPanel value={1} sx={{ p: 2 }}>
              <b>Second</b> tab panel
            </TabPanel>
            <TabPanel value={2} sx={{ p: 2 }}>
              <b>Third</b> tab panel
            </TabPanel>
          </Tabs>
        </Box>
      </div>
    </>
  );
};

export default ProductDetails;
