import React, { useState } from 'react';

const InterviewScheduler = ({ loanId }) => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState('');

    const handleSendSlots = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/loan-requests/${loanId}/schedule-interview/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ available_slots: timeSlots }),
            });

            if (response.ok) {
                alert('Horários enviados ao cliente.');
            } else {
                alert('Erro ao enviar horários.');
            }
        } catch (error) {
            alert('Erro ao enviar horários.');
        }
    };

    const addTimeSlot = (slot) => {
        setTimeSlots((prev) => [...prev, slot]);
    };

    return (
        <div>
            <h2>Agendar Entrevista</h2>
            <input
                type="datetime-local"
                onChange={(e) => addTimeSlot(e.target.value)}
            />
            <button onClick={handleSendSlots}>Enviar Horários</button>
            <p>Horários Disponíveis:</p>
            <ul>
                {timeSlots.map((slot, index) => (
                    <li key={index}>{slot}</li>
                ))}
            </ul>
        </div>
    );
};

export default InterviewScheduler;
