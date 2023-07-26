import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { commerce } from "../../library/commerce/commerce";
import CircularProgress from "@mui/joy/CircularProgress";
import CartItem from "./CartItem";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import styles from "../../styles/Cart.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import Divider from "@mui/joy/Divider";
import Card from "@mui/joy/Card";

const Cart = ({ onUpdateCart, onRemoveCart, onEmptyCart }) => {
  const [cart, setCart] = useState([]);
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  useEffect(() => {
    fetchCart();
  }, [cart]);
  const emptyCart = (
    <>
      <span>You have no items in the cart</span>
      <span>
        <Link to={"/"}>Let's go shopping!</Link>
      </span>
    </>
  );
  if (!cart?.line_items)
    return <CircularProgress className={styles.Progress} color="info" />;

  const items = (
    <>
      <div className={styles.EmptyCart}>
        <h2 className={styles.Title}>My Cart</h2>
        <Button
          variant="plain"
          color="neutral"
          className={styles.DeleteButton}
          onClick={onEmptyCart}
        >
          <DeleteIcon /> Empty Cart
        </Button>
      </div>
      <div className={styles.CartItemContainer}>
        <Card className={styles.CartItem}>
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
          <Divider variant="middle" className={styles.Divider} />
          <Box className={styles.Total}>
            Discount: <span>0kr</span>
          </Box>
          <Box className={styles.Total}>
            Items: <span>{cart.total_items}</span>
          </Box>
          <Divider variant="middle" className={styles.Divider} />
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
      </div>
    </>
  );

  return (
    <>
      <div className={styles.Cart}>
        {!cart.line_items.length ? emptyCart : items}
      </div>
    </>
  );
};

export default Cart;
