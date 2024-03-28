import React, { useState } from "react";
import "./AddFolderModal.css";

const AddFolderModal = ({ isOpen, onClose, onAddFolder }) => {
    const [newFolderName, setNewFolderName] = useState("");

    const handleAddFolder = () => {
        onAddFolder(newFolderName);
        setNewFolderName("");
    };

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal">
                    <h2>Ajouter un dossier</h2>
                    <input
                        type="text"
                        placeholder="Nom du dossier"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                    />
                    <div className="modal-buttons">
                        <button onClick={handleAddFolder}>Ajouter</button>
                        <button onClick={onClose}>Annuler</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default AddFolderModal; // Assurez-vous d'avoir cet export par défaut
