import React,{useState, useEffect} from 'react'
import { GetAllAssignmentResponse } from '../models/responses/assignment/getAllAssignmentResponse';
import assignmentService from '../services/assignmentService';
import "../styles/assignmentList.css"
import AssignmentAddModal from './AssignmentAddModal';


  interface AssignmentListProps {
    assignments: GetAllAssignmentResponse[];
  }
  
  const AssignmentList: React.FC= () => {

    const [assignments, setAssignments] = useState<GetAllAssignmentResponse[]>([]);

  const addAssignment = (assignment: GetAllAssignmentResponse) => {
    setAssignments([...assignments, assignment]);
   };

   useEffect(() => {
    fetchAssignments();
  }, []);
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
      <div>
         <AssignmentAddModal  fetchAssignments={fetchAssignments}/>
        <h2>Görev Listesi</h2>
        <br/>
        <div className="d-flex align-items-center mb-3 ">
        <button type="button" className="btn assignmentButton rounded-pill shadow my-3 ml-auto" data-bs-toggle="modal" data-bs-target="#assigmentAddModal"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square-fill mr-2" viewBox="0 0 16 16">
    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
  </svg>
    Görev Oluştur 
  </button>
        </div>
        
        <table className="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Proje Adı</th>
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
              <th>{assignment.projectName}</th>
              <th>{assignment.title}</th>
              <th>{assignment.description}</th>
              <th>{assignment.createdDate.toDateString()}</th>
              <th>{assignment.statusText}</th>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    );
  };

export default AssignmentList;