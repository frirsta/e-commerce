import React from "react";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/joy/Badge";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = ({ totalItems }) => {
  return (
    <div className={styles.NavBarContainer}>
      <IconButton component={Link} to={"cart"}>
        <Badge size="sm" badgeContent={totalItems} color="info"></Badge>
        <ShoppingCartOutlinedIcon className={styles.ShoppingCart} />
      </IconButton>
    </div>
  );
};

export default NavBar;
