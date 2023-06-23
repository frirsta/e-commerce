import React, { useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/joy/Badge";
import styles from "../styles/NavBar.module.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

const NavBar = ({ totalItems }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Brand
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            to={"/"}
            component={Link}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            to={"/shop"}
            component={Link}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary={"Shop"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            to={"/about"}
            component={Link}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary={"About"} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            to={"/contact"}
            component={Link}
            sx={{ textAlign: "center" }}
          >
            <ListItemText primary={"Contact"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <AppBar className={styles.NavBar} component="nav">
          <Toolbar className={styles.Toolbar}>
            <Box className={styles.IconContainer}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <IconButton component={Link} to={"cart"}>
                <Badge size="sm" badgeContent={totalItems} color="info"></Badge>
                <ShoppingCartOutlinedIcon className={styles.ShoppingCart} />
              </IconButton>
            </Box>
            <Box
              className={styles.Items}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Link to={`/`} className={styles.Button} sx={{ color: "#fff" }}>
                Home
              </Link>
              <Link
                to={`/shop`}
                className={styles.Button}
                sx={{ color: "#fff" }}
              >
                Shop
              </Link>
              <Link
                to={`/about`}
                className={styles.Button}
                sx={{ color: "#fff" }}
              >
                About
              </Link>
              <Link
                to={`/contact`}
                className={styles.Button}
                sx={{ color: "#fff" }}
              >
                Contact
              </Link>
            </Box>
            <Typography
              variant="h6"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Brand
            </Typography>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
        </Box>
      </Box>
    </div>
  );
};

export default NavBar;
