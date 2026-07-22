import { useEffect, useState } from "react";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
} from "../../services/notificationService";

const NotificationDropdown = ({ onClose, setUnreadCount }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
  try {
    const data = await getNotifications();
    console.log("Notifications API:", data);
    setNotifications(data);
  } catch (error) {
    console.error(error);
  }
};

  const handleNotificationClick = async (notificationId) => {
    try {
      await markAsRead(notificationId);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );

      const unread = await getUnreadCount();
      setUnreadCount(unread.count);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute right-0 top-12 w-96 bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-xl shadow-2xl z-50">
      <div className="p-4 border-b dark:border-slate-700 font-bold">
        Notifications
      </div>

      <div className="max-h-96 overflow-y-auto">

        {notifications.length === 0 ? (
          <p className="p-4 text-gray-500">
            No notifications found
          </p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() =>
                handleNotificationClick(notification.id)
              }
              className={`p-4 border-b dark:border-slate-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-800 transition ${
                !notification.isRead
                  ? "bg-blue-50 dark:bg-slate-800"
                  : ""
              }`}
            >
              <h3 className="font-semibold">
                {notification.title}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-300">
                {notification.message}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;