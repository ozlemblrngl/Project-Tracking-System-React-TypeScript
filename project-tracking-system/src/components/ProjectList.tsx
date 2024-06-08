import React,{useEffect,useState} from 'react';
import ProjectAddModal from './ProjectAddModal';
import { GetAllProjectResponse } from '../models/responses/project/getAllProjectResponse';
import projectService from '../services/projectService';


interface ProjectListProps {
  projects: GetAllProjectResponse[];
}

const ProjectList: React.FC = () => {

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

  return (
    <div>
      <ProjectAddModal></ProjectAddModal>
      <h2>Proje Listesi</h2>
      <br/>
      <div className="d-flex align-items-center mb-3 ">
        <div>
      <button type="button" className="btn btn-primary rounded-pill shadow my-3 ml-auto"data-bs-toggle="modal" data-bs-target="#exampleModal"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill mr-2" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
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
      <th scope="col">Görev Sayısı </th> 
       {/* buna ilişkin düzenleme yapılacak */}
      <th scope="col">Durumu </th>
      
    </tr>
  </thead>
      <tbody className="">
        {projects.map((project, index) => (
          <tr key={index} >
            <th scope="row">{index+1}</th>
            <th>{project.name}</th>
            <th> {project.startDate.toDateString()}</th>
            <th>{project.endDate.toDateString()}</th>
            <th>{project.status}</th>
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
