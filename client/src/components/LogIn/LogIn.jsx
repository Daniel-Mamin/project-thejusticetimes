import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

import AuthContext from "../../context/AuthContext";
import "./LogIn.scss";

const LogIn = () => {
  const { login, isLogin } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter email address."),
    password: yup
      .string()
      .min(8, "Must be between 8 and 16 characters.")
      .max(16, "Must be between 8 and 16 characters.")
      .required("Please enter a password."),
  });

  const onSubmitForm = async ({ email, password }) => {
    try {
      const response = await axios.post(
        "/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setErrorMessage(null);
      login(response.data.token, response.data.userId);
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        console.log("Request", error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  return (
    <>
      {isLogin && <Redirect to="/" />}
      <div className="login">
        <div className="container">
          <div className="login__wrapper">
            <h1 className="login__title">Log in to your account</h1>
            <Formik
              initialValues={{
                email: "",
                password: "",
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
                <form className="form">
                  <p>
                    <label htmlFor="email" className="form__label">
                      Email Address
                    </label>
                    <input
                      id="email"
                      className="form__input"
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </p>
                  {touched.email && errors.email && (
                    <span className="form__error">{errors.email}</span>
                  )}
                  <p>
                    <label htmlFor="password" className="form__label">
                      Password
                    </label>
                    <input
                      id="password"
                      className="form__input"
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </p>
                  {touched.password && errors.password && (
                    <span className="form__error">{errors.password}</span>
                  )}
                  <button
                    className="form__button"
                    disabled={!isValid && !dirty}
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Create Account
                  </button>
                  {errorMessage ? (
                    <span className="error">{errorMessage}</span>
                  ) : (
                    <span></span>
                  )}
                </form>
              )}
            </Formik>
            <p className="login__link">
              Don’t have a Times account?{" "}
              <Link to="/singin">
                <span>Create one</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
