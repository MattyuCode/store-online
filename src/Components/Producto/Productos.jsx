/* SEGUIR EDITANDO EL PRODUCT PARA TENERLO CON CATEGORIAS Y REVISAR BIEN LA APIs 
  DEJARLO COMO EN ESTE VIDEO  https://www.youtube.com/watch?v=IhVUwhZsXHo
   https://dummyjson.com/
  */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Productos = () => {
  const [productos, setProducto] = useState([]);
  const [category, setCategory] = useState([]);
  const [currency, setCurrency] = useState(0);
  const [search, setSearch] = useState("");
  const environment = import.meta.env.VITE_ACCESS_KEY;

  useEffect(() => {
    const fechaData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducto(data.products);

        const responseCategorys = await fetch(
          "https://dummyjson.com/products/categories"
        );
        const dataCategorys = await responseCategorys.json();
        setCategory(dataCategorys);

        const responseCurrency = await fetch(
          `https://v6.exchangerate-api.com/v6/${environment}/latest/USD`
        );
        const dataCurrency = await responseCurrency.json();
        // console.log(dataCurrency)
        setCurrency(dataCurrency.conversion_rates.GTQ);
      } catch (error) {
        console.error(error.message);
      }
    };

    fechaData();
  }, [environment]);

  const searchByCategory = async (category) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = await response.json();
      setProducto(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  // const buscar = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://dummyjson.com/products/search?q=${search}`
  //     );
  //     const data = await response.json();
  //     setProducto(data.products);
  //     // console.log(data.products);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const searchProducts = async (e) => {
    const valor = e.target.value;
    setSearch(valor);
    // buscar();

    // const delay = 100;
    // const debounceTimeout = setTimeout(async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${search}`
      );
      const data = await response.json();
      setProducto(data.products);
    } catch (error) {
      console.log(error);
    }
    // }, delay);
    // console.log(e.target.value);
    // return () => clearTimeout(debounceTimeout);
  };

  return (
    <div className="container">
      <form className="form-inline d-flex justify-content-center md-form mr-auto mb-4 ">
        <i className="fas fa-search" aria-hidden="true"></i>
        <input
          className="form-control form-control-sm ml-3 w-75"
          type="search"
          value={search}
          placeholder="Buscar productos"
          aria-label="Search"
          onChange={searchProducts}
        />
      </form>

      <div className="row">
        <div className="col-md-3 animated animate__fadeIn">
          {/* Render the list of categories */}
          <div className="list-group">
            <h5 className="list-group-item active text-center">CATEGORÍAS</h5>
            {category.map((category, index) => (
              <Link
                key={index}
                className="list-group-item list-group-item-action"
                onClick={() => searchByCategory(category)}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        <div className="col-md-9">
          {productos.length === 0 ? (
            <div className="alert alert-danger h4 text-center">
              No se encontraron datos
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4  animated  animate__fadeIn">
              {productos.map((item, index) => (
                <div key={index} className="col mb-4">
                  <div className="card">
                    <img src={item.images[0]} alt="" className="card-img-top" />
                    <div className="card-body">
                      <span className="bg-success position-relative badge rounded-pill mb-1">
                        Stock
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {item.stock}+
                        </span>
                      </span>
                      <h5 className="card-title text-center">{item.title}</h5>
                      <p className="card-text text-justify">
                        {item.description}
                      </p>
                      <strong className="precio h3 text-danger">
                        Q{" "}
                        {Number(
                          (item.price * currency).toFixed(2)
                        ).toLocaleString("es-GT", { minimumFractionDigits: 2 })}
                        {/* Q {(item.price * currency).toFixed(2)} */}
                      </strong>
                      <div className="d-grid gap-2 d-flex justify-content-center mt-3">
                        <Link
                          to={`/detallesproducto/${item.id}`}
                          className="btn btn-info btn-rounded btn-sm "
                          style={{ color: "white", fontSize: "15px" }}
                        >
                          Ver detalles
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productos;
