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
    const [selectForDeleteId, setSelectForDeleteId] = useState<string>("");

  const addAssignment = (assignment: GetAllAssignmentResponse) => {
    setAssignments([...assignments, assignment]);
   };

   useEffect(() => {
    fetchAssignments();
  }, []);
  const fetchAssignments = async () => {
    const userId =parseInt(localStorage.getItem("userId")!);
    const response = await assignmentService.getListByUserId(
      0,
      10,
      userId
    );
    setAssignments(response.data.items.map((assignment: GetAllAssignmentResponse) => ({
      ...assignment,
      createdDate: new Date(assignment.createdDate)
    })))
  }

  const handleDelete = async (assignmentId: string) => {
    const response = await assignmentService.delete(assignmentId);
    setAssignments(assignments.filter((i) => i.id !== assignmentId));
  };


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
        <th scope="col">İşlemler</th>
        
      </tr>
    </thead>
        <tbody className="">
          {assignments.map((assignment, index) => (
            <tr key={index} >
              <th scope="row">{index+1}</th>
              <td>{assignment.projectName}</td>
              <td>{assignment.title}</td>
              <td>{assignment.description}</td>
              <td>{assignment.createdDate.toISOString().split('T')[0]}</td>
              <td>{assignment.statusText}</td>
              <div className="row">
                  <span
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                    title="silme"
                    onClick={() => {
                      setSelectForDeleteId(assignment.id);
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
                <b>Seçilen görevi silmek istediğinize emin misiniz?</b>
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

export default AssignmentList;