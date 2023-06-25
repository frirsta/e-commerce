import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/joy/CircularProgress";
import CartItem from "./CartItem";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import styles from "../../styles/Cart.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/joy/Divider";
import { Card } from "@mui/joy";

const Cart = ({ cart, onUpdateCart, onRemoveCart, onEmptyCart }) => {
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
      <Button className={styles.DeleteButton} onClick={onEmptyCart}>
        <DeleteIcon /> Empty Cart
      </Button>
      <Card>
        {cart.line_items.map((item) => (
          <CartItem
            key={item.id}
            onRemoveCart={onRemoveCart}
            onUpdateCart={onUpdateCart}
            item={item}
          />
        ))}
      </Card>

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
      </div>

      {!cart.line_items.length ? emptyCart : items}
    </>
  );
};

export default Cart;
