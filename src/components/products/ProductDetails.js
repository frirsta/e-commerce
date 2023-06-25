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
import { Box, Divider } from "@mui/joy";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

            <Typography className={styles.Price}>
              {product.price?.formatted_with_code}
            </Typography>
          </div>
          <Divider className={styles.Divider} />
          <div>
            <span className={styles.Size}>Size</span>
            <form className={styles.Form} onSubmit={handleSubmit}>
              <ToggleButtonGroup
                exclusive
                onChange={handleSize}
                value={optionId}
                aria-label="text alignment"
              >
                {product.variant_groups?.[0]?.options?.map((item) => (
                  <ToggleButton
                    onClick={() => setSelectedSize(item.id)}
                    style={{
                      backgroundColor:
                        selectedSize === item.id ? "#fae0df" : "#000",
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
          <div className={styles.ProductMaterial}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Size and fit</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              
                  <li>
                    <b>Height: </b> 175cm / 5'9
                  </li>
                  <li>
                    <b>Size: </b> S
                  </li>
                
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Product Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Material</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Amet laboris ullamco tempor esse ad Lorem laboris cillum. Esse
                non reprehenderit sunt qui officia dolore consectetur ullamco
                qui laboris reprehenderit qui laborum. Pariatur ad magna
                consectetur ipsum aliquip.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        </div>
      </div>
      <div>
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
                    color: "#000",
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
                      bgcolor: "#000",
                    },
                  },
                },
              }}
            >
              <Tab>Product Description</Tab>
              <Tab>Clothing Care</Tab>
            </TabList>
            <TabPanel value={0} sx={{ p: 2 }}>
              <Typography
                level="body1"
                dangerouslySetInnerHTML={{ __html: product.description }}
                className={styles.Description}
              ></Typography>
            </TabPanel>
            <TabPanel value={1} sx={{ p: 2 }}>
              <Typography level="body1" className={styles.Description}>
                Machine wash according to the instructions on the care label
              </Typography>
            </TabPanel>
          </Tabs>
        </Box>
      </div>
      <Divider className={styles.Divider} />
    </>
  );
};

export default ProductDetails;
