import styles from "./App.module.scss";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
function App() {

  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <div className="flex-fill">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
