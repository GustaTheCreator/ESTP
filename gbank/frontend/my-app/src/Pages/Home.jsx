import React from 'react';
import { Link } from 'react-router-dom';
import './Style/Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Bem-vindo ao GBank</h1>
      <nav>
        <Link to="/loan-requests" className="nav-link">Ver Pedidos de Empréstimo</Link>
        <Link to="/login" className="nav-link">Login</Link>
      </nav>
    </div>
  );
}

export default Home;
