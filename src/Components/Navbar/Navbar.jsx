import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar animated fadeInDown">
        <div className="container">
          <Link
            className="navbar-brand"
            to="/"
            style={{ margin: "0", padding: "0" }}
          >
            <strong>
              Store<span>online</span>.
            </strong>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ">
                <Link className="nav-link" to="/">
                  <i className="fa fa-home" style={{ marginRight: "5px" }}></i>{" "}
                  Inicio
                </Link>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">
                  <i className="fa fa-list" style={{ marginRight: "5px" }}></i>
                  Servicios
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
