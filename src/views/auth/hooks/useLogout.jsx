import { useAuthContext } from './useAuthContext';
import { useNavigate } from 'react-router-dom';
import { useHelpRecContext } from 'Hooks/useHelpRecContext';
import { useReclamationsContext } from 'Hooks/useRecsContext'
import { useNotificationsContext } from 'Hooks/useNotificationContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchHRec } = useHelpRecContext()
  const { dispatch: dispatchRec } = useReclamationsContext()
  const { dispatch: dispatchNotification } = useNotificationsContext()

  const navigate = useNavigate();

  const logout = () => {
    // Remove user from storage
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    dispatchHRec({ type: 'SET_HREC', payload: null })
    dispatchRec({ type: 'SET_REC', payload: null })
    dispatchNotification({ type: 'SET_NOTIFICATIONS', payload: null })
    navigate('/auth/sign-in'); 
  };

  return { logout };
};
