import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { commerce } from "../library/commerce/commerce";
import Product from "../components/products/Product";
import { Grid } from "@mui/material";
import styles from "../styles/Products.module.css";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardOverflow from "@mui/joy/CardOverflow";
import productStyles from "../styles/Product.module.css";
import Box from "@mui/joy/Box";
import CardCover from "@mui/joy/CardCover";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import { Link as RouterLink } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";

const Category = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [group, setGroup] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    commerce.categories
      .retrieve(category, { type: "slug", include: "breadcrumbs" })
      .then((category) => setGroup(category));

    commerce.categories
      .retrieve(category, { type: "slug" })
      .then((category) => setCategories(category.children));

    const fetchCategory = async () => {
      await commerce.products
        .list({
          category_slug: [category],
        })
        .then((response) => [setItems(response.data)]);
    };
    fetchCategory();
  }, [category]);

  return (
    <div>
      <Breadcrumbs className={styles.BreadcrumbsContainer} separator="/" aria-label="breadcrumb">
        <RouterLink className={styles.Breadcrumbs} to={"/shop"}>
          Shop
        </RouterLink>
        {group.breadcrumbs?.map((i) => (
          <RouterLink
            key={i.id}
            className={styles.Breadcrumbs}
            to={`/products/${i.permalink}`}
          >
            {i.name}
          </RouterLink>
        ))}
        <RouterLink className={styles.Breadcrumbs} to={`/products/${category}`}>
          {group.name}
        </RouterLink>
      </Breadcrumbs>
      <Grid className={styles.ProductsContainer} container>
        {items?.map((product) => (
          <Grid key={product.id}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
      <Grid className={styles.ProductsContainer} container>
        {categories?.map((item) => (
          <div className={styles.Category} key={item.id}>
            <Card className={productStyles.Product}>
              <CardOverflow className={productStyles.CardOverflow}>
                <Link
                  to={`/products/${item.slug}`}
                  className={productStyles.ProductLink}
                >
                  <CardMedia
                    className={productStyles.Image}
                    component={"img"}
                    image={item.assets[0].url}
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
                          className={styles.Link}
                          to={`/products/${item.slug}`}
                          overlay
                          underline="none"
                          sx={{
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            display: "block",
                          }}
                        >
                          {item.name}
                        </Link>
                      </Typography>
                    </Box>
                  </Box>
                </CardCover>
              </CardOverflow>
            </Card>
          </div>
        ))}
      </Grid>
    </div>
  );
};

export default Category;
