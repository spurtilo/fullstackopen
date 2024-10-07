const Notification = ({ message }: { message: string | undefined }) => {
  if (!message) return null;
  return <div className={'error'}>{message}</div>;
};

export default Notification;
