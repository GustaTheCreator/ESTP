import React, { useEffect, useState } from 'react';

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
        <div>
            <h2>Status das Solicitações</h2>
            {loans.map((loan) => (
                <div key={loan.id}>
                    <p>ID: {loan.id}</p>
                    <p>Valor: {loan.amount}</p>
                    <p>Status: {loan.status}</p>
                </div>
            ))}
            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                <span>Página {currentPage} de {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próximo
                </button>
            </div>
        </div>
    );
};

export default LoanStatus;
