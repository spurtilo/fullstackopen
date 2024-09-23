import { NotificationProps } from '../types';

const Notification = ({ messages }: NotificationProps) => {
  if (!messages || messages.length === 0) return null;
  return (
    <div className={'error'}>
      {messages.map((message, index) => {
        return <p key={index}>{message}</p>;
      })}
    </div>
  );
};

export default Notification;
