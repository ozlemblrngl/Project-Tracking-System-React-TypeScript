import React from 'react';
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Route, Routes } from 'react-router-dom';

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

{/* <Route
  path="/home-page"
  element={
    <ProtectedRoute>
      <Navbar />
      <HomePage />
      <Footer />
    </ProtectedRoute>
}
/> */}

</Routes>

    </>
  );
}

export default App;
