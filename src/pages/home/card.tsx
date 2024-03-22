// StaticFileCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import './card.css';
import SideBar from "../sidebar/sidebar"; // Importez le composant SideBar

//<Link to={`/editor/${noteId}`}>


const StaticFileCard = ({ title, description, noteId }) => {
  return (
    
    <div className="static-file-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link to={`/editor/65f2fbe78e9282e0755a60dd`}>

        <button>Ajouter une note</button>
      </Link>
    </div>
  );
};

export default StaticFileCard;
