# Notification Center
A scalable Notification Center built with React + Redux, featuring real-time updates (mocked), pagination, grouping by type, read/unread toggling, and full dark/light theme support.

# Features:
* Real-time updates using mocked setInterval
* Grouped rendering by notification type (e.g. comments, alerts)
* Pagination support for large datasets
* Read/unread toggle with localStorage persistence
* Theme toggle (dark/light) with body-wide effect
* Modular and reusable component architecture

# Installation
git clone https://github.com/bisistastha/notification-center.git
cd notification-center
npm install
npm start

# Component Structure
App.js
├── NotificationCenter/index.js
│   ├── NotificationList.js
│       └── NotificationItem/index.js
* App.js — global theme controller
* NotificationCenter — main logic, filtering, pagination, and dispatching
* NotificationList — paginated notification list renderer
* NotificationItem — interactive single notification with read/unread toggling

# State Management
* Redux is used for global notification state.
* Slice: notificationsSlice.js
    * addNotification
    * markAsRead / markAsUnread
    * markAllAsRead
* React's useSelector and useDispatch used for access and mutation.

# Real-Time Updates
* Simulated using setInterval inside useEffect.
* New notifications are dispatched every 5 seconds using addNotification().

# Adding New Notification Types
const types = ['comment', 'alert', 'like']; 
* Add to mock generator, adjust UI filters, and update CSS/theme styles if needed.

# Edge Cases Considered
* Handles empty states gracefully (“No notifications to display”).
* Keeps pagination in sync when filter changes or items are deleted.
* Persist read/unread status using localStorage.

# Theming
* Toggle between light/dark mode using a global setDarkMode state.
* Themes affect body, notification cards, buttons, and controls.
* Responsive design with full-width notification display.

# Performance
* Pagination (not virtualization) for clarity and simplicity.
* Memoization (useMemo) for filtered/sorted notifications.

Would consider virtualization (e.g. react-window) for 10K+ notifications.

# Submission Requirements
* Grouped rendering — done
* Read/unread toggle — done
* Real-time mock — done
* Working UI demo — done
* README/documentation — this file

# Preview
<img width="1357" height="622" alt="image" src="https://github.com/user-attachments/assets/01e13a01-e8b2-49e4-b9d6-34641838e03b" />
<img width="1366" height="619" alt="image" src="https://github.com/user-attachments/assets/5afc211e-bf8c-476c-bb9e-dfa1d435fcd5" />

# Final Step
Once this is ready, push to GitHub:
git init
git add .
git commit -m "Initial notification center submission"
git branch -M main
git remote add origin https://github.com/bisistastha/notification-center.git
git push -u origin main
