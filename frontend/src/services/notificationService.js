const notifications = [
  {
    id: 1,
    title: "Warranty Expiring Soon",
    message: "Your HP Laptop warranty expires in 5 days.",
    date: "2026-07-30",
    type: "warning",
    read: false,
  },
  {
    id: 2,
    title: "Warranty Expired",
    message: "Samsung TV warranty has expired.",
    date: "2026-07-18",
    type: "danger",
    read: true,
  },
  {
    id: 3,
    title: "Service Reminder",
    message: "Car service is due next week.",
    date: "2026-07-28",
    type: "info",
    read: false,
  },
];

export const getNotifications = async () => {
  return {
    success: true,
    data: notifications,
  };
};

export const markAsRead = async (id) => {
  return {
    success: true,
  };
};

export const deleteNotification = async (id) => {
  return {
    success: true,
  };
};