import React, {useCallback, useEffect, useState, useContext} from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

import Article from "./Article";
import AuthContext from "../../context/AuthContext";
import noPhoto from "../../assets/img/noPhoto.png";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./MyArticles.scss";

const MyArticles = () => {
  const {id, token} = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const fetchArticles = useCallback(async () => {
   try {
     return await axios.get(`/api/article/user/${id}/articles`, {
       headers: {
         "Authorization": `${token}`
       }
     });
    } catch (error) {
     console.log(error);
     setLoading(false);
    }
   },[]);

 useEffect(() => {
    fetchArticles()
      .then(res => {
        setUser(res.data);
        setTimeout(() => setLoading(false), 1000);
      })
      .catch(error => {
        if (error.response) {
          console.log(error.response.data.message);
        } else if (error.request) {
          console.log("Request", error.request);
        } else {
          console.log("Error", error.message);
        }
      });
   },
   []);

  return (
    <>
      {
        loading
        ? (
            <div className="my-articles">
              <Loader
                className="loader"
                type="TailSpin"
                color="#282828"
                height={250}
                width={250}
              />
            </div>
          )
        : (
            <div className="my-articles">
              <div className="container">
                <div
                  className={`my-articles__wrapper${
                    user.articles?.length === 0 ? " my-articles__wrapper_no" : ""
                  }`}
                >
                  <div className="my-articles-user">
                    <div className="my-articles-user__info">
                      <div className="my-articles-user__info-wrapper">
                        <img src={!!user.avatar ? `../${user.avatar}` : noPhoto} alt="user-avatar" />
                        <p>{user.f_name}</p>
                        <p>{user.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="my-articles-content">
                    {user.articles?.length !== 0 ? (
                      <ul className="my-articles__list">
                        {user.articles?.map((article) => (
                          <Article
                            key={article._id}
                            {...article}
                            avatar={user.avatar}
                            f_name={user.f_name}
                            l_name={user.l_name}
                          />
                        ))}
                      </ul>
                    ) : (
                      <div className="my-articles-content_no">
                        <h1>You have nothing yet...</h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
        )
      }
    </>


  );
};

export default MyArticles;
