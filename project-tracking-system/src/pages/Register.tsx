import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../styles/register.css';

const Register: React.FC = () => {
  return (
    <div className="full-height">
      <div className="centered-form">
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .required("Doldurulması zorunlu alan"),
            lastName: Yup.string()
              .required("Doldurulması zorunlu alan"),
            email: Yup.string()
              .email('Geçersiz mail adresi')
              .required("Doldurulması zorunlu alan"),
            password: Yup.string()
              .min(6, 'En az 6 karakter olmalı, bir küçük harf, bir büyük harf ve bir özel karakter içermeli')
              .required("Doldurulması zorunlu alan"),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password')], 'Şifreler aynı olmalı')
              .required("Doldurulması zorunlu alan"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          <Form>
            <div className="form-group form-width">
              <label htmlFor="firstName">İsim</label>
              <Field name="firstName" type="text" className="form-control" />
              <ErrorMessage name="firstName" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Soyisim</label>
              <Field name="lastName" type="text" className="form-control" />
              <ErrorMessage name="lastName" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Şifre</label>
              <Field name="password" type="password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Şifre Tekrarı</label>
              <Field name="confirmPassword" type="password" className="form-control" />
              <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary">Kayıt Ol</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
