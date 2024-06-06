import React from 'react';
import "../styles/login.css";
import { Link } from "react-router-dom";
import { ErrorMessage, Form, Formik, } from "formik";
import * as Yup from "yup";
import FormikInput from "../components/FormikInput";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
    const initialValues: LoginForm = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().required("Doldurulması zorunlu alan*"),
        password: Yup.string()
        .required("Doldurulması zorunlu alan*"),
    });

    const handleLogin = () => {};

    return (
        <div className="full-height">
            <div className="centered-form">
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleLogin}
                >
                    {({ isSubmitting }) => (
                        <Form className="row g-3 form-width">
                            <div className="col-12 mt-3">
                            <label htmlFor="email">E-Mail: </label>
                                <FormikInput placeholder="E-Posta" name="email" />
                            </div>
                            <div className="col-12 mt-2">
                            <label htmlFor="password">Şifre: </label>
                                <FormikInput
                                    type="password"
                                    placeholder="Şifre"
                                    name="password"
                                />
                            </div>

                            <ErrorMessage name="colorId" component="div" />

                            <button
                                type="submit"
                                className="btn fw-bold btn-login btn-color form-width"
                            >
                                Giriş Yap
                            </button>
                            <div className="col-12">
                                <p className="mt-2 d-block">
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
                                    Henüz hesabın yok mu?
                                    <Link
                                        className="text-decoration-none text-muted fw-bold "
                                        to="/register"
                                    >
                                        {" "} Kayıt Ol
                                    </Link>
                                </small>
                            </label>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default Login;
