
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
const Home = () => {
  const [reclamations, setReclamations] = useState([]);
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rec/recClient',{
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          },
        });
        const data = await response.json();
        setReclamations(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [user.token])

  return (
    <div>
    {reclamations && reclamations.length > 0 ? (
      <ul>
        {reclamations.map((reclamation) => (
          <li key={reclamation._id} className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white'>
            <div className='flex'>
              <div className="ml-4">
                <p className="mb-1"><strong>Id :</strong>{reclamation.idn} </p>
                <p className="mb-1"><strong>Client :</strong>{reclamation.client} </p>
                <p className="mb-1"><strong>Localisation :</strong>{reclamation.localisation } </p>
                <p className="mb-1"><strong>Type :</strong>{reclamation.type} </p>
                <p className="mb-1"><strong>Equipement :</strong>{reclamation.equipement} </p>
                <p className="mb-1"><strong>Manager:</strong>{reclamation.creerpar} </p>
                <p className="mb-1 text-tunisys-100"><strong>Etat:</strong>{reclamation.etat} </p>

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

export default Home