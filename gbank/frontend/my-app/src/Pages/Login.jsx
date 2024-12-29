import React, { useState } from 'react';
import './Style/Login.css'; // Arquivo de estilos
import { Route } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
                alert('Login bem-sucedido!');
                Route('/recognition');
            } else {
                alert('Erro ao fazer login.');
            }            
        } catch (error) {
            alert('Erro ao fazer login.');
        }
    };

    return (
        <div className="auth-container">
            <h2 className="auth-title">Login</h2>
            <div className="auth-form">
                <input
                    type="text"
                    placeholder="Usuário"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="auth-input"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="auth-input"
                />
                <button onClick={handleLogin} className="auth-button">Entrar</button>
            </div>
        </div>
    );
};

export default Login;
