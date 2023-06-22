import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";
import CartItem from "./CartItem";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import styles from "../../styles/Cart.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/joy/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Cart = ({
  cart,
  handleUpdateCart,
  handleRemoveCart,
  handleEmptyCart,
}) => {
  const emptyCart = (
    <>
      <span>You have no items in the cart</span>
      <span>
        <Link to={"/"}>Let's go shopping!</Link>
      </span>
    </>
  );
  if (!cart?.line_items) return <CircularProgress color="info" />;
  console.log(cart);

  const items = (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="products table">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.line_items.map((item) => (
              <CartItem
                key={item.id}
                onRemoveCart={handleRemoveCart}
                onUpdateCart={handleUpdateCart}
                item={item}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={styles.Summary}>
        <Box className={styles.Total}>
          Subtotal: <span>{cart.subtotal.formatted_with_code}</span>
        </Box>
        <Box className={styles.Total}>
          Discount: <span>0kr</span>
        </Box>
        <Divider className={styles.Divider} />
        <Box className={styles.Total}>
          Grand total: <span>{cart.subtotal.formatted_with_code}</span>
        </Box>
        <div className={styles.ButtonsContainer}>
          <Button
            className={styles.CheckoutButton}
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className={styles.Cart}>
        <h3>Cart</h3>
        <Button className={styles.DeleteButton} onClick={handleEmptyCart}>
          <DeleteIcon /> Empty Cart
        </Button>
      </div>

      {cart.line_items ? items : emptyCart}
    </>
  );
};

export default Cart;
