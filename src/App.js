import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import styles from "./App.module.css";
import Products from "./components/products/Products";
import { commerce } from "./library/commerce/commerce";
import { useEffect, useState } from "react";
import Cart from "./components/cart/Cart";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (itemId, quantity) => {
    const item = await commerce.cart.add(itemId, quantity);
    console.log(item);
    setCart(item);
  };

  console.log(products);
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <NavBar totalItems={cart?.total_items} />
        <Routes>
          <Route path={"/cart"} element={<Cart cart={cart} />} />
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
