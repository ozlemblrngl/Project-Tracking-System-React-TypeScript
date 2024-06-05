import React from 'react';
import "../styles/login.css";
import { Link } from "react-router-dom";
import { ErrorMessage, Form, Formik, } from "formik";
import * as Yup from "yup";
import FormikInput from "../components/FormikInput";


type Props = {};
interface LoginForm {
  email: string;
  password: string;
}
const Login = () => {
    const initialValues: LoginForm = {
        email: "",
        password: "",
      };

      const validationSchema = Yup.object({
        email: Yup.string().required("Doldurulması zorunlu alan*"),
        password: Yup.string().required("Doldurulması zorunlu alan*"),
      });
      const handleLogin = ()=>{};
    
      return (
    <>
  <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="row g-3">
              <div className="col-12 mt-3">
                <FormikInput placeholder="E-Posta" name="email" />
              </div>
              <div className="col-12 mt-2">
                <FormikInput
                  type="password"
                  placeholder="Şifre"
                  name="password"
                />
              </div>

              <ErrorMessage name="colorId"></ErrorMessage>

              <button
                type="submit"
                className="btn fw-bold btn-login btn-primary w-100"
              >
                Giriş Yap
              </button>
              <div className="col-12 ">
                <p className="  mt-2 d-block">
                  <Link
                    className="nav-link link-secondary center-footer"
                    to="/forgotPassword"
                  >
                    Şifremi Unuttum
                  </Link>
                </p>
              </div>
              <label className="center-footer">
                <small>
                  Henüz üye değil misin?
                  <Link
                    className="text-decoration-none text-muted fw-bold"
                    to="/register"
                  >
                    {" "}
                    Kayıt Ol
                  </Link>
                </small>
              </label>
            </Form>
          );
        }}
      </Formik>
    </>
  )
}

export default Login;