import React, { useState, useEffect } from 'react';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';

const ReclamationsList = () => {
  const [reclamations, setReclamations] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await fetch('/api/rec/assigned-reclamations', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`
          },
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        console.log('Response Data:', data);
    
        setReclamations(data.reclamations);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReclamations(); // Don't forget to call the function here
  }, [user.token]);

  return (
    <div>
  <h1 className='text-[2.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'>Réclamations Affectées</h1>
  <ul>
    {reclamations.map(reclamation => (
      <div key={reclamation._id} className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white'>
        <div className='flex'>
          <div className="ml-4">
            <li>
              <p className="mb-1"><strong>Id :</strong>{reclamation._id} </p>
              <p className="mb-1"><strong>Client :</strong>{reclamation.client} </p>
              <p className="mb-1"><strong>Equipement :</strong>{reclamation.equipement} </p>
              <p className="mb-1"><strong>Etat:</strong>{reclamation.etat} </p>
            </li>
          </div>
        </div>
      </div>
    ))}
  </ul>
</div>

  );
};

export default ReclamationsList;
