import React, {useCallback, useState, useContext, useEffect} from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import Loader from "react-loader-spinner";

import noPhoto  from "../../assets/img/noPhoto.png";
import AuthContext from "../../context/AuthContext";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./Profile.scss";

const Profile = () => {
  const {id, token} = useContext(AuthContext);
  const [f_name, setFName] = useState("");
  const [l_name, setLName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState(null);
  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(true);

  const validationSchema = yup.object().shape({
    f_name: yup
      .string()
      .min(3, "Must be more than 3 characters.")
      .required("Please enter a first name."),
    l_name: yup
      .string()
      .min(3, "Must be more than 3 characters.")
      .required("Please enter a last name."),
    description: yup
      .string()
      .min(10, "Must be between 10 and 120 characters.")
      .max(120, "Must be between 10 and 120 characters.")
      .required("Please enter a description."),
  });

  const fetchProfile = useCallback(async () => {
    try {
      return await axios.get(`/api/profile/${id}`, {
        headers: {
          "Authorization": `${token}`
        }
      })
    } catch (error) {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    fetchProfile()
      .then((res) => {
        setFName(res.data.f_name)
        setLName(res.data.l_name)
        setDescription(res.data.description);
        setAvatar(res.data.avatar);
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
  }, []);

  const onSubmitForm = async ({ f_name, l_name, description }) => {
    setLoading(true);

    const data = new FormData();

    data.append("image", img);
    data.append("f_name", f_name);
    data.append("l_name", l_name);
    data.append("description", description);

    await axios.patch(`/api/profile/${id}`, data, {
      headers: {
        "Authorization": `${token}`,
        "Content-Type": "multipart/form-data; boundary=\"another cool boundary\"",
      }
    })
      .then(res => {
        setFName(res.data.f_name);
        setLName(res.data.l_name);
        setDescription(res.data.description);
        setAvatar(res.data.avatar);
        setImg(null);
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
  };

  const onDeletePhoto = async () => {
    setLoading(true);

    await axios.put(`/api/profile/deletePhoto`, {}, {
      headers: {
        "Authorization": `${token}`
      }
    })
      .then(res => {
        setAvatar(null);
        setImg(null);
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
  };

  return (
    <div className="profile">
      {
        loading
        ? (
          <Loader
            className="loader"
            type="TailSpin"
            color="#282828"
            height={250}
            width={250}
          />
        ) : (
            <div className="container">
              <div className="profile__wrapper">
                <Formik
                  initialValues={{
                    f_name,
                    l_name,
                    description,
                    image: img
                  }}
                  validateOnBlur
                  onSubmit={(values) => onSubmitForm(values)}
                  validationSchema={validationSchema}
                >
                  {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      isValid,
                      handleSubmit,
                      dirty,
                    }) => (
                    <form className="profile__form">
                      <div className="profile__form-avatar">
                        <div className="profile__form-avatar__block">
                          {
                            avatar
                            ? (
                              <img
                                className="profile__form-avatar__img"
                                src={`../${avatar}`}
                                alt="user-avatar"
                              />
                            )
                            : (
                              <img
                                className="profile__form-avatar__img"
                                src={noPhoto}
                                alt="user-avatar"
                              />
                            )

                          }
                          {avatar ? (
                            <>
                              <input
                                className="profile__form-avatar__input"
                                type="file"
                                id="file"
                                name="image"
                                onChange={e => setImg(e.target.files[0])}
                              />
                              <label
                                className="profile__form-avatar__label"
                                htmlFor="file"
                              >
                                Change photo
                              </label>
                            </>
                          ) : (
                            <>
                              <input
                                className="profile__form-avatar__input"
                                type="file"
                                id="file"
                                name="image"
                                onChange={e => setImg(e.target.files[0])}
                              />
                              <label
                                className="profile__form-avatar__label"
                                htmlFor="file"
                              >
                                Upload photo
                              </label>
                            </>
                          )}
                          <p
                            className={`profile__form-avatar__btn ${
                              avatar ? " " : " not_visible"
                            }`}
                            onClick={onDeletePhoto}
                          >
                            Delete photo
                          </p>
                        </div>
                      </div>
                      <div className="profile__form-info">
                        <div className="profile__form-info__block">
                          <p>
                            <label
                              className="profile__form-info__label"
                              htmlFor="f_name"
                            >
                              First name
                            </label>
                            <input
                              className="profile__form-info__input"
                              type="text"
                              name="f_name"
                              id="f_name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.f_name}
                            />
                            {touched.f_name && errors.f_name && (
                              <span className="profile__form-info__error">
                        {errors.f_name}
                      </span>
                            )}
                          </p>
                          <p>
                            <label
                              className="profile__form-info__label"
                              htmlFor="l_name"
                            >
                              Last name
                            </label>
                            <input
                              className="profile__form-info__input"
                              type="text"
                              name="l_name"
                              id="l_name"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.l_name}
                            />
                            {touched.l_name && errors.l_name && (
                              <span className="profile__form-info__error">
                        {errors.l_name}
                      </span>
                            )}
                          </p>
                        </div>
                        <div className="profile__form-info__block">
                          <p>
                            <label
                              className="profile__form-info__label"
                              htmlFor="description"
                            >
                              Description
                            </label>
                            <textarea
                              className="profile__form-info__textarea"
                              name="description"
                              id="description"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.description}
                            />
                            {touched.description && errors.description && (
                              <span className="profile__form-info__error">
                        {errors.description}
                      </span>
                            )}
                          </p>
                        </div>
                        <div className="profile__form-info__block">
                          <button
                            className="profile__form-info__btn"
                            type="submit"
                            disabled={!isValid && !dirty}
                            onClick={handleSubmit}
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
        )
      }
    </div>
  );
};

export default Profile;
