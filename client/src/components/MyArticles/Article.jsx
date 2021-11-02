import React from "react";
import moment from "moment";

import noPhoto from "../../assets/img/noPhoto.png";
import views from "../../assets/img/views.svg";

const Article = ({image, tag, title, description, date, count, avatar, l_name, f_name}) => {

  return (
    <li className="my-articles__item">
      <div className="my-articles__item-img">
        <img src={`../${image}`} alt="ImagePhoto" />
      </div>
      <div className="my-articles__item-tag">
        <span className="tag">{tag}</span>
      </div>
      <h2 className="my-articles__item-title">{title}</h2>
      <p
        className="my-articles__item-description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <div className="main__popular-list__item-user">
        <img className="user-avatar" src={!!avatar ? `../${avatar}` : noPhoto} alt="user-avatar" />
        <span className="user-name">{`${f_name} ${l_name}`}</span>
        <div className="user-info">
          <span>{moment(date).format("MMM DD")} · 5 min read</span>
        </div>
        <div className="user-views">
          <img src={views} alt="ViewsLogo" />
          <span>{count}</span>
        </div>
      </div>
    </li>
  );
};

export default Article;
