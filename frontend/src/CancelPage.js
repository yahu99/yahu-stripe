import React from 'react';
import { useNavigate } from 'react-router-dom';

function CancelPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Cancel</h2>
            <p>Оплата была отменена.</p>
            <button onClick={() => navigate('/home')}>Домой</button>
        </div>
    );
}

export default CancelPage;