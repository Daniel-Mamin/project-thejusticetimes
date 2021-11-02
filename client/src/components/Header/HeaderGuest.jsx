import React from "react";
import { Link } from "react-router-dom";

const HeaderGuest = () => {
  return (
    <div className="header__guest">
      <Link to="/login" className="header__link">
        <button className="header__btn">Log in</button>
      </Link>
      <Link to="/singin" className="header__link">
        <button className="header__btn">Sign in</button>
      </Link>
    </div>
  );
};

export default HeaderGuest;
