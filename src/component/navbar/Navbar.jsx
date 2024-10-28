import React from 'react'
import { Link } from 'react-router-dom';
import style from "./navbar.module.css"

const Navbar = () => {
  return (

    <div>
      <h1>Book Catalog Management System</h1>
      <nav className={style.navcontainer}>
        <ul>
          <li>
            <Link to="/">AddBook</Link>
          </li>
          <li>
            <Link to="/booklist">BookList</Link>
          </li>
          <li>
            <Link to="/edit">EditBook</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar