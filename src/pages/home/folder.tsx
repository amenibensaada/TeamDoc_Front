  /* eslint-disable @typescript-eslint/no-unused-vars */
  import { useEffect, useRef, useState } from "react";
  import SideBar from "../sidebar/sidebar";
  import folderIcon from "/public/assets/Folder.png";
  import { Link } from "react-router-dom";
  import "./folder.css";
  import { useQuery } from "@tanstack/react-query";
  import { getFolderbyid, getFolders } from "../../services/FolderService";
  import {
    deleteFolder,
    addFolder,
    updateFolder,
    shareFolder,
    ignoreAccess,
    toggleFolderAccess,
  } from "../../services/FolderService";
  import AddFolderModal from "./AddFolderModal";
  import Chatbot from "./chatbot";


  const FoldersPage = () => {
    const [page, setPage] = useState(1);
    const perPage = 3;
    const folderButtonRef = useRef<HTMLAnchorElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  console.log(setSelectedUserId);
  const [selectedUserIds, setSelectedUserIds] = useState<{
    [key: string]: string;
  }>({});

    const [selectedFolderId, setSelectedFolderId] = useState(""); 

  const [searchKeyword, setSearchKeyword] = useState("");
  const {
    data: foldersData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["folders", page, perPage, searchKeyword],
    queryFn: () => getFolders(searchKeyword, page, perPage),
  });

  const [folders, setFolders] = useState([]);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  console.log(userNames);

  useEffect(() => {
    const userNamesMap: { [key: string]: string } = {};
    users.forEach((user) => {
      userNamesMap[user._id] = user.firstName;
    });
    setUserNames(userNamesMap);
  }, [users]);

  const handleIgnoreAccess = async (folderId: string) => {
    try {
      if (!selectedUserId) {
        console.error('Aucun utilisateur sélectionné pour ignorer l\'accès');
        return;
      }
      console.log('Selected User ID in handleIgnoreAccess:', selectedUserId); 
      console.log('Folder ID in handleIgnoreAccess:', folderId);  
      await ignoreAccess(folderId, selectedUserId);
      console.log('Accès ignoré avec succès');
      refetch(); 
    } catch (error:any) {
      console.error('Échec de l\'ignorance de l\'accès:', error.message);
    }
  };





    

    useEffect(() => {
      if (foldersData) {
        setFolders(foldersData);
        console.log("Données des dossiers récupérées:", foldersData);
      }
    }, [foldersData, page]);

    console.log("Dossiers actuels:", folders);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await fetch('http://localhost:3000/users');
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          const userData = await response.json();
          setUsers(userData);
          console.log("Liste des utilisateurs:", userData); 
        } catch (error:any) {
          console.error('Failed to fetch users:', error.message);
        }
      };
      fetchUsers();
    }, []);
    useEffect(() => {
      if (selectedUserId && foldersData) {
        
        setSelectedFolderId(foldersData[0]._id);
        console.log("Selected Folder ID:", selectedFolderId);

      }
    }, [selectedUserId, foldersData]);


    const handleUserSelectionChange = (folderId: string, userId: string) => {
      setSelectedUserIds({ ...selectedUserIds, [folderId]: userId });
      console.log("Selected User ID for Folder", folderId, ":", userId);
    };


    const handleDeleteFolder = async (folderId: string) => {
      const folderToDelete = foldersData.find((folder: any) => folder._id === folderId);
  if (!folderToDelete) {
    console.error('Dossier non trouvé');
    return;
  }
  const confirmDelete = window.confirm(`Are you sure you want to delete this folder "${folderToDelete.Name}"?`);
  
      if (confirmDelete) {
        try {
          await deleteFolder(folderId);
          console.log("Dossier supprimé avec succès");
          refetch();
        } catch (error:any) {
          console.log("Error message:", error.message);
          if (error instanceof Error && error.message === 'Folder already shared with this user') {
              alert("This folder is already shared with this user.");
          } else {
              console.error("Failed to share folder:", error.message);
          }
        }
      }
    };

    const handleAddFolder = async (folderName: string) => {
      try {
        await addFolder(folderName);
        console.log("Dossier ajouté avec succès");
        setShowAddFolderModal(false);
        refetch();
      } catch (error) {
        if (error instanceof Error) {
          console.error("Échec de l'ajout du dossier:", error.message);
        } else {
          console.error(
            "Une erreur inattendue s'est produite lors de l' ajout du dossier"
          );
        }
      }
    };

    const handleUpdateFolder = async (
      folderId: string,
      newFolderName: string
    ) => {
      try {
        await updateFolder(folderId, newFolderName);
        console.log("Dossier mis à jour avec succès");
        refetch();
      } catch (error) {
        if (error instanceof Error) {
          console.error("Échec de la mise a jour du dossier:", error.message);
        } else {
          console.error(
            "Une erreur inattendue s'est produite lors de la mise a jour du dossier"
          );
        }
      }
    };

    const handleShareFolder = async (folderId: string) => {
      try {
        const userIdToShareWith = selectedUserIds[folderId];
        console.log("Selected User ID to share with:", userIdToShareWith);  
        if (!userIdToShareWith) {
          alert('Veuillez sélectionner un utilisateur pour partager le dossier');
          return;
        }
    
        
        const folderToShare = foldersData.find((folder: any) => folder._id === folderId);
        if (!folderToShare) {
          console.error('Le dossier sélectionné n\'a pas été trouvé');
          return;
        }
    
        if (folderToShare.sharedWith.includes(userIdToShareWith)) {
          alert('Ce dossier est déjà partagé avec cet utilisateur.');
          return;
        }
    
        const success = await shareFolder(folderId, userIdToShareWith);
        console.log("Success:", success);
        if (success) {
          alert('Dossier partagé avec succès');
          console.log('Dossier partagé avec succès avec l utilisateur', userIdToShareWith);
          refetch(); 
        } else {
          alert('Échec du partage du dossier');
          console.error('Failed to share folder');
        }
      } catch (error:any) {
        console.error('Failed to share folder:', error.message);
        alert('Échec du partage du dossier');
      }
    };
    
    
    const handleToggleAccess = async (folderId: string) => {
      try {
        const success = await toggleFolderAccess(folderId);
        if (success) {
          console.log('Changement d\'accès réussi pour le dossier', folderId);
        } else {
          console.error('Échec du changement d\'accès pour le dossier', folderId);
        }
      } catch (error:any) {
        console.error('Échec du changement d\'accès pour le dossier', folderId, ':', error.message);
      }
    };
    
    
    
    

    const handleSearchInputChange = (event: any) => {
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
    
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [folder, setFolder] = useState<unknown>(null);

    const handleFolderClick = async (folderId: string) => {
      setSelectedFolderId(folderId);
      console.log(folderId);
      try {
        const folderData = await getFolderbyid(folderId);
        setFolder(folderData);
        console.log(folderData);
      } catch (error) {
      
          console.error(
            "Échec de la récupération des données du dossier:",
            error instanceof Error ? error.message : "Erreur inconnue"
          );
      
      }
    };
    useEffect(() => {
      console.log("Selected folder ID:", selectedFolderId);
      console.log("Folder:", folder);
    }, [selectedFolderId, folder]);




    console.log("Utilisateurs:", users);  


    return (
      <div className="content-container">
        <SideBar />
        <div className="main-content">
        <Chatbot folderButtonRef={folderButtonRef as React.RefObject<HTMLButtonElement | HTMLLinkElement>} />

          <div className="header">
            <div className="pp">
              <img
                src="/assets/logo.png"
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
          {/* <button onClick={handleRemoveAllFolders}>Remove All Folders</button> */}

          <div className="file-list-container">
            <div className="static-file-list">
              {isLoading && <div>Loading...</div>}
              {error && <div>Error: {error.message}</div>}
              {foldersData &&
                foldersData.length > 0 &&
                foldersData.map((folder: any) => (
                  <div key={folder._id} className="folder">
                    <img src={folderIcon} alt="Folder Icon" />
                    <h3 className="aziz">{folder.Name}</h3>
                    <label className="switch">
    <input
      type="checkbox"
      onChange={() => handleToggleAccess(folder._id)}
    />
    
    <span className="slider round"></span>
  </label>


                    <select
                      className="custom-select"

            value={selectedUserIds[folder._id] || ""}
            onChange={(e) => handleUserSelectionChange(folder._id, e.target.value)}>
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.email}
              </option>
            ))}
          </select>
          <button onClick={() => handleShareFolder(folder._id)}>Partager</button>
                    <div className="button-container">
                      {/* <Link
                        to={`/folder/static`}
                        className="btn link-button"
                      >
                        Open Folder
                      </Link> */}

                      <Link
                        to={`/folder/static/${folder._id}`}
                        className="btn link-button"
                        onClick={() => handleFolderClick(folder._id)}
                        aria-label={`Open folder ${folder.Name}`}
                        ref={folderButtonRef} // Transmettre la référence au bouton


                      >
                        Open Folder
                      </Link>

                     <button onClick={() => handleDeleteFolder(folder._id)} className="btn link1-button" data-folder-id={folder._id}>Delete Folder</button>


                      <button
                        className="btn link-button"
                        onClick={() => {
                          const newFolderName = prompt(
                            "Enter new folder name:",
                            folder.Name
                          );
                          if (newFolderName !== null && newFolderName !== "") {
                            handleUpdateFolder(folder._id, newFolderName);
                            console.log(
                              "Nouveau nom de dossier entré:",
                              newFolderName
                            );
                          }
                        }}
                      >
                        Update Folder
                      </button>
                      <select
            className="custom-select"

    value={selectedUserIds[folder._id] || ""}
    onChange={(e) => {
      handleUserSelectionChange(folder._id, e.target.value); 
      setSelectedUserId(e.target.value); 
    }}
  >
    <option value="">Select a user</option>
    {folder.sharedWith.map((userId: string) => {
      const user = users.find((user) => user._id === userId);
      if (user) {
        return (
          <option key={user._id} value={user._id}>
            {user.firstName} {user.lastName}
          </option>
        );
      }
      return null;
    })}
  </select>

  <button onClick={() => handleIgnoreAccess(folder._id)}>Ignore Access</button>
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
  <button id="add-folder-button" className="but" onClick={() => setShowAddFolderModal(true)}>
    Add Folder
  </button>


          <Link to="/Sharedfolders">Dossiers Partagés</Link>
        
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
