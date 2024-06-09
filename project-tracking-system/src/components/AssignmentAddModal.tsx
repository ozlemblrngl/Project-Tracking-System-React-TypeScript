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
  
      const response = await projectService.getAll(
        0,
        10,
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
        const response = await assignmentService.add(values);
        fetchAssignments();
        
      } catch (error) {
        console.error("Assignment add error:", error);
      }
    };
  return (
    <>
      <div className="centered-form">
        <Formik
          initialValues={{
            projectName:"",
            title: '',
            description: '',
            createdDate: '',
            status:"",
          }}
          validationSchema={Yup.object({
            projectName: Yup.string()
              .required("Doldurulması zorunlu alan"),
            title: Yup.date()
              .required("Doldurulması zorunlu alan"),
            createdDate: Yup.date()
            .required("Doldurulması zorunlu alan"),
            status: Yup.date()
            .required("Doldurulması zorunlu alan"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            const transformedValues: AddAssignmentRequest = {
              ...values,
            createdDate: new Date(values.createdDate),
            projectId: values.projectName
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
                        <label htmlFor="projectName">Proje adı</label>
                        <Field as="select" name="projectName" className="form-select">
                          <option value="projectName" label="Proje seçin" />
                          {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                              {project.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage name="projectName" component="div" className="text-danger" />
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
                          <option value="status" label="Durumu Seçin" />
                          {assignments.map((assignment) => (
                            <option key={assignment.id} value={assignment.status}>
                              {assignment.status}
                            </option>
                          ))}
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
                        Close
                      </button>
                      <button type="submit" className="btn rounded-pill modalButton" disabled={isSubmitting}>
                        Save changes
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