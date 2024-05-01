import { useEffect, useState } from "react";
import SideBar from "../sidebar/sidebar";
import folderIcon from "/public/assets/Folder.png";
import { Link } from "react-router-dom";
import "./folder.css";
import { useQuery } from "@tanstack/react-query";
import { getSharedFolders } from "../../services/FolderService";

const SharedFoldersPage = () => {
  const [page, setPage] = useState(1);
  const perPage = 3;

  const [users, setUsers] = useState<any[]>([]);

  const [searchKeyword, setSearchKeyword] = useState("");
  const {
    data: sharedFoldersData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sharedFolders"],
    queryFn: () => getSharedFolders(),
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const userData = await response.json();
        setUsers(userData);
        console.log("Liste des utilisateurs:", userData);
      } catch (error: any) {
        console.error("Failed to fetch users:", error.message);
      }
    };

    fetchUsers();
  }, []);
  const getOwnerName = (ownerId: string) => {
    const owner = users.find((user) => user._id === ownerId);
    return owner ? owner.firstName : "Unknown";
  };

  return (
    <div className="content-container">
      <SideBar />
      <div className="main-content">
        <div className="header">
          <div className="pp">
            <p className="logo-text">Shared Liste </p>
          </div>
          <div className="search-bar-container">
            <input
              type="text"
              placeholder="     Search..."
              className="search-bar"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
        </div>
        <div className="file-list-container">
          <div className="static-file-list">
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {sharedFoldersData &&
              sharedFoldersData.length > 0 &&
              sharedFoldersData.map((folder: any) => (
                <div key={folder._id} className="folder">
                  <img src={folderIcon} alt="Folder Icon" />
                  <h3>{folder.Name}</h3>
                  <p>Owner: {getOwnerName(folder.user)}</p>{" "}
                  {/* Utilisation de la fonction getOwnerName pour obtenir le nom du propriétaire */}
                  <div className="button-container">
                    <Link
                      to={`/folder/static/${folder._id}`}
                      className="btn link-button">
                      Open Folder
                    </Link>
                  </div>
                </div>
              ))}
          </div>
          <Link to="/folder">My folders</Link>
        </div>
      </div>
    </div>
  );
};

export default SharedFoldersPage;
