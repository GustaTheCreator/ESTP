import React, { useEffect, useState } from 'react';
import './Style/LoanStatus.css'; // Arquivo de estilos

const LoanStatus = () => {
    const [loans, setLoans] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/loan-requests/?page=${currentPage}`);
                if (response.ok) {
                    const data = await response.json();
                    setLoans(data.results);
                    setTotalPages(Math.ceil(data.count / data.page_size));
                } else {
                    alert('Erro ao buscar solicitações.');
                }
            } catch (error) {
                alert('Erro ao buscar solicitações.');
            }
        };

        fetchLoans();
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="loan-status-container">
            <h2 className="loan-status-title">Status das Solicitações</h2>
            {loans.map((loan) => (
                <div key={loan.id} className="loan-status-item">
                    <p className="loan-status-id">ID: {loan.id}</p>
                    <p className="loan-status-amount">Valor: € {loan.amount}</p>
                    <p className="loan-status-status">Status: {loan.status}</p>
                    <p className="loan-status-date">Data: {loan.date}</p>
                    <button 
                        onClick={() => window.location.href = `/loan-details/${loan.id}`}
                    className="loan-status-button styled-button">Detalhes</button> // Adiciona um botão para redirecionar para a página de detalhes
                </div>
            ))}
            <div className="loan-status-pagination">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1} 
                    className="loan-status-button styled-button"
                >
                    ⬅ Anterior
                </button>
                <span className="loan-status-page-info">
                    Página {currentPage} de {totalPages}
                </span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages} 
                    className="loan-status-button styled-button"
                >
                    Próximo ➡
                </button>
            </div>
        </div>
    );
};

export default LoanStatus;
