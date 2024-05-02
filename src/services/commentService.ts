export const getComment = async (documentId: string) => {
  const response = await fetch(
    `http://localhost:3000/comments/document/${documentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to get content history");
  }
  return response.json();
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createComment = async (createContentDto: any) => {
  const response = await fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createContentDto),
  });
  if (!response.ok) {
    throw new Error("Failed to create user");
  }
  return response.json();
};
export const getCommentById = async (id: string) => {
  const response = await fetch(`http://localhost:3000/comments/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get comment by ID");
  }
  return response.json();
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCommentService = async (id: string, comment: any) => {
  const response = await fetch(`http://localhost:3000/comments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    throw new Error("Failed to update comment");
  }
  return response.json();
};

export const deleteCommentService = async (id: string) => {
  const response = await fetch(`http://localhost:3000/comments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }
  return response.json();
};
