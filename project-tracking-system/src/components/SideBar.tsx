import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/sideBar.css"

type Props= {
  activeTab:string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

function Sidebar({activeTab, setActiveTab}:Props) {
  return (
    <div>
        <div className="p-4 py-5 mobile-sidebar mt-3 ">
              
              <button
                className="btn mb-2 text-start w-100 sidebar-link form-text-style active-edit"
                onClick={() => setActiveTab("Projects")}
                style={{borderColor: activeTab === "Projects" ? '#00f' : '#ddd',  backgroundColor: '#c3671c'}}
              >
                <span className="projects" ></span>
                <span className="sidebar-text "><b>PROJELER</b></span>
              </button>
              <button className="btn mb-2 text-start w-100  sidebar-link form-text-style " onClick={()=>setActiveTab("Assignments")} 
              style={{borderColor: activeTab === "Projects" ? '#00f' : '#ddd', backgroundColor: '#c3671c'}}>

                <span className="assignments"></span>
                <span className="sidebar-text "><b>GÖREVLER</b></span>
              </button> 
            </div>
        
    </div>
  )
}

export default Sidebar;