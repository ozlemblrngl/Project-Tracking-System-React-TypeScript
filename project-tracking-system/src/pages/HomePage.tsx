import React from 'react'
import ProjectList from '../components/ProjectList'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AssignmentList from '../components/AssignmentList'
import Sidebar from '../components/SideBar'


interface Project {
    name: string;
    startDate: string;
    endDate: string;
    status: string;
  }

  interface Assignment {
    name: string;
    description: string;
    createdDate: string;
    status: string;
  }
  const handleLogOut = () => {
    localStorage.clear();
  };

function HomePage() {
   
   
   
    const [activeTab, setActiveTab] = useState<string>("Project");

   

  const handleActiveTab = (text: string) => {
    setActiveTab(text);
  }

  const renderContent = () => {
    switch (activeTab) {
      case "Projects":
        return <ProjectList />;
      case "Assignments":
        return <AssignmentList/>

    }
  };

  return (
    <div>
        <div className='row container mt-5 ml-5'>
            
        <div className="row">
          <div className="col-12 col-lg-3 mb-8 mb-lg-0">
            <Sidebar activeTab ={activeTab} setActiveTab={setActiveTab}/>
            <span className=" nav-link dropdown-item p-2 ">
                    <Link
                      onClick={handleLogOut}
                      className=" nav-link dropdown-item"
                      to="/"
                    >
                      Oturumu Kapat
                    </Link>
                  </span>
          </div>
          <div className="col-12 col-lg-9">
          {renderContent()}
          </div>
        </div>
        </div>
    </div>
  )
}

export default HomePage