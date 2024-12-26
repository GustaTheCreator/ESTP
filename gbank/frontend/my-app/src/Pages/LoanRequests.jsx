import React from 'react';
import { Link } from 'react-router-dom';
import './Style/LoanRequests.css';

function LoanRequests() {
  return (
    <div className="loan-requests-container">
      <h1>Pedidos de Empréstimo</h1>
      <Link to="/" className="nav-link">Voltar para Home</Link>
    </div>
  );
}

export default LoanRequests;
