import React from 'react';
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import ProjectList from "./components/ProjectList";
import { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import AssignmentList from './components/AssignmentList';
import EditProject from"./pages/EditProject";
import Navbar from './components/Navbar';


interface Project {
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

function App() {
 
  return (
    <>
 <Routes>
<Route
  path="/"
  element={
    <div>
       <Login /> 
    </div>
  }
/>
<Route
  path="/register"
  element={
    <div>
       <Register />
    </div>
  }
/>

{<Route
  path="/home-page"
  element={
    <ProtectedRoute>
      <Navbar/><HomePage />
     </ProtectedRoute>
}
/> }

{<Route
  path="/projects"
  element={
    <ProtectedRoute>
      <Navbar/><ProjectList />
     </ProtectedRoute>
}
/> }

{<Route
  path="/assignments"
  element={
    <ProtectedRoute>
      <Navbar/><AssignmentList />
     </ProtectedRoute>
}
/> }

{<Route
  path="/edit-project/:id"
  element={
    <ProtectedRoute>
      <EditProject/>
     </ProtectedRoute>
}
/> }

</Routes>

    </>
  );
}

export default App;
