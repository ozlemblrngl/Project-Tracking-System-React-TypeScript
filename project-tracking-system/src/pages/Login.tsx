import React from 'react';
import "../styles/login.css";
import { Link } from "react-router-dom";
import { ErrorMessage, Form, Formik, } from "formik";
import * as Yup from "yup";
import FormikInput from "../components/FormikInput";
import authService from '../services/authService';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";



interface Login {
  email: string;
  password: string;
}

const Login: React.FC = () => {
    const initialValues: Login = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().required("Doldurulması zorunlu alan*"),
        password: Yup.string()
        .required("Doldurulması zorunlu alan*"),
    });
    const navigate = useNavigate();


    const handleLogin = async (
        values: Login,
        {
          setSubmitting,
          setErrors,
        }: {
          setSubmitting: (isSubmitting: boolean) => void;
          setErrors: (errors: Record<string, string>) => void;
        }
      ) => {
        try{
            const token = await authService.login(values);
    
            localStorage.setItem("user", JSON.stringify(token));

            const decodedToken: any = token ? jwtDecode(token) : null;
            const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
        
            localStorage.setItem("userId", JSON.stringify(userId).replaceAll('"',''));

            navigate("home-page");
        }catch (error) {

            console.error("Kimlik doğrulama hatası:", (error as Error).message);
            setErrors({ password: "Kimlik doğrulama hatası" }); 
          } finally {
            setSubmitting(false);
          }
      }

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
