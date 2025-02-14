import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Contexto para o usuário
import './Style/Navbar.css';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext); // Obter informações do usuário
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        setUser(null); // Atualiza o estado do usuário para deslogado
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login'); // Redireciona para a página de login
      } else {
        console.error('Erro ao fazer logout');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <nav className="navbar">
      <ul>
        <Link to="/" className="nav-link">GBank</Link>
        <Link to="/loan-simulator" className="nav-link">Simular Empréstimo</Link>
        {!user ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Registar</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
