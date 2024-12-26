import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LoanDetails = () => {
    const { id } = useParams();
    const [loanDetails, setLoanDetails] = useState(null);

    useEffect(() => {
        const fetchLoanDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/loan-requests/${id}/`);
                if (response.ok) {
                    const data = await response.json();
                    setLoanDetails(data);
                } else {
                    alert('Erro ao buscar detalhes da solicitação.');
                }
            } catch (error) {
                alert('Erro ao buscar detalhes da solicitação.');
            }
        };

        fetchLoanDetails();
    }, [id]);

    if (!loanDetails) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h2>Detalhes da Solicitação</h2>
            <p>ID: {loanDetails.id}</p>
            <p>Valor: {loanDetails.amount}</p>
            <p>Status: {loanDetails.status}</p>
            <p>Cliente: {loanDetails.client_name}</p>
            <p>Documentos:</p>
            <ul>
                {loanDetails.documents.map(doc => (
                    <li key={doc.id}>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LoanDetails;
