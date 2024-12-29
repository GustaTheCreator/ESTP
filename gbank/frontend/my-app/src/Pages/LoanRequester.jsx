import React, { useState } from 'react';
import './Style/LoanRequest.css'; // Arquivo de estilos

const LoanRequest = () => {
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('');
    const [error, setError] = useState('');

    const validateInput = () => {
        if (amount <= 0 || duration <= 0) {
            setError('O valor e a duração devem ser maiores que zero.');
            return false;
        }
        setError('');
        return true;
    };

    const submitLoanRequest = async () => {
        if (!validateInput()) return;

        try {
            const response = await fetch('http://localhost:8000/api/loan-requests/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: parseFloat(amount),
                    duration_months: parseInt(duration, 10),
                }),
            });

            if (response.ok) {
                alert('Solicitação enviada com sucesso!');
                setAmount('');
                setDuration('');
            } else {
                alert('Erro ao enviar solicitação.');
            }
        } catch (error) {
            alert('Erro ao enviar solicitação.');
        }
    };

    return (
        <div className="loan-request-container">
            <h2 className="loan-request-title">Solicitar Empréstimo</h2>
            {error && <p className="loan-request-error">{error}</p>}
            <div className="loan-request-form">
                <input
                    type="number"
                    placeholder="Valor do Empréstimo (€)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="loan-request-input"
                />
                <input
                    type="number"
                    placeholder="Duração em Meses"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="loan-request-input"
                />
                <button onClick={submitLoanRequest} className="loan-request-button">
                    Enviar
                </button>
            </div>
        </div>
    );
};

export default LoanRequest;
