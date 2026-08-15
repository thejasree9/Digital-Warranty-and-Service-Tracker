import api from "./api";

// Get all notifications
export const getNotifications = async () => {
  const response = await api.get("/api/notifications");
  return response.data;
};

// Get unread count
export const getUnreadCount = async () => {
  const response = await api.get("/api/notifications/unread-count");
  return response.data;
};

// Mark one notification as read
export const markAsRead = async (id) => {
  const response = await api.put(`/api/notifications/${id}/read`);
  return response.data;
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  const response = await api.put("/api/notifications/read-all");
  return response.data;
};

// Delete notification
export const deleteNotification = async (id) => {
  const response = await api.delete(`/api/notifications/${id}`);
  return response.data;
};