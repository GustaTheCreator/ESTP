import React, { useState } from 'react';

const LoanRequest = () => {
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('');

    const submitLoanRequest = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await fetch('http://localhost:8000/api/loan-requests/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    amount,
                    duration_months: duration,
                }),
            });          
            alert('Solicitação enviada com sucesso!');
        } catch (error) {
            alert('Erro ao enviar solicitação.');
        }
    };

    return (
        <div>
            <h2>Solicitar Empréstimo</h2>
            <input
                type="number"
                placeholder="Valor"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            <input
                type="number"
                placeholder="Duração em meses"
                value={duration}
                onChange={e => setDuration(e.target.value)}
            />
            <button onClick={submitLoanRequest}>Enviar</button>
        </div>
    );
};

export default LoanRequest;
