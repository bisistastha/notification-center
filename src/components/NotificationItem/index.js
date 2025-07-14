import React from 'react';
import { useDispatch } from 'react-redux';
import { markAsRead, markAsUnread } from '../../redux/notificationsSlice';
import './index.css';

const NotificationItem = ({ notification }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const updatedNotification = { ...notification, read: !notification.read };
    localStorage.setItem(`notif-${notification.id}`, JSON.stringify(updatedNotification));
    if (notification.read) {
      dispatch(markAsUnread(notification.id));
    } else {
      dispatch(markAsRead(notification.id));
    }
  };

  return (
    <div
      className={`notification-item ${notification.read ? 'read' : 'unread'}`}
      onClick={handleClick}
    >
      <p><strong>Type:</strong> {notification.type}</p>
      <p>{notification.message}</p>
      <small>{new Date(notification.timestamp).toLocaleString()}</small>
    </div>
  );
};

export default NotificationItem;