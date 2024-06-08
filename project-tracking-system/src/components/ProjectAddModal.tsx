import React from "react";

export default function ProjectAddModal() {
  return (
    <div
      role="dialog"
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
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
            <div>
              <label>Proje adı</label>
              <input id="ProjectName"></input>
            </div>
            <div>
              <label>Proje adı</label>
              <input id="ProjectName"></input>
            </div>
            <div>
            <label>Proje adı</label>
            <input id="ProjectName"></input>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
