import API from "./api";

export const addWarranty = async (warranty) => {
  const response = await API.post("/api/warranty", warranty);
  return response.data;
};

export const getWarranty = async (productId) => {
  const response = await API.get(`/api/warranty/${productId}`);
  return response.data;
};

export const updateWarranty = async (productId, warranty) => {
  const response = await API.put(`/api/warranty/${productId}`, warranty);
  return response.data;
};

export const deleteWarranty = async (productId) => {
  const response = await API.delete(`/api/warranty/${productId}`);
  return response.data;
};