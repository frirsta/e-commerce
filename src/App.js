import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import styles from "./App.module.css";
import Products from "./components/products/Products";
import { commerce } from "./library/commerce/commerce";
import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await commerce.products.list();
      setProducts(data);
     
    };
    fetchProducts()
  }, [])
  console.log(products)
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <NavBar />
        <Products products={products} />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
