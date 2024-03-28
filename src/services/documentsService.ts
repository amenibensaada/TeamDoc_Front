const url='http://localhost:3000/Document'
export const getDocuments = async () => {
  const response = await fetch(`${url}/getalldocuments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFjNGEyMTgxNmY3NzU0MmJmMDRlYyIsImVtYWlsIjoiYW1hbEBnbWFpbC5jb20iLCJyb2xlIjpbIkNMSUVOVCJdLCJpYXQiOjE3MTExOTc0NzUsImV4cCI6MTcxMTI4Mzg3NX0.RuRJIVLS6ulhnVdDqNEDIQaZ6ooB55XGlD4KOSEAwkE`, 
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get documents");
  }
  return response.json();
};

export const getDocumentsbyid = async (id: string) => {
  const response = await fetch(`${url}/getbyiddocuments/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFjNGEyMTgxNmY3NzU0MmJmMDRlYyIsImVtYWlsIjoiYW1hbEBnbWFpbC5jb20iLCJyb2xlIjpbIkNMSUVOVCJdLCJpYXQiOjE3MTExOTc0NzUsImV4cCI6MTcxMTI4Mzg3NX0.RuRJIVLS6ulhnVdDqNEDIQaZ6ooB55XGlD4KOSEAwkE`, 

    },
  });
  if (!response.ok) {
    throw new Error("Failed to get Documents by id ");
  }
  return response.json();
};
export const createdocuments = async (createDocumentsDto: any) => {
  const response = await fetch(`${url}/AddDocuments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFjNGEyMTgxNmY3NzU0MmJmMDRlYyIsImVtYWlsIjoiYW1hbEBnbWFpbC5jb20iLCJyb2xlIjpbIkNMSUVOVCJdLCJpYXQiOjE3MTExOTc0NzUsImV4cCI6MTcxMTI4Mzg3NX0.RuRJIVLS6ulhnVdDqNEDIQaZ6ooB55XGlD4KOSEAwkE`, 

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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFjNGEyMTgxNmY3NzU0MmJmMDRlYyIsImVtYWlsIjoiYW1hbEBnbWFpbC5jb20iLCJyb2xlIjpbIkNMSUVOVCJdLCJpYXQiOjE3MTExOTc0NzUsImV4cCI6MTcxMTI4Mzg3NX0.RuRJIVLS6ulhnVdDqNEDIQaZ6ooB55XGlD4KOSEAwkE`, 

    },
    body: JSON.stringify(createDocumentsDto),
  });
  if (!response.ok) {
    throw new Error("Failed to create documents- folder id ");
  }
  return response.json();
};
export const updatedocuments = async (createDocumentsDto: any, id:string) => {
  const response = await fetch(`${url}/updatedocuments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFjNGEyMTgxNmY3NzU0MmJmMDRlYyIsImVtYWlsIjoiYW1hbEBnbWFpbC5jb20iLCJyb2xlIjpbIkNMSUVOVCJdLCJpYXQiOjE3MTExOTc0NzUsImV4cCI6MTcxMTI4Mzg3NX0.RuRJIVLS6ulhnVdDqNEDIQaZ6ooB55XGlD4KOSEAwkE`, 

    },
    body: JSON.stringify(createDocumentsDto),
  });
  if (!response.ok) {
    throw new Error("Failed to update documents- folder id ");
  }
  return response.json();
};
export const deletedocuments = async ( id:string) => {
  const response = await fetch(`${url}/deletedocuments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmFjNGEyMTgxNmY3NzU0MmJmMDRlYyIsImVtYWlsIjoiYW1hbEBnbWFpbC5jb20iLCJyb2xlIjpbIkNMSUVOVCJdLCJpYXQiOjE3MTExOTc0NzUsImV4cCI6MTcxMTI4Mzg3NX0.RuRJIVLS6ulhnVdDqNEDIQaZ6ooB55XGlD4KOSEAwkE`, 

    }
  });
  if (!response.ok) {
    throw new Error("Failed to delete documents- folder id ");
  }
  return response.json();
};