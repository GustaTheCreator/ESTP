import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Homepage from './Pages/Home';
import Login from './Pages/Login';
import LoanRequests from './Pages/LoanRequester';
import LoanStatus from './Pages/LoanStatus';
import LoanDetails from './Pages/LoanDetails';
import LoanRequestsManager from './Pages/LoanRequestsManager';
import LoanSimulator from './Pages/LoanSimulator';
import InterviewScheduler from './Pages/InterviewScheduler';
import Register from './Pages/Register';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { UserProvider } from './context/UserContext';


function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loan-requests" element={<LoanRequests />} />
        <Route path="/loan-status" element={<LoanStatus />} />
        <Route path="/loan-details/:id" element={<LoanDetails />} />
        <Route path="/loan-requests-manager" element={<LoanRequestsManager />} />
        <Route path="/loan-simulator" element={<LoanSimulator />} />
        <Route path="/interview-scheduler" element={<InterviewScheduler />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
