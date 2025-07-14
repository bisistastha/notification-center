import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification, markAllAsRead, markAsRead, markAsUnread } from '../../redux/notificationsSlice';
import NotificationList from '../NotificationList';
import './index.css';

const NOTIFICATIONS_PER_PAGE = 5;

const generateMockNotification = () => {
  const types = ['comment', 'alert', 'like'];
  const messages = ['New comment on your post', 'System alert received', 'Someone liked your post'];
  const index = Math.floor(Math.random() * types.length);
  return {
    type: types[index],
    message: messages[index],
    timestamp: new Date().toISOString(),
  };
};

const NotificationCenter = ({ darkMode, setDarkMode }) => {
  const dispatch = useDispatch();
  const { byId, allIds } = useSelector((state) => state.notifications);

  // Restore read/unread status from localStorage on mount
  useEffect(() => {
    allIds.forEach(id => {
      const stored = localStorage.getItem(`notif-${id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.read) {
          dispatch(markAsRead(id));
        } else {
          dispatch(markAsUnread(id));
        }
      }
    });
  }, [allIds, dispatch]);

  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock incoming notifications every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const notification = generateMockNotification();
      dispatch(addNotification(notification));
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);

  // Filter and sort notifications
  const filteredNotifications = useMemo(() => {
    let list = allIds.map(id => byId[id]);
    if (filterType !== 'all') {
      list = list.filter(n => n.type === filterType);
    }
    list.sort((a, b) => {
      return sortOrder === 'newest'
        ? new Date(b.timestamp) - new Date(a.timestamp)
        : new Date(a.timestamp) - new Date(b.timestamp);
    });
    return list;
  }, [allIds, byId, filterType, sortOrder]);

  const totalPages = Math.ceil(filteredNotifications.length / NOTIFICATIONS_PER_PAGE);

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [currentPage, totalPages]);

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * NOTIFICATIONS_PER_PAGE,
    currentPage * NOTIFICATIONS_PER_PAGE
  );

  const handleMarkAllRead = () => dispatch(markAllAsRead());
  const handleFilterChange = (e) => { setFilterType(e.target.value); setCurrentPage(1); };
  const handleSortChange = (e) => { setSortOrder(e.target.value); setCurrentPage(1); };
  const handleThemeToggle = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  return (
    <div className={`notification-center ${darkMode ? 'dark' : 'light'}`}>
      <h1>Notification Center</h1>
      <div className="notification-controls">
        <label>
          Filter:{' '}
          <select value={filterType} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="comment">Comments</option>
            <option value="alert">Alerts</option>
            <option value="like">Likes</option>
          </select>
        </label>
        <label>
          Sort:{' '}
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </label>
        <button onClick={handleMarkAllRead}>Mark All as Read</button>
        <button onClick={handleThemeToggle}>Toggle Theme</button>
      </div>

      <NotificationList notifications={paginatedNotifications} />

      <div className="pagination-controls">
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage} of {totalPages || 1}</span>
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={() => window.location.reload()} className="clear-all">
          Clear All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;