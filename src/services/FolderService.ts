
export const getFolders = async (searchKeyword: string, page: number, perPage: number) => {
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVkOGExZGRmMmQyZmRiZWUyZGVjNSIsImVtYWlsIjoiYmJAZ21haWwuY29tIiwicm9sZSI6WyJDTElFTlQiXSwiaWF0IjoxNzEyMDA4MzU0LCJleHAiOjE3MTIwOTQ3NTR9.snRXUUa7jxDZ3YCOIJOjNjey_9DYLzx4ILGVkZwLEKo";

  try {
    const url = `http://localhost:3000/folder/search?keyword=${searchKeyword}&page=${page}&perPage=${perPage}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${token}`
      },
    });
    
    if (!response.ok) {
      throw new Error("Échec de la récupération des dossiers");
    }

    return response.json();
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






 
 
 
  export const deleteFolder = async (folderId: String) => {
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVkOGExZGRmMmQyZmRiZWUyZGVjNSIsImVtYWlsIjoiYmJAZ21haWwuY29tIiwicm9sZSI6WyJDTElFTlQiXSwiaWF0IjoxNzEyMDA4MzU0LCJleHAiOjE3MTIwOTQ3NTR9.snRXUUa7jxDZ3YCOIJOjNjey_9DYLzx4ILGVkZwLEKo";

    try {
        const response = await fetch(`http://localhost:3000/folder/${folderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${token}`

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
export const addFolder = async (folderName : String) => {
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVkOGExZGRmMmQyZmRiZWUyZGVjNSIsImVtYWlsIjoiYmJAZ21haWwuY29tIiwicm9sZSI6WyJDTElFTlQiXSwiaWF0IjoxNzEyMDA4MzU0LCJleHAiOjE3MTIwOTQ3NTR9.snRXUUa7jxDZ3YCOIJOjNjey_9DYLzx4ILGVkZwLEKo";
  
  try {
    const response = await fetch("http://localhost:3000/folder/AddFolder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDVkOGExZGRmMmQyZmRiZWUyZGVjNSIsImVtYWlsIjoiYmJAZ21haWwuY29tIiwicm9sZSI6WyJDTElFTlQiXSwiaWF0IjoxNzEyMDA4MzU0LCJleHAiOjE3MTIwOTQ3NTR9.snRXUUa7jxDZ3YCOIJOjNjey_9DYLzx4ILGVkZwLEKo";

    try {
      const response = await fetch(`http://localhost:3000/folder/${folderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`

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