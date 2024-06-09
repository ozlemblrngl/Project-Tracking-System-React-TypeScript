import { Formik, Field, Form, ErrorMessage } from 'formik';
import React from "react";
import * as Yup from 'yup';
import "../styles/projectAddModal.css"
import projectService from '../services/projectService';
import { GetAllProjectResponse } from "../models/responses/project/getAllProjectResponse";
import { AddProjectRequest } from '../models/requests/project/addProjectRequest';


interface projectAddModalProps{
  fetchProjects : () => Promise<void>
}

const ProjectAddModal :  React.FC<projectAddModalProps> = ({fetchProjects}) => {

  const addProjectRequest = async (values: AddProjectRequest) => {
    try {
      const response = await projectService.add(values);
      fetchProjects();
      
    } catch (error) {
      console.error("Project add error:", error);
    }
  };

  return (
    <>
      <div className="centered-form">
        <Formik
          initialValues={{
            name: '',
            startDate: '',
            endDate: '',
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .required("Doldurulması zorunlu alan"),
            startDate: Yup.date()
              .required("Doldurulması zorunlu alan"),
            endDate: Yup.date()
              .required("Doldurulması zorunlu alan"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const transformedValues: AddProjectRequest = {
              ...values,
              startDate: new Date(values.startDate),
              endDate: new Date(values.endDate),
              userId : localStorage.getItem("userId")!
            };
            try {
              await addProjectRequest(transformedValues);
              setSubmitting(false);
              document.getElementById("exampleModal")?.click();
            } catch (error) {
              console.error("Project add error:", error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div
                role="dialog"
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog  ">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        Yeni Proje Ekle
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label htmlFor="name">Proje adı</label>
                        <Field name="name" type="text" className="form-control" />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                      </div>
                      <div className="form-group ">
                        <label htmlFor="startDate">Başlangıç Tarihi</label>
                        <Field name="startDate" type="date" className="form-control" />
                        <ErrorMessage name="startDate" component="div" className="text-danger" />
                      </div>
                      <div className="form-group ">
                        <label htmlFor="endDate">Bitiş Tarihi</label>
                        <Field name="endDate" type="date" className="form-control" />
                        <ErrorMessage name="endDate" component="div" className="text-danger" />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn rounded-pill shadow closeButton"
                        data-bs-dismiss="modal"
                      >
                        Kapat
                      </button>
                      <button type="submit" className="btn rounded-pill modalButton" disabled={isSubmitting}  >
                        Kaydet
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
export default ProjectAddModal;
