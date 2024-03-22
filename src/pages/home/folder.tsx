import React, { useEffect, useState } from "react";
import SideBar from "../sidebar/sidebar";
import folderIcon from "../sidebar/assets/Folder.png";
import { Link } from "react-router-dom";
import "./folder.css";
import { useQuery } from "@tanstack/react-query";
import { getFolders } from "../../services/FolderService";
import { deleteFolder } from "../../services/FolderService";

const FoldersPage = () => {
    const { data: foldersData, error, isLoading, refetch } = useQuery({
        queryKey: ["folders"],
        queryFn: () => getFolders(),
    });

    const [folders, setFolders] = useState([]);

    useEffect(() => {
        if (foldersData) {
            setFolders(foldersData);
        }
    }, [foldersData]);

    const handleDeleteFolder = async (folderId) => {
        try {
            await deleteFolder(folderId);
            console.log("Folder deleted successfully");
            refetch();
        } catch (error) {
            console.error("Failed to delete folder:", error.message);
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
                        />
                    </div>
                </div>
                <div className="file-list-container">
                    <div className="static-file-list">
                        {isLoading && <div>Loading...</div>}
                        {error && <div>Error: {error.message}</div>}
                        {folders.map((folder) => (
                            <div key={folder._id} className="folder">
                                <img src={folderIcon} alt="Folder Icon" />
                                <h3>{folder.Name}</h3>
                                <div className="button-container">
                                    <Link to={`/folder/static`} className="btn link-button">
                                        Aller à la liste des fichiers
                                    </Link>
                                    <button
                                        onClick={() => handleDeleteFolder(folder._id)}
                                        className="delete-button"
                                    >
                                        Supprimer le dossier
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoldersPage;
