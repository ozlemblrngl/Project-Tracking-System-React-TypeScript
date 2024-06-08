import React from 'react';
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomePage from './pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import ProjectList from './components/ProjectList';
import { useState } from 'react';

interface Project {
  name: string;
  startDate: string;
  endDate: string;
  status: string;
}

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
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
    // <ProtectedRoute>
      <HomePage />
    // </ProtectedRoute>
}
/> }

<Route
  path="/projects"
  element={
    <div>
       <ProjectList />
    </div>
  }
/>


</Routes>

    </>
  );
}

export default App;
