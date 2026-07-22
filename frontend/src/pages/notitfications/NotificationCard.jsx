export default function NotificationCard({
  notification,
  onRead,
  onDelete,
}) {
  const color =
    notification.type === "danger"
      ? "border-red-500"
      : notification.type === "warning"
      ? "border-yellow-500"
      : "border-blue-500";

  return (
    <div
      className={`bg-white rounded-xl shadow p-5 border-l-4 ${color}`}
    >
      <div className="flex justify-between">

        <div>

          <h2 className="font-bold text-lg">
            {notification.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {notification.message}
          </p>

          <p className="text-sm text-gray-400 mt-3">
            {notification.date}
          </p>

        </div>

        <div className="flex gap-2">

          {!notification.read && (

            <button
              onClick={() => onRead(notification.id)}
              className="bg-green-600 text-white px-3 rounded"
            >
              Read
            </button>

          )}

          <button
            onClick={() => onDelete(notification.id)}
            className="bg-red-600 text-white px-3 rounded"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}