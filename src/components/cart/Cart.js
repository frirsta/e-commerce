import React from 'react';
import { Link } from 'react-router-dom';
import CircularProgress from '@mui/joy/CircularProgress';
import CartItem from './CartItem';
import { Button } from '@mui/joy';


const Cart = ({cart, handleUpdateCart, handleRemoveCart, handleEmtyCart}) => {
    const emptyCart = (
        <>
        <span>You have no items in the cart</span>
        <span><Link to={'/'}>Let's go shopping!</Link></span>
        </>
    )
if(!cart?.line_items) return <CircularProgress color="info" />
console.log(cart)

const items = (
    <>
    {cart.line_items.map((item) => (
        <CartItem onRemoveCart={handleRemoveCart} onUpdateCart={handleUpdateCart} key={item.id} item={item} />
        ))}
        <Button onClick={handleEmtyCart}>Empty Cart</Button>
        <Button>Checkout</Button>
    </>
)

  return (
    <div>
      <h3>Cart</h3>
      {cart.line_items ? items : emptyCart}
    </div>
  )
}

export default Cart
