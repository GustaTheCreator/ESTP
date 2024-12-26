import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Homepage from './Pages/Home';
import Login from './Pages/Login';
import LoanRequests from './Pages/LoanRequests';
import LoanStatus from './Pages/LoanStatus';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loan-requests" element={<LoanRequests />} />
        <Route path="/loan-status" element={<LoanStatus />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
