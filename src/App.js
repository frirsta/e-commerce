import { BrowserRouter} from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import styles from './App.module.css';


function App() {
  return (
    <div className={styles.App}>
    <BrowserRouter>
  <NavBar />

<Footer />
    </BrowserRouter>
    </div>
  );
}

export default App;
