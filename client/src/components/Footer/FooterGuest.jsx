import React from "react";
import { Link } from "react-router-dom";

const HeaderGuest = () => {
  return (
    <div className="footer__guest">
      <Link to="/login" className="footer__link">
        <button className="footer__btn">Log in</button>
      </Link>
      <Link to="/singin" className="footer__link">
        <button className="footer__btn">Sign in</button>
      </Link>
    </div>
  );
};

export default HeaderGuest;
