import { useEffect, useState } from "react";
import {
  getNotifications,
} from "../../services/notificationService";
import NotificationCard from "./NotificationCard";
import { markAsRead } from "../../services/notificationService";

export default function NotificationPage() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {

  const response = await getNotifications();

  console.log(response);

  setNotifications(response);

};

  

const markRead = async (id) => {

  try {

    await markAsRead(id);

    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );

  } catch (error) {

    console.error(error);

  }

};

  const deleteItem = (id) => {

    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );

  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-8">

        Notifications

      </h1>

      <div className="space-y-5">

        {notifications.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            No Notifications

          </div>

        ) : (

          notifications.map((notification) => (

            <NotificationCard
              key={notification.id}
              notification={notification}
              onRead={markRead}
              onDelete={deleteItem}
            />

          ))

        )}

      </div>

    </div>
  );
}