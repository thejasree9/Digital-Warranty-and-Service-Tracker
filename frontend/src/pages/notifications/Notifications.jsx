import { useEffect, useState } from "react";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../../services/notificationService";
import {
  Bell,
  CheckCircle,
  Trash2,
  CheckCheck,
  Clock,
} from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error loading notifications", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllAsRead();

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Bell className="text-blue-600" size={28} />
          <div>
            <h1 className="text-3xl font-bold dark:text-white">
              Notifications
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Stay updated with your latest activities
            </p>
          </div>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            <CheckCheck size={18} />
            Mark All Read
          </button>
        )}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-20">
          <p className="text-lg text-gray-500">Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-12 text-center">
          <Bell
            size={60}
            className="mx-auto text-gray-400 mb-4"
          />
          <h2 className="text-2xl font-semibold dark:text-white">
            No Notifications
          </h2>
          <p className="text-gray-500 mt-2">
            You're all caught up.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-xl shadow-lg p-5 border transition-all
              ${
                notification.isRead
                  ? "bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700"
                  : "bg-blue-50 dark:bg-slate-700 border-blue-500"
              }`}
            >
              <div className="flex justify-between">
                <div className="flex gap-4 flex-1">
                  <div>
                    {notification.isRead ? (
                      <CheckCircle
                        className="text-green-500 mt-1"
                        size={28}
                      />
                    ) : (
                      <Bell
                        className="text-blue-600 mt-1"
                        size={28}
                      />
                    )}
                  </div>

                  <div className="flex-1">
                    <h2 className="font-bold text-lg dark:text-white">
                      {notification.title}
                    </h2>

                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {notification.message}
                    </p>

                    <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                      <Clock size={15} />
                      {new Date(notification.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  {!notification.isRead && (
                    <button
                      onClick={() =>
                        handleMarkAsRead(notification.id)
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}

                  <button
                    onClick={() =>
                      handleDelete(notification.id)
                    }
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}