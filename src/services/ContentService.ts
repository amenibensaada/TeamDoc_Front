// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createContent = async (createContentDto: any) => {
  const response = await fetch("http://localhost:3000/content", {
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

export const getContent = async (id: string) => {
  const response = await fetch(`http://localhost:3000/content/${id}/last`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get user");
  }
  return response.json();
};

export const updateContentRealTime = async (id: string, updatedContent: string) => {
  const response = await fetch(`http://localhost:3000/content/${id}/update-real-time`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: updatedContent }),
  });
  if (!response.ok) {
    throw new Error('Failed to update content in real time');
  }
  return response.json();
};
