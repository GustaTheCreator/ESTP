import React, { useState } from 'react';
import './Style/Register.css'; // Arquivo de estilos

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, email }),
            });
            const data = await response.json();
            if (response.ok) {
                alert(data.message);
            } else {
                alert('Erro ao registrar usuário: ' + JSON.stringify(data));
            }
        } catch (error) {
            alert('Erro ao registrar usuário.');
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Registrar</h2>
            <div className="auth-form">
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                />
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                />
                <button onClick={handleRegister} className="auth-button">Registrar</button>
            </div>
        </div>
    );
};

export default Register;
