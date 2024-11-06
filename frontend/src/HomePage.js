import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    const handleCheckout = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:3000/stripe/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Failed to create checkout session');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h2>Home Page</h2>
            <button onClick={handleCheckout}>Create Checkout Session</button>
        </div>
    );
}

export default HomePage;