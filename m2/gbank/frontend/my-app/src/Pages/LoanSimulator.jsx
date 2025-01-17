import React, { useState } from 'react';
import './Style/LoanSimulator.css'; // Arquivo de estilos
import { Link } from 'react-router-dom'; // Componente de roteamento

const LoanSimulator = () => {
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [error, setError] = useState('');

    const validateInput = () => {
        if (amount <= 0 || duration <= 0 ) {
            setError('O valor e a duração do empréstimo devem ser maiores que zero.');
            return false;
        }
        setError('');
        return true;
    };

    return (
        <div className="loan-simulator-container">
            <h2 className="loan-simulator-title">Simulador de Empréstimo</h2>
            {error && <p className="loan-simulator-error">{error}</p>}
            <div className="loan-simulator-form">
                <input
                    type="number"
                    placeholder="Valor do Empréstimo (€)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="loan-simulator-input"
                />
                <input
                    type="number"
                    placeholder="Duração em Meses"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="loan-simulator-input"
                />
                <Link to="/login" className="loan-simulator-button">Simular Empréstimo</Link>
            </div>
        </div>
    );
};

export default LoanSimulator;
