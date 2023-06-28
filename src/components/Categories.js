import React from "react";
import styles from "../styles/Categories.module.css";
import { Link } from "react-router-dom";

const Categories = ({ categories }) => {
  return (
    <div>
      <ul className={styles.List}>
        {categories.map((item) => (
          <li key={item.id}>
            <Link className={styles.Link} to={`/products/${item.slug}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
