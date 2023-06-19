import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import styles from "./App.module.css";
import Products from "./components/products/Products";
import { commerce } from "./library/commerce/commerce";
import { useEffect, useState } from "react";
import Cart from "./components/cart/Cart";
import ProductDetails from "./components/products/ProductDetails";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };
  const handleAddToCart = async (itemId, quantity, optionId) => {
    const item = await commerce.cart.add(itemId, quantity, optionId);
    console.log(item);
    setCart(item);
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
    setCart(cart?.line_items);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(products);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <NavBar totalItems={cart?.total_items} />
        <Routes>
          <Route path={"/cart"} element={<Cart cart={cart} handleUpdateCart={handleUpdateCart} handleRemoveCart={handleRemoveCart} handleEmptyCart={handleEmptyCart} />} />
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
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
