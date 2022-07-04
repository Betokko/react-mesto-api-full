import React, { useEffect } from "react";
import logo from "../../images/logo.png";
import { Link, useHistory } from "react-router-dom";
import * as auth from "../../utils/auth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";


function Header({ name, url, loggedIn, onLoggedIn, userData }) {

  const history = useHistory()

  function handleExitButton() {
    localStorage.clear()
    onLoggedIn()
    history.push('/')
  }

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      <div>
        {loggedIn ? userData.email : <Link to={url} style={{color: "white", textDecoration: "none",}}>{name}</Link>}
        {loggedIn ? <Link to='#' onClick={handleExitButton} style={{color: "#A9A9A9", textDecoration: "none", marginLeft: "24px"}}>Выйти</Link> : ''} 
      </div>
    </header>
  );
}

export default Header;
