import React, { useEffect, useState } from 'react';
import './Style/LoanStatus.css'; // Reaproveitando o arquivo de estilos do LoanStatus

const LoanDetails = ({ match }) => {
    const [loanDetails, setLoanDetails] = useState(null);
    const loanId = match.params.id;

    useEffect(() => {
        const fetchLoanDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/loan-requests/${loanId}/`);
                if (response.ok) {
                    const data = await response.json();
                    setLoanDetails(data);
                } else {
                    alert('Erro ao buscar detalhes do empréstimo.');
                }
            } catch (error) {
                alert('Erro ao buscar detalhes do empréstimo.');
            }
        };

        fetchLoanDetails();
    }, [loanId]);

    if (!loanDetails) {
        return (
            <div className="loan-status-container">
                <p>Carregando detalhes...</p>
            </div>
        );
    }

    return (
        <div className="loan-status-container">
            <h2 className="loan-status-title">Detalhes do Empréstimo</h2>
            <div className="loan-status-item">
                <p className="loan-status-id">ID: {loanDetails.id}</p>
                <p className="loan-status-amount">Valor: € {loanDetails.amount}</p>
                <p className="loan-status-status">Status: {loanDetails.status}</p>
                <p className="loan-status-date">Data: {loanDetails.date}</p>
                <p className="loan-status-other">Descrição: {loanDetails.description}</p>
                <p className="loan-status-other">Taxa de Juros: {loanDetails.interest_rate}%</p>
            </div>
            <button 
                onClick={() => window.history.back()} 
                className="loan-status-button styled-button"
            >
                Voltar
            </button>
        </div>
    );
};

export default LoanDetails;
