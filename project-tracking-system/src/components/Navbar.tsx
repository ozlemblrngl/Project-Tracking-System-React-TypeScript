import React from 'react'
import { Link } from 'react-router-dom';
import "../styles/navbar.css"



function Navbar() {

    const handleLogOut = () => {
        localStorage.clear();
      };
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
  <div className="container-fluid">
  <div className="navbar-nav ms-auto logOut">
  <span className=" nav-item nav-link p-2  ">
                    <Link
                      onClick={handleLogOut}
                      className=" nav-link dropdown-item"
                      to="/"
                    >
                      <b>Oturumu Kapat</b>
                    </Link>
                  </span>
    
  </div>
  </div>
</nav>
    </>
  )
}

export default Navbar