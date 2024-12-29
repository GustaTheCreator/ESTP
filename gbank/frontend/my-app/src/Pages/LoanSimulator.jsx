import React, { useState } from 'react';
import './Style/LoanSimulator.css'; // Arquivo de estilos

const LoanSimulator = () => {
    const [amount, setAmount] = useState('');
    const [duration, setDuration] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [error, setError] = useState('');

    const validateInput = () => {
        if (amount <= 0 || duration <= 0 || interestRate < 0) {
            setError('O valor, a duração e a taxa de juros devem ser válidos.');
            return false;
        }
        setError('');
        return true;
    };

    const calculateMonthlyPayment = () => {
        if (!validateInput()) return;

        const principal = parseFloat(amount);
        const months = parseInt(duration, 10);
        const monthlyRate = parseFloat(interestRate) / 100 / 12;

        let payment;

        if (monthlyRate === 0) {
            payment = principal / months;
        } else {
            payment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
        }

        setMonthlyPayment(payment.toFixed(2));
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
                <input
                    type="number"
                    placeholder="Taxa de Juros (%)"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="loan-simulator-input"
                />
                <button onClick={calculateMonthlyPayment} className="loan-simulator-button">
                    Calcular
                </button>
            </div>
            {monthlyPayment && (
                <div className="loan-simulator-result">
                    <h3 className="loan-simulator-result-title">Resultado:</h3>
                    <p className="loan-simulator-result-text">Pagamento Mensal: € {monthlyPayment}</p>
                </div>
            )}
        </div>
    );
};

export default LoanSimulator;
