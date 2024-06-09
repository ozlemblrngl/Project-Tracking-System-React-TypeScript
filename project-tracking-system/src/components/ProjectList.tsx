import React, { useEffect, useState } from "react";
import ProjectAddModal from "./ProjectAddModal";
import { GetAllProjectResponse } from "../models/responses/project/getAllProjectResponse";
import projectService from "../services/projectService";
import "../styles/projectList.css";
import { Link } from "react-router-dom";

interface ProjectListProps {
  projects: GetAllProjectResponse[];
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<GetAllProjectResponse[]>([]);
  const [selectForDeleteId, setSelectForDeleteId] = useState<string>("");

  const addProject = (project: GetAllProjectResponse) => {
    setProjects([...projects, project]);
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = async () => {
    const userId =parseInt(localStorage.getItem("userId")!);
    console.log(userId)
    const response = await projectService.getListByUserId(0, 10, userId);
    setProjects(
      response.data.items.map((project: GetAllProjectResponse) => ({
        ...project,
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
      }))
    );
  };
  const handleDelete = async (projectId: string) => {
    const response = await projectService.delete(projectId);
    setProjects(projects.filter((i) => i.id !== projectId));
  };

  return (
    <div>
      <ProjectAddModal fetchProjects={fetchProjects}/>
      <h2>Proje Listesi</h2>
      <br />
      <div className="d-flex align-items-center mb-3">
        <div>
          <button
            type="button"
            className="btn rounded-pill shadow my-3 projectButton"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-square-fill mr-2"
              viewBox="0 0 16 16"
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
            </svg>
            Proje Oluştur
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Proje Adı</th>
            <th scope="col">Başlangıç Tarihi</th>
            <th scope="col">Bitiş Tarihi </th>
            <th scope="col">İşlemler</th>
          </tr>
        </thead>
        <tbody className="">
          {projects.map((project, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{project.name}</td>
              <td> {project.startDate.toISOString().split('T')[0]}</td>
              <td>{project.endDate.toISOString().split('T')[0]}</td>
              <div className="row">
                <div className="col-6">
                
                    <Link to={`/edit-project/${project.id}`}><span  title="detay"><svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
              style={{ cursor: "pointer" }}
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fillRule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
            </svg></span></Link>
                 
                </div>
                <div className="col-md-6">
                  <span
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    title="silme"
                    onClick={() => {
                      setSelectForDeleteId(project.id);
                    }}
                  >
                    <svg
                      xmlns="https://tobeto.com/trash.svg"
                      width="23"
                      height="23"
                      fill="red"
                      className="ms-1 mt-1"
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                    </svg>
                  </span>
                </div>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="modal fade"
        id="deleteModal"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <img src="https://tobeto.com/_next/static/media/alert.309dc4c0.svg"></img>
              <br />
              <br />
              <h6 className="modal-title">
                <b>Seçilen projeyi silmek istediğinize emin misiniz?</b>
              </h6>
              <button
                type="button"
                className="btn-close btnClose rounded-pill shadow"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-muted">
              <p>Bu işlem geri alınamaz.</p>
            </div>
            <div className=" modal-footer modal-footer-feature">
              <button
                type="button"
                className="btn btnNo rounded-pill shadow"
                data-bs-dismiss="modal"
              >
                Hayır
              </button>

              <button
                type="button"
                className="btn rounded-pill shadow btnYes"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(selectForDeleteId)}
              >
                Evet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
