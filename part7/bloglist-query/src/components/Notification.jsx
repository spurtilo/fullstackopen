import { useNotificationValue } from "../contexts/NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();
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
