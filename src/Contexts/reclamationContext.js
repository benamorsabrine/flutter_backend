import { createContext, useReducer } from "react";

export const ReclamationsContext = createContext();

export const reclamationsReducer = (state, action) => {
  switch (action.type) {
    case "SET_REC":
      return {
        reclamations: action.payload,
      };
    case "SET_FIN_REC":
      return {
        reclamations: action.payload,
      };
    case "SET_REP_REC":
      return {
        reclamations: action.payload,
      };
    case "CREATE_REC":
      return {
        reclamations: [action.payload, ...state.reclamations],
      };
      case "UPDATE_REC_AFFECTER":
        const updatedReclamationsAffecter = state.reclamations.map(
          (reclamation) => {
            if (reclamation._id === action.payload._id) {
              return { ...reclamation, etat: "en cours" };
            } else {
              return reclamation;
            }
          }
        );
        return {
          ...state,
          helpreclamations: updatedReclamationsAffecter,
        };
      
    case "UPDATE_REC":
      const updatedReclamations = state.reclamations.map((reclamation) => {
        if (reclamation._id === action.payload._id) {
          return action.payload;
        } else {
          return reclamation;
        }
      });
      return {
        reclamations: updatedReclamations,
      };
    case "DELETE_REC":
      return {
        reclamations: state.reclamations.filter(
          (r) => r._id !== action.payload._id
        ),
      };

    default:
      return state;
  }
};

export const ReclamationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reclamationsReducer, {
    reclamations: null,
  });

  return (
    <ReclamationsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReclamationsContext.Provider>
  );
};
