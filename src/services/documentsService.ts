
const url='http://localhost:3000/Document'
const token = localStorage.getItem("token");

export const getDocuments = async () => {
  const response = await fetch(`${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

    },
  });
  if (!response.ok) {
    throw new Error("Failed to get documents");
  }
  return response.json();
};
//folderid
export const getDocumentsbyFolderId = async (id: string) => {
  const response = await fetch(`${url}/documents/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

    },
  });
  if (!response.ok) {
    throw new Error("Failed to get Documents by id ");
  }
  return response.json();
};
export const getDocumentsbyid = async (id: string) => {
  const response = await fetch(`${url}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

    },
  });
  if (!response.ok) {
    throw new Error("Failed to get Documents by id ");
  }
  return response.json();
};


export const createdocuments = async (createDocumentsDto: any) => {
  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

    },
    body: JSON.stringify(createDocumentsDto),
  });
  if (!response.ok) {
    throw new Error("Failed to create documents");
  }
  return response.json();
};
export const createdocumentsByfolder = async (folderId: string, createDocumentsDto: unknown) => {
  if (typeof createDocumentsDto === 'object' && createDocumentsDto !== null) {
    const response = await fetch(`${url}/${folderId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ ...createDocumentsDto, folderId }), 
    });
    if (!response.ok) {
      throw new Error("Failed to create documents");
    }
    return response.json();
  } else {
    throw new Error("createDocumentsDto is not an object");
  }
};

export const createdocumentsfoldid = async (createDocumentsDto: any, idfol:string) => {
  const response = await fetch(`${url}/createavecaffectation/${idfol}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(createDocumentsDto),
  });
  if (!response.ok) {
    throw new Error("Failed to create documents- folder id ");
  }
  return response.json();
};

export const updatedocuments = async (createDocumentsDto: unknown, id:string) => {
  const response = await fetch(`${url}/${id}`, {
    method: "Put",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
       
      },
    body: JSON.stringify(createDocumentsDto),
  });
  if (!response.ok) {
    throw new Error("Failed to update documents- folder id ");
  }
  return response.json();
};

export const deletedocuments = async ( id:string) => {
  const response = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`

    }
  });
  if (!response.ok) {
    throw new Error("Failed to delete documents- folder id ");
  }
  return response.json();
};
