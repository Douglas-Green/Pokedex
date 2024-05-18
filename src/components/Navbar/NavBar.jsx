/** @format */

import {Link} from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-home-link">
          <Link to="/">Home</Link>
        </li>
        <li className="navbar-pokeList-link">
          <Link to="/pokemon-list">Pokemon List</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
