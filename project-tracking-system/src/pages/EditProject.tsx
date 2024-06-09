import { Formik, Field, Form, ErrorMessage } from 'formik';
import React, { useEffect, useState } from "react";
import * as Yup from 'yup';
import assignmentService from '../services/assignmentService';
import { GetAllAssignmentResponse } from '../models/responses/assignment/getAllAssignmentResponse';



export default function EditProject() {
    useEffect(() => {
        fetchAssignments();
      }, []);
    const [assignments, setAssignments] = useState<GetAllAssignmentResponse[]>([]);
    const fetchAssignments = async () => {
    
        const response = await assignmentService.getAll(
          0,
          10,
        );
        setAssignments(response.data.items.map((assignment: GetAllAssignmentResponse) => ({
          ...assignment,
          createdDate: new Date(assignment.createdDate)
        })))
      }

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
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div
              >
                      <h5 className="modal-title" id="exampleModalLabel">
                       Projeyi Düzenle
                      </h5>

                    </div>
                    
                      <div className="form-group">
                        <label htmlFor="name">Proje adı</label>
                        <Field name="name" type="text" className="form-control" />
                        <ErrorMessage name="name" component="div" className="text-danger" />
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
                    
                      <button type="submit" className="btn rounded-pill modalButton float-end mt-3" disabled={isSubmitting}>
                        Kaydet
                      </button>
            </Form>
          )}
        </Formik>
      </div>
      <div>
      <table className="table mt-5">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Görev Başlığı</th>
        <th scope="col">Açıklama</th>
        <th scope="col">Oluşturulma Tarihi </th>
        <th scope="col">Durumu </th>
        
      </tr>
    </thead>
        <tbody className="">
          {assignments.map((assignment, index) => (
            <tr key={index} >
              <th scope="row">{index+1}</th>
              <th>{assignment.title}</th>
              <th>{assignment.description}</th>
              <th>{assignment.createdDate.toDateString()}</th>
              <th>{assignment.statusText}</th>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </>
  );
}
