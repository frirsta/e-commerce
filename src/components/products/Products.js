import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import styles from "../../styles/Products.module.css";
import Categories from "../Categories";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/joy/Divider";
import { commerce } from "../../library/commerce/commerce";
import Product from "./Product";

const options = [
  {
    name: "Price, low to high",
    value: "asc",
  },
  {
    name: "Price, high to low",
    value: "desc",
  },
];

const Products = ({ categories }) => {
  const [products, setProducts] = useState([]);
  const [selectOption, setSelectOption] = useState(options[0].value);

  const handleSelect = async (event, selectOption) => {
    if (selectOption !== null) {
      setSelectOption(selectOption);
    }
    const { data } = await commerce.products.list({
      sortBy: "price",
      sortDirection: selectOption,
    });
    setProducts(data);
  };
  useEffect(() => {
    handleSelect();
  }, []);
  return (
    <div>
      <Categories categories={categories} />

      <div>
        <Divider />
        <Select
          className={styles.Select}
          value={selectOption}
          placeholder="Sort by"
          onChange={handleSelect}
          indicator={<KeyboardArrowDown />}
          sx={{
            width: 200,
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }}
        >
          {options.map((option) => (
            <Option
              onChange={(e) => setSelectOption(e.target.name)}
              key={option.value}
              value={option.value}
            >
              {option.name}
            </Option>
          ))}
        </Select>

        <Divider />
        <Grid className={styles.ProductsContainer} container>
          {products?.map((product) => (
            <Grid key={product.id}>
              <Product product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Products;
