import React, { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import FooterGuest from "./FooterGuest";
import FooterUser from "./FooterUser";

import "./Footer.scss";
import Logo from "../../assets/img/logoWhite.svg";

const Footer = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <Link to="/">
            <img src={Logo} alt="Logo" />
          </Link>
          {isLogin ? <FooterUser /> : <FooterGuest />}
        </div>
        <hr />
        <div className="footer__copyright">
          <p>© 2021 Justice-it. All rights reserved.</p>
          <p>© 2021 Justice-it. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
