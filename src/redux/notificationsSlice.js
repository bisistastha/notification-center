import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = {
  byId: {},
  allIds: [],
  groups: {},
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const notification = action.payload;
      const id = uuid();
      const fullNotification = { id, read: false, ...notification };

      state.byId[id] = fullNotification;
      state.allIds.unshift(id);

      const type = notification.type || 'default';
      if (!state.groups[type]) state.groups[type] = [];
      state.groups[type].unshift(id);
    },
    markAsRead: (state, action) => {
      const id = action.payload;
      if (state.byId[id]) state.byId[id].read = true;
    },
    markAsUnread: (state, action) => {
      const id = action.payload;
      if (state.byId[id]) state.byId[id].read = false;
    },
    markAllAsRead: (state) => {
      state.allIds.forEach((id) => {
        state.byId[id].read = true;
      });
    },
  },
});

export const {
  addNotification,
  markAsRead,
  markAsUnread,
  markAllAsRead,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;