import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import styles from "./App.module.css";
import Products from "./components/products/Products";
import { commerce } from "./library/commerce/commerce";
import { useEffect, useState } from "react";
import Cart from "./components/cart/Cart";
import ProductDetails from "./components/products/ProductDetails";
import Checkout from "./components/checkout/Checkout";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity, variantInfo) => {
    if (variantInfo) {
      commerce.cart.add(productId, quantity, variantInfo).then((res) => {
        setCart(res.cart);
      });
    } else {
      window.alert("Please Select a Shirt Size");
    }
  };

  const handleUpdateCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart?.line_items);
  };
  const handleRemoveCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart?.line_items);
  };
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart?.total_items);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <NavBar totalItems={cart?.total_items} />
        <Routes>
          <Route
            path={"/cart"}
            element={
              <Cart
                cart={cart}
                handleUpdateCart={handleUpdateCart}
                handleRemoveCart={handleRemoveCart}
                handleEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route
            path={"/item/:id"}
            element={<ProductDetails onAddToCart={handleAddToCart} />}
          />
          <Route
            path={"/"}
            element={
              <Products onAddToCart={handleAddToCart} products={products} />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            }
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
