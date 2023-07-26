import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import styles from "../styles/Products.module.css";
import Categories from "../components/Categories";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Divider from "@mui/joy/Divider";
import { commerce } from "../library/commerce/commerce";
import Product from "../components/products/Product";

const options = [
  {
    name: "Price, low to high",
    value: "asc",
    sortBy: "price",
  },
  {
    name: "Price, high to low",
    value: "desc",
    sortBy: "price",
  },
  {
    name: "Date, new to old",
    value: "desc",
    sortBy: "created_at",
  },
  {
    name: "Date, old to new",
    value: "asc",
    sortBy: "created_at",
  },
  {
    name: "Alphabetically, A-Z",
    value: "asc",
    sortBy: "name",
  },
  {
    name: "Alphabetically, Z-A",
    value: "desc",
    sortBy: "name",
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
      sortBy: selectOption?.sortBy,
      sortDirection: selectOption?.value,
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
              key={option.name}
              value={option}
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
