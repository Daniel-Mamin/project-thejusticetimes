import React from "react";

import { Link } from "react-router-dom";

import Article from "./Article/Article";

const AllArticles = ({ articles }) => {

  return (
    <ul className="main__popular-list">
      {articles &&
        articles.map((article) => (
          <Link key={article._id} to={`/article/${article._id}`}>
            <Article {...article} />
          </Link>
        ))}
    </ul>
  );
};

export default AllArticles;
