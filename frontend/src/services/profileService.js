
import API from "./api";

export const getProfile = () => API.get("/api/profile");

export const updateProfile = (data) =>
  API.put("/api/profile", data);

// ADD THIS
export const changePassword = (data) =>
  API.post("/api/profile/change-password", data);