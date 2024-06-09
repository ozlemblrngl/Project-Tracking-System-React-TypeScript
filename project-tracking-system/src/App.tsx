import React from 'react';
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import AssignmentList from './components/AssignmentList';
import EditProject from"./pages/EditProject";


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
      <HomePage />
     </ProtectedRoute>
}
/> }

{<Route
  path="/projects"
  element={
    <ProtectedRoute>
      <ProjectList />
     </ProtectedRoute>
}
/> }

{<Route
  path="/assignments"
  element={
    <ProtectedRoute>
      <AssignmentList />
     </ProtectedRoute>
}
/> }

{<Route
  path="/edit-project"
  element={
    <ProtectedRoute>
      <EditProject />
     </ProtectedRoute>
}
/> }

</Routes>

    </>
  );
}

export default App;
