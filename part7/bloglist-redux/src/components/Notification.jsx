import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification || notification.message === null) return null;

  return (
    <div
      className={`notification ${
        notification.type === "success" ? "success" : "error"
      }`}
    >
      {notification.message}
    </div>
  );
};

export default Notification;
