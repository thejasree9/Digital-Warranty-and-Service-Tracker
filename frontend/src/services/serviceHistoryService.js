import API from "./api";

export const addService = async (service) => {
  const response = await API.post("/api/services", service);
  return response.data;
};

export const getService = async (id) => {
  const response = await API.get(`/api/services/${id}`);
  return response.data;
};

export const getServicesByProduct = async (productId) => {
  const response = await API.get(`/api/services/product/${productId}`);
  return response.data;
};

export const updateService = async (id, service) => {
  const response = await API.put(`/api/services/${id}`, service);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await API.delete(`/api/services/${id}`);
  return response.data;
};