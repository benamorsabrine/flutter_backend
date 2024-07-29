import React, { createContext, useReducer } from 'react';

export const InterventionsContext = createContext();

export const interventionsReducer = (state, action) => {
  switch (action.type) {
        case 'SET_INTERVENTIONS':
          return {
            interventions: action.payload,
          };    
    default:
      return state;
  }
};

export const InterventionsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(interventionsReducer, {
    interventions: [], // Initialize with an empty array
  });

  return (
    <InterventionsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </InterventionsContext.Provider>
  );
};
