import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/joy/Badge";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = ({ totalItems }) => {
  return (
    <div className={styles.NavBarContainer}>
      <Typography>
        <Link to={"/"}>Brand</Link>
      </Typography>
      <IconButton component={Link} to={"cart"}>
        <Badge size="sm" badgeContent={totalItems} color="info"></Badge>
        <ShoppingCartOutlinedIcon className={styles.ShoppingCart} />
      </IconButton>
    </div>
  );
};

export default NavBar;
