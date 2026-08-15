import API from "./api";

export const login = async (credentials) => {
  const response = await API.post("/api/auth/login", credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await API.post("/api/auth/register", userData);
  return response.data;
};

export const getProfile = async () => {
  const response = await API.get("/api/profile");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await API.put("/api/profile", profileData);
  return response.data;
};