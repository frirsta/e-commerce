import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../library/commerce/commerce";
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
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";

const drawerWidth = 240;

const NavBar = ({ category }) => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState(null);

  const handleOpen = (event) => {
    if (menu !== event.currentTarget) {
      setMenu(event.currentTarget);
    }
  };

  const handleClose = () => {
    setMenu(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <>
      <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
        <Typography className={styles.MobileBrand} sx={{ my: 2 }}>
          <Link className={styles.BrandLink} to={"/"}>
            Beauty
          </Link>
        </Typography>
        <Divider />
        <List>
          <ListItem
            className={styles.Menu}
            onMouseLeave={() => setOpen(false)}
            disablePadding
          >
            <ListItemButton
              className={`${styles.Link}`}
              onMouseOver={() => setOpen(true)}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={"Home"} />
            </ListItemButton>
            <ul className={`${open ? styles.Open : styles.Open}`}>
              {category.map((item) => (
                <li
                  className={`${styles.Category} ${styles.Link}`}
                  key={item.id}
                >
                  <Link
                    className={styles.Category}
                    to={`/products/${item.slug}`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              className={styles.Link}
              to={"/shop"}
              component={Link}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={"Shop"} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={styles.Link}
              to={"/about"}
              component={Link}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={"About"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  useEffect(() => {
    fetchCart();
  }, [cart]);
  return (
    <div className={styles.Navbar}>
      <Box className={styles.NavBarContainer} sx={{ display: "flex" }}>
        <AppBar className={styles.NavBar} component="nav">
          <div className={styles.ShoppingCartContainer}>
            <IconButton
              className={`${styles.IconButton}`}
              component={Link}
              to={"cart"}
            >
              <Badge badgeContent={cart?.total_items} color="info"></Badge>
              <ShoppingCartOutlinedIcon />
            </IconButton>
          </div>
          <Typography className={styles.Brand} sx={{ my: 2 }}>
            <Link className={styles.BrandLink} to={"/"}>
              Beauty
            </Link>
          </Typography>
          <Toolbar className={styles.Toolbar}>
            <Box className={styles.IconContainer}>
              <IconButton
                className={`${styles.IconButton} ${styles.MenuIcon}`}
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              className={styles.Items}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <Link to={`/`} className={styles.Link}>
                Home
              </Link>

              <Link
                onMouseOver={handleOpen}
                to={`/shop`}
                className={`${styles.Link} ${styles.Shop}`}
              >
                Shop
              </Link>
              <Menu
                className={styles.ShopMenu}
                open={menu}
                onMouseLeave={handleClose}
              >
                <MenuItem className={styles.MenuItem}>All</MenuItem>
                <MenuItem className={styles.MenuItem}>
                  Jackets and coats
                </MenuItem>
                <MenuItem className={styles.MenuItem}>Dresses</MenuItem>
                <MenuItem className={styles.MenuItem}>Accessories</MenuItem>
              </Menu>
              <Link to={`/about`} className={styles.Link}>
                About
              </Link>
            </Box>
          </Toolbar>

          <Typography
            className={styles.DesktopBrand}
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <Link className={styles.BrandLink} to={"/"}>
              Beauty
            </Link>
          </Typography>
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
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <Divider />
    </div>
  );
};

export default NavBar;
