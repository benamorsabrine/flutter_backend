import React, { createContext, useReducer } from 'react';

export const NotificationsContext = createContext();

export const notificationsReducer = (state, action) => {
  switch (action.type) {
        case 'SET_NOTIFICATIONS':
          return {
            
            notifications: action.payload,
          };     
    case 'DELETE_NOTIFICATION':
      return {
        notifications: state.notifications.filter(n => n._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const NotificationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationsReducer, {
    notifications:[], // Initialize with an empty array
  });

  return (
    <NotificationsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </NotificationsContext.Provider>
  );
};
