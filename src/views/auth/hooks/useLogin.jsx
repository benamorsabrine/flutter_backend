import { useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'; // Add this import

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const navigate = useNavigate(); // Initialize the navigate function

  
  const { dispatch } = useAuthContext()

  const login = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
      switch (json.role) {
        case 'COORDINATRICE':
          navigate('/admin/default');
          break;
        case 'TECHNICIEN':
          navigate('/tech/default');
          break;
        case 'HELPDESK':
          navigate('/helpdesk/default');
          break;
        case 'CLIENT':
          navigate('/client/default');
          break;
        case 'ADMIN':
          navigate('/manager/default');
          break;
        default:
          navigate('/noacces');
          break;
      }
      setIsLoading(false)
    }
  }

  return { login, isLoading, error }
}