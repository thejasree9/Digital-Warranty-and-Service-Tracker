import API from "./api";

// Get all warranties
export const getWarranties = async () => {
  const response = await API.get("/api/warranty");
  return response.data;
};

// Get one warranty by product id
export const getWarranty = async (productId) => {
  const response = await API.get(`/api/warranty/${productId}`);
  return response.data;
};

// Add warranty
export const addWarranty = async (warranty) => {
  const response = await API.post("/api/warranty", warranty);
  return response.data;
};

// Update warranty
export const updateWarranty = async (productId, warranty) => {
  const response = await API.put(
    `/api/warranty/${productId}`,
    warranty
  );

  return response.data;
};

// Delete warranty
export const deleteWarranty = async (productId) => {
  const response = await API.delete(
    `/api/warranty/${productId}`
  );

  return response.data;
};