
export const getFolders = async () => {
    const response = await fetch("http://localhost:3000/folder/getAllFolder", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFjNGEyMTgxNmY3NzU0MmJmMDRlYyIsImVtYWlsIjoiYW1hbEBnbWFpbC5jb20iLCJyb2xlIjpbIkNMSUVOVCJdLCJpYXQiOjE3MTExNDQzNzIsImV4cCI6MTcxMTIzMDc3Mn0.kwa4Opik6S2jyW23AnIpufRoDrkF9ws4JXMHewKgEIw`, 
      },
    });
    if (!response.ok) {
      throw new Error("Failed to get folders");
    }
    return response.json();
  };
 
 
  // export const deleteFolder = async (folderId) => {
  //   try {
  //     const response = await fetch(`http://localhost:3000/folder/${folderId}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to delete folder");
  //     }
  //     // Si la suppression réussit, nous ne renvoyons rien car nous n'avons pas besoin de données spécifiques
  //     return;
  //   } catch (error) {
  //     throw new Error("Failed to delete folder: " + error.message);
  //   }
  // };
  export const deleteFolder = async (folderId) => {
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
        // Si la suppression réussit, nous ne renvoyons rien car nous n'avons pas besoin de données spécifiques
        return;
    } catch (error) {
        throw new Error("Failed to delete folder: " + error.message);
    }
};

  
  
  
  