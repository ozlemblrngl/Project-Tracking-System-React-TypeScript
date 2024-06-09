import { Formik, Field, Form, ErrorMessage } from 'formik';
import React,{useEffect,useState} from 'react';
import * as Yup from 'yup';
import "../styles/assignmentAddModal.css"
import projectService from '../services/projectService';
import { GetAllProjectResponse } from '../models/responses/project/getAllProjectResponse';
import assignmentService from '../services/assignmentService';
import { GetAllAssignmentResponse } from '../models/responses/assignment/getAllAssignmentResponse';
import { AddAssignmentRequest } from '../models/requests/assignment/addAssignmentRequest';

interface assignmentAddModalProps{
  fetchAssignments : () => Promise<void>
}
const AssignmentAddModal:  React.FC<assignmentAddModalProps> = ({fetchAssignments}) => {

    const [projects, setProjects] = useState<GetAllProjectResponse[]>([]);
    const addProject = (project: GetAllProjectResponse) => {
      setProjects([...projects, project]);
     };

     useEffect(() => {
      fetchProjects();
    }, []);
    const fetchProjects = async () => {
      const userId =parseInt(localStorage.getItem("userId")!);
      const response = await projectService.getListByUserId(
        0,
        10,
        userId
      );
      setProjects(response.data.items.map((project: GetAllProjectResponse) => ({
        ...project,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
      })))
    }

    
    const [assignments, setAssignments] = useState<GetAllAssignmentResponse[]>([]);
    const addAssignment = (assignment: GetAllAssignmentResponse) => {
      setAssignments([...assignments, assignment]);
     };
  
     useEffect(() => {
      fetchAssignments();
    }, []);
   

    const addAssignmentRequest = async (values: AddAssignmentRequest) => {
      try {
        console.log(values);
        const response = await assignmentService.add(values);
        fetchAssignments();
        document.getElementById("assigmentAddModal")?.click();
        
      } catch (error) {
        console.error("Assignment add error:", error);
      }
    };
  return (
    <>
      <div className="centered-form">
        <Formik
          initialValues={{
            projectId:"",
            title: '',
            description: '',
            createdDate: '',
            status:"",
          }}
          validationSchema={Yup.object({
            projectId: Yup.string()
              .required("Doldurulması zorunlu alan"),
            title: Yup.string()
              .required("Doldurulması zorunlu alan"),
            createdDate: Yup.date()
            .required("Doldurulması zorunlu alan"),
            status: Yup.number()
            .required("Doldurulması zorunlu alan"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const transformedValues: AddAssignmentRequest = {
              ...values,
            createdDate: new Date(values.createdDate),
                };
                try {
              await addAssignmentRequest(transformedValues);
              setSubmitting(false);
              document.getElementById("exampleModal")?.click();
            } catch (error) {
              console.error("Assignment add error:", error);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div
                role="dialog"
                className="modal fade"
                id="assigmentAddModal"
                tabIndex={-1}
                aria-labelledby="assigmentAddModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog  ">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="assigmentAddModalLabel">
                        Yeni Görev Ekle
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
                        <label htmlFor="projectId">Proje adı</label>
                        <Field as="select" name="projectId" className="form-select">
                          <option value="projectId" label="Proje seçin" />
                          {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                              {project.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="projectId" component="div" className="text-danger" />
                      </div>
                      <div className="form-group ">
                        <label htmlFor="title">Başlık</label>
                        <Field name="title" type="text" className="form-control" />
                        <ErrorMessage name="title" component="div" className="text-danger" />
                      </div>
                      <div className="form-group ">
                        <label htmlFor="description">Açıklama</label>
                        <Field name="description" type="text" className="form-control" />
                        <ErrorMessage name="description" component="div" className="text-danger" />
                      </div>
                      <div className="form-group ">
                        <label htmlFor="createdDate">Oluşturma Tarihi</label>
                        <Field name="createdDate" type="date" className="form-control" />
                        <ErrorMessage name="createdDate" component="div" className="text-danger" />
                      </div>
                      <div className="form-group ">
                        <label htmlFor="status">Durumu</label>
                        <Field as="select" name="status" className="form-select">
                          <option value="0" label="Yeni" />
                          <option value="1" label="Devam Ediyor" />
                          <option value="2" label="Tamamlandı" />
                          
                        </Field>
                        <ErrorMessage name="description" component="div" className="text-danger" />
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
                      <button type="submit" className="btn rounded-pill modalButton" disabled={isSubmitting} >
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
export default AssignmentAddModal;