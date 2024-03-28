import React, { useEffect, useState } from "react";
import SideBar from "../sidebar/sidebar";
import folderIcon from "../sidebar/assets/Folder.png";
import { Link } from "react-router-dom";
import "./folder.css";
import { useQuery } from "@tanstack/react-query";
import { getFolders } from "../../services/FolderService";
import { deleteFolder , addFolder , updateFolder } from "../../services/FolderService";
import AddFolderModal from "./AddFolderModal"; 
import { User } from "lucide-react";

const FoldersPage = () => {
    const [page, setPage] = useState(1); 
    const perPage = 3;

    const [searchKeyword, setSearchKeyword] = useState(""); 
    const { data: foldersData, error, isLoading, refetch } = useQuery({
        queryKey: ["folders", page, perPage, searchKeyword],
        queryFn: () => getFolders(searchKeyword, page, perPage),
    });
    

    const [folders, setFolders] = useState([]);
    const [showAddFolderModal, setShowAddFolderModal] = useState(false);
    

    useEffect(() => {
        if (foldersData) {
            setFolders(foldersData);
            console.log("Données des dossiers récupérées:", foldersData);
        }
    }, [foldersData, page]); 
        
    
    console.log("Dossiers actuels:", folders); 

    const handleDeleteFolder = async (folderId: string) => {
        try {
            await deleteFolder(folderId);
            console.log("Dossier supprimé avec succès");
            refetch();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Échec de la suppression du dossier:", error.message);
            } else {
                console.error("Une erreur inattendue s'est produite lors de la suppression du dossier");
            }
        }
    };
    
    
    const handleAddFolder = async (folderName : String) => {
        try {
            await addFolder(folderName);
            console.log("Dossier ajouté avec succès");
            setShowAddFolderModal(false);
            refetch();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Échec de l'ajout du dossier:", error.message);
            } else {
                console.error("Une erreur inattendue s'est produite lors de l' ajout du dossier");
            }
        }
    };

    const handleUpdateFolder = async (folderId : String, newFolderName :String ) => {
        try {
            await updateFolder(folderId, newFolderName);
            console.log("Dossier mis à jour avec succès"); 
            refetch();
        } catch (error) {
            if (error instanceof Error) {
                console.error("Échec de la mise a jour du dossier:", error.message);
            } else {
                console.error("Une erreur inattendue s'est produite lors de la mise a jour du dossier");
            }
        }
    };

    
    const handleSearchInputChange = (event : any) => {
        setSearchKeyword(event.target.value);
        console.log("Mot-clé de recherche mis à jour:", event.target.value);

    };
    const goToPreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
            console.log("Passage à la page précédente");
            console.log("Nouvelle valeur de page:", page);
            refetch(); 
        }
    };
    
    const goToNextPage = () => {
        const currentPageItemCount = folders.length;
        if (currentPageItemCount === perPage) {
            setPage((prevPage) => prevPage + 1);
            console.log("Passage à la page suivante");
            console.log("Nouvelle valeur de page:", page);
            refetch(); 
        }
    };
    
    

    return (
        <div className="content-container">
            <SideBar />
            <div className="main-content">
                <div className="header">
                    <div className="pp">
                        <h1>Welcome to TeamDoc</h1>
                        <img
                            src="/src/pages/sidebar/assets/logo.png"
                            className={`cursor-pointer duration-500 `}
                        />
                    </div>
                    <div className="search-bar-container">
                        <input
                            type="text"
                            placeholder="     Search..."
                            className="search-bar"
                            value={searchKeyword}
                            onChange={handleSearchInputChange}
                                />

                    </div>
                </div>
                <div className="file-list-container">
                    <div className="static-file-list">
                        {isLoading && <div>Loading...</div>}
                        {error && <div>Error: {error.message}</div>}
                        {foldersData && foldersData.length > 0 && foldersData.map((folder : any) => (
    <div key={folder._id} className="folder">
        <img src={folderIcon} alt="Folder Icon" />
        <h3>{folder.Name}</h3>
        <div className="button-container">
            <Link
                to={`/folder/static`}
                className="btn link-button"
            >
                Open Folder
            </Link>
            <button 
                onClick={() => handleDeleteFolder(folder._id)}
                className="delete-button"
            >
                Delete Folder
            </button>
            <button  className="update-button"

                onClick={() => {
                    const newFolderName = prompt("Enter new folder name:", folder.Name );
                    if (newFolderName !== null && newFolderName !== "") {
                        handleUpdateFolder(folder._id, newFolderName);
                        console.log("Nouveau nom de dossier entré:", newFolderName);
                    }
                }}
            >
                Update Folder
            </button>
        </div>
    </div>
))}

                        
                    </div>
                </div>
                <AddFolderModal
                    isOpen={showAddFolderModal}
                    onClose={() => setShowAddFolderModal(false)}
                    onAddFolder={handleAddFolder}
                />
                <button className="but" onClick={() => setShowAddFolderModal(true)}>
                    Add Folder
                </button>

                {/* Boutons de pagination */}
                <div className="pagination-buttons">
    {page > 1 && (
        <button onClick={goToPreviousPage}>previous page</button>
    )}
    {folders.length === perPage && (
        <button onClick={goToNextPage}>next page</button>
    )}
</div>

            </div>
        </div>
    );
};

export default FoldersPage;
