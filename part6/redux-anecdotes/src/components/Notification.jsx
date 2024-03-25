import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector(({ notification }) => {
    if (notification !== null) {
      return notification;
    }
  });
  const style = {
    borderStyle: notification ? "solid" : "none",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    marginLeft: 0,
  };
  return <div style={style}>{notification}</div>;
};

export default Notification;
