import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { commerce } from "./library/commerce/commerce";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import styles from "./App.module.css";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import ProductDetails from "./components/products/ProductDetails";
import Checkout from "./components/checkout/Checkout";
import Home from "./pages/Home";
import About from "./pages/About";
import Category from "./pages/Category";
import Announcement from "./components/Announcement";

function App() {
  const [newProducts, setNewProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const fetchNewProducts = async () => {
    const { data } = await commerce.products.list({
      sortBy: "created_at",
      sortDirection: "desc",
      limit: 4,
    });
    setNewProducts(data);
  };

  const fetchCategories = async () => {
    const { data } = await commerce.categories.list({
      include: "breadcrumbs",
    });
    setCategory(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handleAddToCart = async (productId, quantity, variantInfo) => {
    if (variantInfo) {
      commerce.cart.add(productId, quantity, variantInfo).then((res) => {
        setCart(res.cart);
      });
    }
  };

  const handleUpdateCart = async (productId, quantity) => {
    const cart = await commerce.cart.update(productId, { quantity });
    setCart(cart.cart);
  };
  const handleRemoveCart = async (productId) => {
    const cart = await commerce.cart.remove(productId);
    setCart(cart.cart);
  };
  const handleEmptyCart = async () => {
    const cart = await commerce.cart.empty();
    setCart(cart.cart);
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
    fetchNewProducts();
    fetchCategories();
    fetchCart();
  }, []);
  console.log(order);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Announcement />
        <NavBar category={category} />
        <Routes>
          <Route
            path={"/cart"}
            element={
              <Cart
                cart={cart}
                onUpdateCart={handleUpdateCart}
                onRemoveCart={handleRemoveCart}
                onEmptyCart={handleEmptyCart}
              />
            }
          />
          <Route
            path={"/item/:id"}
            element={<ProductDetails onAddToCart={handleAddToCart} />}
          />
          <Route path={"/shop"} element={<Products categories={category} />} />
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
          <Route path="/" element={<Home products={newProducts} />} />
          <Route path="/About" element={<About />} />

          <Route
            path="/products/:category"
            element={<Category categories={category} />}
          />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
