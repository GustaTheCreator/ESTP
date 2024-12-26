import React, { useState } from 'react';

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
        <div>
            <h2>Solicitar Empréstimo</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="number"
                placeholder="Valor"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <input
                type="number"
                placeholder="Duração em meses"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
            />
            <button onClick={submitLoanRequest}>Enviar</button>
        </div>
    );
};

export default LoanRequest;
