import React, { useState } from "react";
import StaticFileCard from "./card";
import "./staticlist.css";
import SideBar from "../sidebar/sidebar"; // Importez le composant SideBar

const StaticFileList = () => {
  const staticFiles = [
    { id: 1, title: "Plan marketing", description: "Analyse du marché cible et stratégies de promotion pour lancer le produit X." },
    { id: 2, title: "Feuille de route du projet", description: "Détail de toutes les étapes et des délais pour la réalisation du projet SmartGym." },
    { id: 3, title: "Rapport de recherche", description: "Étude approfondie sur les effets du café sur la santé, basée sur des recherches récentes." },
    { id: 4, title: "Guide de dépannage", description: "Solutions aux problèmes courants rencontrés dans le système X, avec des instructions détaillées." },
    { id: 5, title: "Document de spécifications", description: "Spécifications techniques et fonctionnelles pour le développement du produit Y." },
    { id: 6, title: "Documentation API", description: "Documentation complète sur les API disponibles pour la navigation dans l'application." },
    { id: 7, title: "Présentation du projet", description: "Diapositives de présentation détaillant le projet, ses objectifs, ses avantages et son impact prévu." },
    { id: 8, title: "Politiques et procédures", description: "Description des politiques et procédures internes de l'entreprise pour une utilisation conforme." },
  ];

  const [searchTerm, setSearchTerm] = useState(""); // État pour stocker le terme de recherche
  const [sortByName, setSortByName] = useState(false); // État pour activer/désactiver le tri par nom

  // Fonction pour mettre à jour le terme de recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fonction pour trier les fichiers statiques par titre
  const sortFilesByName = () => {
    const sortedFiles = [...staticFiles].sort((a, b) => a.title.localeCompare(b.title));
    return sortedFiles;
  };

  // Filtrer et trier les fichiers statiques en fonction du terme de recherche et du tri par nom
  const filteredAndSortedFiles = staticFiles
    .filter((file) => file.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortByName ? a.title.localeCompare(b.title) : 0));

  return (
    <div className="content-container">
      <SideBar />
      <div className="main-content">
        <div className="header">
          <div className="pp">
            <h1>Bienvenue sur TeamDoc</h1> 
            <img
              src="/src/pages/sidebar/assets/logo.png"
              className={`cursor-pointer duration-500 `}
            />
          </div>
          <div className="search-bar-container">
           
            <input
              type="text"
              placeholder="Rechercher..."
              className="search-bar"
              value={searchTerm || ""}
              onChange={handleSearchChange}
            />
            <button onClick={() => setSortByName(!sortByName)}>
              {sortByName ? "Désactiver le tri par nom" : "Activer le tri par nom"}
            </button>
          </div>
        </div>
        <div className="file-list-container">
          <div className="static-file-list">
            {filteredAndSortedFiles.map((file) => (
              <StaticFileCard
                key={file.id}
                title={file.title}
                description={file.description}
                noteId={file.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticFileList;
