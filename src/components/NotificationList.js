import React from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ notifications }) => {
  if (!notifications.length) return <p>No notifications to display.</p>;

  return (
    <div className="notification-list">
      {notifications.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationList;