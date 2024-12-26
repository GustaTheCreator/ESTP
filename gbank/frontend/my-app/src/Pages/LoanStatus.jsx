import React, { useEffect, useState } from 'react';
import './Style/LoanStatus.css'; // Importa o CSS

const LoanStatus = () => {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await fetch('http://localhost:8000/api/loan-requests/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setLoans(data);
            } catch (error) {
                alert('Erro ao buscar solicitações.');
            }
        };

        fetchLoans();
    }, []);

    return (
        <div>
            <h2>Status das Solicitações</h2>
            {loans.map(loan => (
                <div key={loan.id}>
                    <p>ID: {loan.id}</p>
                    <p>Valor: {loan.amount}</p>
                    <p>Status: {loan.status}</p>
                </div>
            ))}
        </div>
    );
};

export default LoanStatus;
