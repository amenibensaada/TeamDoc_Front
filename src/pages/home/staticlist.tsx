import React, { useState } from "react";
import StaticFileCard from "./card";
import "./staticlist.css";
import SideBar from "../sidebar/sidebar";
import { useQuery } from "@tanstack/react-query";
import { deletedocuments, getDocuments, updatedocuments } from "@/services/documentsService";
import AddDocumentForm from "./AddDocumentForm";

const StaticFileList = () => {
  const { data: documentsdata, isError, isLoading, refetch } = useQuery({
    queryKey: ["documents"],
    queryFn: () => getDocuments(),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [sortByName, setSortByName] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching documents</div>;

  const filteredAndSortedFiles = documentsdata
    .filter((file) => file.Title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortByName ? a.Title.localeCompare(b.Title) : 0));

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedFiles.slice(indexOfFirstItem, indexOfLastItem);

  const [showAddForm, setShowAddForm] = useState(false);
  const [initialDocumentData, setInitialDocumentData] = useState(null);

  const handleToggleForm = (initialData = null, documentId = null) => {
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

  const handleUpdateDocument = async (formData, documentId) => {
    try {
      await updatedocuments(formData, documentId);
      refetch();
      alert("Document updated successfully!");
    } catch (error) {
      console.error("Error updating document:", error);
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
          {showAddForm && (
            <AddDocumentForm
              onClose={handleToggleForm}
              initialDocumentData={initialDocumentData}
              onUpdate={handleUpdateDocument}
            />
          )}
          <button 
  onClick={handleToggleForm}
  className="flex items-center px-4 py-2 mt-4 text-sm font-medium text-white bg-pink-700 rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
>
  <svg 
    className="w-5 h-5 mr-2" 
    aria-hidden="true" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth="2" 
      d="M12 6v6m0 0v6m0-6h6m-6 0H6" 
    />
  </svg>
  Add Document
</button>




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
                onEdit={() => {
                  const newTitle = prompt("Enter new title:", file.Title);
                  const newContentType = prompt("Enter new content type:", file.contentType);
                  if (newTitle !== null && newTitle !== "" && newContentType !== null && newContentType !== "") {
                    handleUpdateDocument({ Title: newTitle, contentType: newContentType }, file._id);
                  }
                }}
              />
            ))}
          </div>
          <div className="pagination">
            {Array(Math.ceil(filteredAndSortedFiles.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <button
                  key={index}
                  className="button"
                  onClick={() => handlePageChange(index + 1)}
                >
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
