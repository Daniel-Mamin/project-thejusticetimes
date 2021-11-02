import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

const FooterUser = () => {
  const { id, logout } = useContext(AuthContext);

  const userList = [
    {
      name: "All articles",
      link: "/",
    },
    {
      name: "My articles",
      link: `/myArticles/${id}`,
    },
    {
      name: "Add article",
      link: "/addArticle",
    },
    {
      name: "Profile",
      link: `/profile/${id}`,
    },
  ];

  return (
    <div className="footer__user">
      <ul className="footer__user-list">
        {userList.map((item, index) => (
          <NavLink
            exact
            key={index}
            to={item.link}
            className="footer__user-item"
          >
            {item.name}
          </NavLink>
        ))}
      </ul>
      <button className="footer__btn" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default FooterUser;
