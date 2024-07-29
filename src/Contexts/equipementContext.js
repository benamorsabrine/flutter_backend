import { createContext, useReducer } from 'react'

export const EquipementsContext = createContext()

export const equipementsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EQUI':
      return { 
        equipements: action.payload 
      }
    case 'CREATE_EQUI':
      return { 
        equipements: [action.payload, ...state.equipements] 
      }
      case 'UPDATE_EQUI':
      const updatedEquipements = state.equipements.map(equipement => {
        if (equipement._id === action.payload._id) {
          return action.payload;
        } else {
          return equipement;
        }
      });
      return { 
        equipements: updatedEquipements
      }
    case 'DELETE_EQUI':
      return { 
        equipements: state.equipements.filter(e => e._id !== action.payload._id) 
      }
    
    default:
      return state
  }
}

export const EquipementsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(equipementsReducer, { 
    equipements: null
  })
  
  return (
    <EquipementsContext.Provider value={{...state, dispatch }}>
      { children }
    </EquipementsContext.Provider>
  )
}