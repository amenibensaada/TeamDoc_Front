import React, {  useState } from "react";
import StaticFileCard from "./card";
import "./staticlist.css";
import SideBar from "../sidebar/sidebar"; // Importez le composant SideBar
import {  useQuery } from "@tanstack/react-query";
import {  deletedocuments, getDocuments } from "@/services/documentsService";
import AddDocumentForm from "./AddDocumentForm";


const StaticFileList = () => {

  const { data: documentsdata, isError, isLoading,refetch} = useQuery({
    queryKey: ["documents"],
    queryFn: () => getDocuments(),
  });

  const [searchTerm, setSearchTerm] = useState(""); // État pour stocker le terme de recherche
  const [sortByName, setSortByName] = useState(false); // État pour activer/désactiver le tri par nom
  const [currentPage, setCurrentPage] = useState(1); // État pour stocker le numéro de la page actuelle
  const itemsPerPage = 5; // Nombre d'éléments par page

  // Fonction pour mettre à jour le terme de recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Fonction pour changer de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching documents</div>;

  // Filtrer et trier les fichiers statiques en fonction du terme de recherche et du tri par nom
  const filteredAndSortedFiles = documentsdata
    .filter((file) => file.Title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortByName ? a.Title.localeCompare(b.Title) : 0));

  // Index du premier élément de la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedFiles.slice(indexOfFirstItem, indexOfLastItem);
 

   //Add form
   const [showAddForm, setShowAddForm] = useState(false);
   const [initialDocumentData, setInitialDocumentData] = useState(null);

   const handleToggleForm = (initialData = null) => {
    setShowAddForm((prev) => !prev);
    setInitialDocumentData(initialData); 
    refetch();
  };



  const handleDeleteDocument = async (documentId) => {
    try {
      await deletedocuments(documentId);
      refetch();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

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
            <button className="button-container" onClick={() => setSortByName(!sortByName)}>
              {sortByName ? "Désactiver le tri par nom" : "Activer le tri par nom"}
            </button>
          </div>
        </div>
        <div>
        {showAddForm && <AddDocumentForm onClose={handleToggleForm} initialDocumentData={initialDocumentData}/>}
        {/* Bouton pour afficher/cacher le formulaire */}
        <button onClick={handleToggleForm}>Add Document</button>
        </div>
        <div className="file-list-container">
          <div className="static-file-list">
            {currentItems.map((file) => (
              <StaticFileCard
                key={file._id}
                title={file.Title}
                description={file.contentType}
                noteId={file._id}
                onDelete={handleDeleteDocument}
                onEdit={() => handleToggleForm(file)}
              />
            ))}
          </div>
          <div className="pagination">
            {Array(Math.ceil(filteredAndSortedFiles.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <button key={index} className="button" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaticFileList;
