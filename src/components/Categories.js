import React from "react";
import styles from "../styles/Categories.module.css";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";

const Categories = ({ categories }) => {
  return (
    <div className={styles.Categories}>
      <ul className={styles.List}>
        {categories.map((item) => (
          <li key={item.id}>
            <Link className={styles.Link} to={`/products/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <Divider className={styles.Divider} variant="middle" />
    </div>
  );
};

export default Categories;
