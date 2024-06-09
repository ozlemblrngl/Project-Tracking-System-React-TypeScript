import { Formik, Field, Form, ErrorMessage } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import assignmentService from "../services/assignmentService";
import { GetAllAssignmentResponse } from "../models/responses/assignment/getAllAssignmentResponse";
import { UpdateProjectRequest } from "../models/requests/project/updateProjectRequest";
import projectService from "../services/projectService";
import { GetAllProjectResponse } from "../models/responses/project/getAllProjectResponse";
import { useParams } from "react-router-dom";
import { GetProjectResponse } from "../models/responses/project/getProjectResponse";
import "../styles/editProject.css"

interface editProjectProps{
  project : GetAllProjectResponse
}

const EditProject = () => {
  const id = useParams<{ id: string }>();
  const [project, setProjectValues] = useState<GetProjectResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectService.getById(id.id!);
        setProjectValues(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching project:', error);
        setLoading(false); 
      }
    };

    fetchProject();
    fetchAssignments();
  }, [id]);

  const [assignments, setAssignments] = useState<GetAllAssignmentResponse[]>(
    []
  );
  const fetchAssignments = async () => {
    const response = await assignmentService.getListByProjectId(0, 10, id.id!);
    setAssignments(
      response.data.items.map((assignment: GetAllAssignmentResponse) => ({
        ...assignment,
        createdDate: new Date(assignment.createdDate),
      }))
    );
  };

  const updateProjectRequest = async (values: UpdateProjectRequest) => {
    try {
      const response = await projectService.update(values);
      if(response.status==200){
        alert("Güncelleme Başarılı")
      }
      else{
        alert("Günelleme işlemi sırasında bir hata oluştu")
      }
    } catch (error) {
      console.error("Project add error:", error);
    }
  };
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <div className="centered-form">
        <Formik
          initialValues={{
            name: project!.name || '',
            startDate: project!.startDate ? new Date(project!.startDate).toISOString().split('T')[0] : '',
            endDate: project!.endDate? new Date(project!.endDate).toISOString().split('T')[0] : '',
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Doldurulması zorunlu alan"),
            startDate: Yup.date().required("Doldurulması zorunlu alan"),
            endDate: Yup.date().required("Doldurulması zorunlu alan"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const transformedValues: UpdateProjectRequest = {
              ...values,
              startDate: new Date(values.startDate),
              endDate: new Date(values.endDate),
              id: project!.id
            }
              try {
                await updateProjectRequest(transformedValues);
                setSubmitting(false);
              } catch (error) {
                console.error("Project add error:", error);
              }    
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="d-flex justify-content-center align-items-center mt-5 mb-3">
                <h5 className="modal-title color-project-edit" id="exampleModalLabel"><b> PROJEYİ DÜZENLE</b>
                 
                </h5>
              </div>

              <div className="form-group form-width mt-5">
                <label htmlFor="name">Proje adı</label>
                <Field name="name" type="text" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
                <div className="form-group mt-3">
                  <label htmlFor="startDate">Başlangıç Tarihi</label>
                  <Field
                    name="startDate"
                    type="date"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="startDate"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="endDate">Bitiş Tarihi</label>
                  <Field name="endDate" type="date" className="form-control" />
                  <ErrorMessage
                    name="endDate"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn rounded-pill modalButton float-end mt-4 mb-4"
                disabled={isSubmitting}
              >
                Kaydet
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="row">
        <div className="col-md-2">
          </div>
          <div className="col-md-8">
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
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <th>{assignment.title}</th>
                <th>{assignment.description}</th>
                <th>{assignment.createdDate.toDateString()}</th>
                <th>{assignment.statusText}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-md-2"></div>
      </div>
    </>
  );
}

export default EditProject;
