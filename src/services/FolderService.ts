export const getFolders = async (searchKeyword: string, page: number, perPage: number) => {
  console.log("Paramètres de recherche envoyés à l'API :", { searchKeyword, page, perPage }); 
  const url = `http://localhost:3000/folder/search?keyword=${searchKeyword}&page=${page}&perPage=${perPage}`;
  
  try {
      const response = await fetch(url, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });
      
      if (!response.ok) {
          throw new Error("Failed to get Folders");
      }

      return response.json();
  } catch (error: any) {
      throw new Error("Failed to fetch Folders: " + error.message);
  }
};


 
 
 
  export const deleteFolder = async (folderId: String) => {
    try {
        const response = await fetch(`http://localhost:3000/folder/${folderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to delete folder");
        }
        
        return;
    } catch (error : any) {
        throw new Error("Failed to delete folder: " + error.message);
    }
};

export const addFolder = async (folderName: String) => {
  try {
      const response = await fetch("http://localhost:3000/folder", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name: folderName }),
      });
      if (!response.ok) {
          throw new Error("Failed to add folder");
      }
      return response.json();
  } catch (error : any) {
      throw new Error("Failed to add folder: " + error.message);
  }
};
  
export const updateFolder = async (folderId : String, folderName : String) => {
    try {
      const response = await fetch(`http://localhost:3000/folder/${folderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Name: folderName }),
      });
      if (!response.ok) {
        throw new Error("Failed to update folder");
      }
      return response.json();
    } catch (error:any) {
      throw new Error("Failed to update folder: " + error.message);
    }
  };
  
  export const searchFolders = async (keyword : any) => {
    try {
      const response = await fetch(`http://localhost:3000/folder/search?keyword=${keyword}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to search folders");
      }
      return response.json();
    } catch (error : any) {
      throw new Error("Failed to search folders: " + error.message);
    }
  };