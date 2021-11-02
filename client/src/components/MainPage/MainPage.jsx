import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

import PopularArticles from "./AllArticles/PopularArticles/PopularArticles";
import AllArticles from "./AllArticles/AllArticles";
import Pagination from "./Pagination/Pagination";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./MainPage.scss";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [popularArticle, setPopularArticle] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  const fetchArticles = useCallback(async () => {
    try {
      return await axios.get("/api/article/");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles().then(res => {
      setPopularArticle(res.data.popularArticle);
      setArticles(res.data.articles);
      setTimeout(() => setLoading(false), 1000)
    });
  }, []);

  const lastArticleIndex = currentPage * articlesPerPage;
  const firstArticleIndex = lastArticleIndex - articlesPerPage;
  const currentArticles = articles.slice(firstArticleIndex, lastArticleIndex);

  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);
  
  return (
    <>
      {
        loading ?
          <div className="main">
            <Loader
              className="loader"
              type="TailSpin"
              color="#282828"
              height={250}
              width={250}
            />
          </div>
        :
          <>
            { articles.length !== 0 ? (
              <main className="main">
                <div className="container">
                  <div className="main__wrapper">
                    <PopularArticles article={popularArticle} />
                    <div className="main__popular">
                      <h1 className="main__popular-title">Popular articles</h1>
                      <div className="main__popular-content">
                        <AllArticles articles={currentArticles} />
                        <Pagination
                          disabledPrev={currentPage}
                          disabledNext={lastArticleIndex >= articles.length}
                          nextPage={nextPage}
                          prevPage={prevPage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            ) : (
              <div className="main__no-articles">
                <div className="container">
                  <h1>No articles...</h1>
                </div>
              </div>
            )}
          </>
      }
    </>
  );
};

export default MainPage;
