import React from "react";

import noPhoto from "../../../../assets/img/noPhoto.png";
import views from "../../../../assets/img/views.svg";
import moment from "moment";

const Article = ({ date, tag, title, description, count, image, _id, user }) => {
  
  return (
    <li className="main__popular-list__item">
      <div className="main__popular-list__item-img">
        <img src={image} alt="Image" />
      </div>
      <div className="main__popular-list__item-content">
        <span className="tag">{tag}</span>
        <h2>{title}</h2>
        <p dangerouslySetInnerHTML={{ __html: description.substr(0, 205) }} />
        <div className="main__popular-list__item-user">
          <img className="user-avatar" src={!!user[0].avatar ? `../${user[0].avatar}` : noPhoto} alt="user-avatar" />
          <span className="user-name">{`${user[0].f_name} ${user[0].l_name}`}</span>
          <div className="user-info">
            <span>{moment(date).format("MMM DD")} · 5 min read</span>
          </div>
          <div className="user-views">
            <img src={views} alt="ViewsLogo" />
            <span>{count}</span>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Article;
