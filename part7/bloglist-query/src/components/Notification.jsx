import { useNotificationState } from "../contexts/NotificationContext";

const Notification = () => {
  const notification = useNotificationState();
  if (!notification || notification.message === null) return null;
  return (
    <div
      className={`notification ${notification.msgType === "success" ? "success" : "error"}`}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
