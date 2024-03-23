export const contentHistoryService = async (id: string) => {
  const response = await fetch(`http://localhost:3000/content/${id}/last`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get content history");
  }
  return response.json();
};
