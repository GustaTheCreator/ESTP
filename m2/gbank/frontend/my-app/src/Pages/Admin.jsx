import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './Style/Admin.css';

function Admin() {
    return (
        <body>
            <main>
            <nav className="navbar">
                <ul>
                    <Link to="/" className="nav-link">GBank</Link>
                    <Link to="/loan-status" className="nav-link">Estado do Empréstimo</Link>
                    <Link to="/interview-scheduler" className="nav-link">Agendamento de Entrevistas</Link>
                    <Link to="/loan-requests-manager" className="nav-link">Gerenciamento de Solicitações</Link>
                    <Link to="/admin" className="nav-link">Admin</Link>
                </ul>
                </nav>



            <h1>Admin</h1>
            <p>Esta página é reservada para administradores do GBank.</p>
            <p>Por favor, faça login para aceder a esta área.</p>

            <Footer />
            </main>
        </body>
                

    );
}

export default Admin;