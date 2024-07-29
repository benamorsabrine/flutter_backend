import { createContext, useReducer } from "react";

export const HelpRecContext = createContext();

export const helpreclamationsReducer = (state, action) => {
  switch (action.type) {
    case "SET_HREC":
      return {
        helpreclamations: action.payload,
      };
    case "SET_FIN_REC":
      return {
        helpreclamations: action.payload,
      };
    case "UPDATE_REC_DEBUTER":
      const updatedReclamationsDebuter = state.helpreclamations.map(
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
        helpreclamations: updatedReclamationsDebuter,
      };
      case "UPDATE_REC_REPORTER":
        const updatedReclamationsReporter = state.helpreclamations.map(
          (reclamation) => {
            if (reclamation._id === action.payload._id) {
              return { ...reclamation, etat: "reporte" };
            } else {
              return reclamation;
            }
          }
        );
        return {
          ...state,
          helpreclamations: updatedReclamationsReporter,
        };
        case "UPDATE_REC_FINALISER":
        const updatedReclamationsFinaliser = state.helpreclamations.map(
          (reclamation) => {
            if (reclamation._id === action.payload._id) {
              return { ...reclamation, etat: "finalise" };
            } else {
              return reclamation;
            }
          }
        );
        return {
          ...state,
          helpreclamations: updatedReclamationsFinaliser,
        };
    default:
      return state;
  }
};

export const HelpRecContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(helpreclamationsReducer, {
    helpreclamations: null,
  });

  return (
    <HelpRecContext.Provider value={{ ...state, dispatch }}>
      {children}
    </HelpRecContext.Provider>
  );
};
