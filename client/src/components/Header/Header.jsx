import React, { useContext } from "react";
import { Link } from "react-router-dom";

import HeaderGuest from "./HeaderGuest";
import HeaderUser from "./HeaderUser";
import AuthContext from "../../context/AuthContext";

import "./Header.scss";
import Logo from "../../assets/img/logoBlack.svg";

const Header = () => {
  const { isLogin } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__title">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          {isLogin ? <HeaderUser /> : <HeaderGuest />}
        </div>
      </div>
      <hr />
    </header>
  );
};

export default Header;
