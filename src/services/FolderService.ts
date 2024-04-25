export const getFolders = async (
  searchKeyword: string,
  page: number,
  perPage: number
) => {
  const token = localStorage.getItem("token");

  try {
    const url = `http://localhost:3000/folder/search?keyword=${searchKeyword}&page=${page}&perPage=${perPage}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Échec de la récupération des dossiers");
    }

    return response.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error("Échec de la récupération des dossiers: " + error.message);
  }
};
// export const getFolders = async (searchKeyword: string, page: number, perPage: number) => {
//   console.log("Paramètres de recherche envoyés à l'API :", { searchKeyword, page, perPage });
//   const url = `http://localhost:3000/folder/search?keyword=${searchKeyword}&page=${page}&perPage=${perPage}`;

//   try {
//       const response = await fetch(url, {
//           method: "GET",
//           headers: {
//               "Content-Type": "application/json",
//           },
//       });

//       if (!response.ok) {
//           throw new Error("Failed to get Folders");
//       }

//       return response.json();
//   } catch (error: any) {
//       throw new Error("Failed to fetch Folders: " + error.message);
//   }
// };

export const deleteFolder = async (folderId: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:3000/folder/${folderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to delete folder");
    }

    return;
  } catch (error: any) {
    throw new Error("Failed to delete folder: " + error.message);
  }
};

// export const addFolder = async (folderName: String) => {
//   try {
//       const response = await fetch("http://localhost:3000/folder", {
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ Name: folderName }),
//       });
//       if (!response.ok) {
//           throw new Error("Failed to add folder");
//       }
//       return response.json();
//   } catch (error : any) {
//       throw new Error("Failed to add folder: " + error.message);
//   }
// };
export const addFolder = async (folderName: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("http://localhost:3000/folder/AddFolder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Name: folderName }),
    });
    if (!response.ok) {
      throw new Error("Failed to add folder");
    }
    return response.json();
  } catch (error: any) {
    throw new Error("Failed to add folder: " + error.message);
  }
};

export const updateFolder = async (folderId: string, folderName: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`http://localhost:3000/folder/${folderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Name: folderName }),
    });
    if (!response.ok) {
      throw new Error("Failed to update folder");
    }
    return response.json();
  } catch (error: any) {
    throw new Error("Failed to update folder: " + error.message);
  }
};

export const shareFolder = async (folderId: string, userIdToShareWith: string): Promise<boolean> => {
  const token = localStorage.getItem('token');
  const url = `http://localhost:3000/folder/${folderId}/share`;
  const requestBody = { userIdToShareWith };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to share folder');
    }

    return true; 
  } catch (error:any) {
    console.error('Failed to share folder:', error.message);
    return false; 
  }
};



export const searchFolders = async (keyword: any) => {
  try {
    const response = await fetch(
      `http://localhost:3000/folder/search?keyword=${keyword}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to search folders");
    }
    return response.json();
  } catch (error: any) {
    throw new Error("Failed to search folders: " + error.message);
  }
  
};
export const getSharedFolders = async () => {
  const token = localStorage.getItem("token");

  try {
    const url = "http://localhost:3000/folder/shared"; // L'URL pour récupérer les dossiers partagés
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Échec de la récupération des dossiers partagés");
    }

    return response.json();
  } catch (error: any) {
    throw new Error("Échec de la récupération des dossiers partagés: " + error.message);
  }

  
};

export const ignoreAccess = async (folderId: string, userIdToIgnore: string): Promise<boolean> => {
  const token = localStorage.getItem('token');
  const url = `http://localhost:3000/folder/${folderId}/ignore-access/${userIdToIgnore}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to ignore access');
    }

    return true; 
  } catch (error:any) {
    console.error('Failed to ignore access:', error.message);
    return false; 
  }
};





