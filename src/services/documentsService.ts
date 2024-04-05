const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFjNGEyMTgxNmY3NzU0MmJmMDRlYyIsImVtYWlsIjoiYW1hbEBnbWFpbC5jb20iLCJyb2xlIjpbIkNMSUVOVCJdLCJpYXQiOjE3MTIyNjU1MzIsImV4cCI6MTcxMjM1MTkzMn0.vWYmWhTncyx4DC9cYYRd9COjbYq9DJDdp07dgop0UQY';

const url='http://localhost:3000/Document'
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

export const updatedocuments = async (createDocumentsDto: any, id:string) => {
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
