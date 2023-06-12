import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = ({ totalItems }) => {
  return (
    <div className={styles.NavBarContainer}>
      <Box>
        <AppBar>
          <Toolbar className={styles.NavBar}>
            <Typography>
              <Link to={"/"}>Brand</Link>
            </Typography>
            <IconButton component={Link} to={"cart"}>
              <Badge badgeContent={totalItems} color="primary"></Badge>
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default NavBar;
