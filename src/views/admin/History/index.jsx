import { useReclamationsContext } from 'Hooks/useRecsContext';
import React, {useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
const History = () => {
  const { reclamations, dispatch } = useReclamationsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rec/finalmanager', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_FIN_REC', payload: data });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  return (
    <div>
    <h1 className='text-[1.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'>Réclamations Finalisées</h1>
    {reclamations && reclamations.length > 0 ? (
      <ul>
        {reclamations.map((reclamation) => (
          <li key={reclamation._id} className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white'>
            <div className='flex'>
              <div className="ml-4">
                <p className="mb-1"><strong>Id :</strong>{reclamation.idn} </p>
                <p className="mb-1"><strong>Client :</strong>{reclamation.client} </p>
                <p className="mb-1"><strong>Traiteur :</strong>{reclamation.traiteur} </p>
                <p className="mb-1"><strong>Localisation :</strong>{reclamation.localisation } </p>
                <p className="mb-1"><strong>Type :</strong>{reclamation.type} </p>
                <p className="mb-1"><strong>Equipement :</strong>{reclamation.equipement} </p>
                <p className="mb-1"><strong>Etat:</strong>{reclamation.etat} </p>
                <p className="mb-1"><strong>Manager:</strong>{reclamation.creerpar} </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p>No reclamations available</p>
    )}
  </div>
      )
}

export default History