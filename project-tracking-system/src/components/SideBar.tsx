import React from 'react'
import { Link } from 'react-router-dom';

type Props= {
  activeTab:string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

function Sidebar({activeTab, setActiveTab}:Props) {
  return (
    <div>
        <div className="p-2 py-4 mobile-sidebar  ">
              
              <button
                className="btn mb-2 text-start w-100 sidebar-link form-text-style active-edit"
                onClick={() => setActiveTab("Projects")}
              >
                <span className="projects"></span>
                <span className="sidebar-text">Projeler</span>
              </button>
              <button className="btn mb-2 text-start w-100  sidebar-link form-text-style " onClick={()=>setActiveTab("Assignments")}>

                <span className="assignments"></span>
                <span className="sidebar-text">Görevler</span>
              </button> 
            </div>
        
    </div>
  )
}

export default Sidebar;