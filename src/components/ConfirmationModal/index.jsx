import React from 'react';
import './ConfirmationModal.css'; 

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="confirmation-modal-overlay">
            <div className="confirmation-modal">
                <h2>Confirmação</h2>
                <p>{message}</p>
                <div className="confirmation-modal-actions">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
