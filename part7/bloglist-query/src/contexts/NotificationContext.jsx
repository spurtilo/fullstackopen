import { createContext, useMemo, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "notification/showNotification":
      return {
        message: action.payload.message,
        msgType: action.payload.msgType,
        showMessage: true,
      };
    case "notification/hideNotification":
      return { ...state, message: null, showMessage: false };
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, {
    message: null,
    msgType: "success",
    showMessage: false,
  });

  const memoizedContextValue = useMemo(
    () => [notification, notificationDispatch],
    [notification, notificationDispatch]
  );

  return (
    <NotificationContext.Provider value={memoizedContextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export default NotificationContext;
