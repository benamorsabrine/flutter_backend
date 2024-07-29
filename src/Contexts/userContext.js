import { createContext, useReducer } from 'react'

export const UsersContext = createContext()

export const usersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { 
        users: action.payload 
      }
    case 'CREATE_USER':
      return { 
        users: [action.payload, ...state.users] 
      }
      case 'UPDATE_USER':
      const updatedUsers = state.users.map(user => {
        if (user._id === action.payload._id) {
          return action.payload;
        } else {
          return user;
        }
      });
      return { 
        users: updatedUsers
      }
      case 'UPDATE_PROFIL':
      const updatedProfil = state.users.map(user => {
        if (user._id === action.payload._id) {
          return action.payload;
        } else {
          return user;
        }
      });
      return { 
        users: updatedProfil
      }
    case 'DELETE_USER':
      return { 
        users: state.users.filter(u => u._id !== action.payload._id) 
      }
      case 'FETCH_USER_PROFILE':
        const fetchUserProfile = async () => {
          const email = JSON.parse(localStorage.getItem('user'))?.email || '';
          if (!email) {
            return { ...state, error: new Error("No email found in localStorage") };
          }
      
          try {
            const response = await fetch(`/api/user/email/${email}`);
            if (response.ok) {
              const data = await response.json();
              return { ...state, user: data, error: null };
            } else {
              throw new Error("Failed to retrieve user profile data");
            }
          } catch (error) {
            return { ...state, error };
          }
        };
      
        return fetchUserProfile();
      
    
    default:
      return state
  }
}

export const UsersContextProviders = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, { 
    users: null
  })
  
  return (
    <UsersContext.Provider value={{...state, dispatch }}>
      { children }
    </UsersContext.Provider>
  )
}