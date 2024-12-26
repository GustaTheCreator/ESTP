import React from 'react';
import { Link } from 'react-router-dom';
import './Style/Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao GBank</h1>
      <nav>
        <Link to="/loan-requests" className="nav-link">Fazer um Pedido de Empréstimo</Link>
        <Link to="/loan-simulator" className="nav-link">Simular Empréstimo</Link>
        <Link to="/interview-scheduler" className="nav-link">Agendar Entrevista</Link>
        <Link to="/loan-requests-manager" className="nav-link">Gerenciar Pedidos de Empréstimo</Link>
        <Link to="/loan-status" className="nav-link">Ver Status de Empréstimo</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </nav>
    </div>
  );
}

export default Home;
