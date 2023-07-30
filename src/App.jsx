import { BrowserRouter as MyRoute, Route, Routes } from "react-router-dom";
import "./App.css";
import Productos from "./Components/Producto/Productos";
import DetailsProduct from "./Components/Producto/DetailsProduct";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";

function App() {
  return (
    <MyRoute>
      <Navbar />
      <div style={{ marginTop: "100px" }}>
        <Routes>
          {/* <Route path="" element={<Home />} /> */}
          <Route path="" element={<Productos />} />
          <Route path="/detallesproducto/:ID" element={<DetailsProduct />} />
          <Route path="/navbar" element={<Navbar />} />
        </Routes>
      </div>
    </MyRoute>
  );
}

export default App;
