import React from 'react';
import './Toast.css';

const Toast = ({ mensagem, onClose, tipo }) => {
    return (
        <div className={`toast ${tipo}`}>
            <div className="spinner"></div>
            <span>{mensagem}</span>
            <button onClick={onClose}>×</button>
        </div>
    );
};

export default Toast;
