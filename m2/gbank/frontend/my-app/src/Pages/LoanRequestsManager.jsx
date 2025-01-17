import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoanRequestsManager = () => {
    const [loanRequests, setLoanRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoanRequests = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/loan-requests/');
                if (response.ok) {
                    const data = await response.json();
                    setLoanRequests(data.results);
                } else {
                    alert('Erro ao buscar solicitações.');
                }
            } catch (error) {
                alert('Erro ao buscar solicitações.');
            }
        };

        fetchLoanRequests();
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/loan-details/${id}`);
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            const response = await fetch(`http://localhost:8000/api/loan-requests/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status }),
            });

            if (response.ok) {
                alert('Status atualizado com sucesso!');
                setLoanRequests((prev) => prev.filter((loan) => loan.id !== id));
            } else {
                alert('Erro ao atualizar o status.');
            }
        } catch (error) {
            alert('Erro ao atualizar o status.');
        }
    };

    return (
        <div>
            <h2>Gerenciamento de Solicitações</h2>
            {loanRequests.map((loan) => (
                <div key={loan.id}>
                    <p>ID: {loan.id}</p>
                    <p>Valor: {loan.amount}</p>
                    <p>Status: {loan.status}</p>
                    <button onClick={() => handleViewDetails(loan.id)}>Ver Detalhes</button>
                    <button onClick={() => handleStatusUpdate(loan.id, 'approved')}>Aprovar</button>
                    <button onClick={() => handleStatusUpdate(loan.id, 'rejected')}>Rejeitar</button>
                </div>
            ))}
        </div>
    );
};

export default LoanRequestsManager;
