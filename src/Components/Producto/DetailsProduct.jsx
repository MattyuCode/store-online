import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { ThreeCircles } from "react-loader-spinner";

const DetailsProduct = () => {
  const environment = import.meta.env.VITE_ACCESS_KEY;
  const [productos, setProducto] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState(0);
  const { ID } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  // console.log(productos.images[0]);
  //https://i.dummyjson.com/data/products/14/1.jpg

  useEffect(() => {
    const fechaData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${ID}`);
        const data = await response.json();
        setProducto(data);
        setIsLoading(false);

        const convert = await fetch(
          `https://v6.exchangerate-api.com/v6/${environment}/latest/USD`
        );
        const dataco = await convert.json();
        setCurrency(dataco.conversion_rates.GTQ);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fechaData();
  }, [ID, environment]);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <ThreeCircles
          height="150"
          width="150"
          color="#8ab3a0"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    );
  }

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
  };

  return (
    <div className="container">
      <div
        className="card mb-3 d-flex justify-content-center"
        style={{ padding: "30px" }}
      >
        <div className="row g-0">
          <div className="col-md-5">
            {productos.images ? (
              <img
                // src={productos.thumbnail}
                src={productos.images[selectedImage]}
                className="card-img-top"
                alt={productos.title}
              />
            ) : (
              <img
                src="https://www.oaxaca.gob.mx/consejeriajuridica/wp-content/uploads/sites/19/2019/05/no-photo.png"
                className="card-img-top"
                alt={productos.title}
              />
            )}
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h5 className="card-title">{productos.title}</h5>
              <span className="bg-success position-relative badge rounded-pill mb-1">
                Stock
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {productos.stock}+
                </span>
              </span>

              <p className="">{productos.brand}</p>
              <p className="card-text">{productos.description}</p>
              <p>
                {productos.rating}{" "}
                <strong style={{ fontSize: "20px", fontWeight: "800" }}>
                  |
                </strong>
              </p>
              <p className="card-text">
                <strong style={{ color: "red", fontSize: "35px" }}>
                  Q {Number((productos.price * currency).toFixed(2)).toLocaleString("es-GT", {minimumFractionDigits: 2})}
                  {/* Q.{(productos.price * currency).toFixed(2)} */}

                </strong>
              </p>
            </div>

            <div
              className="imagenes"
              style={{
                textAlign: "center",
                background: "#f5f5f5",
                padding: "10px",
              }}
            >
              {productos.images &&
                productos.images.map((image, index) => (
                  <img
                    src={image}
                    key={index}
                    alt={`Thumbnail ${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      margin: "5px",
                      cursor: "pointer",
                      border:
                        selectedImage === index ? "2px solid red" : "none",
                    }}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      <Link to="/" className="btn btn-outline-danger">
        <BsArrowLeft /> Regresar
      </Link>
    </div>
  );
};

export default DetailsProduct;
