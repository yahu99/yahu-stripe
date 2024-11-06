import React from 'react';
import { useNavigate } from 'react-router-dom';

function SuccessPage() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Success</h2>
            <p>Оплата прошла успешно!</p>
            <button onClick={() => navigate('/home')}>Домой</button>
        </div>
    );
}

export default SuccessPage;