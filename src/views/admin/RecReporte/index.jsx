import { useReclamationsContext } from 'Hooks/useRecsContext';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
import ListeTechniciens from './Components/ListeTechniciens';

const RecRep = () => {
  const { reclamations, dispatch } = useReclamationsContext();
  const [selectedRec, setSelectedRec] = useState(null);
  const { user } = useAuthContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rec/reporte', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_REP_REC', payload: data });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [dispatch, user]);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (reclamation) => {
    setSelectedRec(reclamation);
    setIsModalOpen(true);
  };
  return (
    <div>
      <h1 className='text-[1.7em] mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600'>Réclamations Reportées</h1>
      <ul>
      {reclamations && reclamations.map((reclamation) => (
          <div key={reclamation._id} className='p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white'>
            <div className='flex'>
              <div className="ml-4">
                <li>
                  <p className="mb-1"><strong>Id :</strong>{reclamation.idn} </p>
                  <p className="mb-1"><strong>Client :</strong>{reclamation.client} </p>
                  <p className="mb-1"><strong>Localisation :</strong>{reclamation.localisation} </p>
                  <p className="mb-1"><strong>Type :</strong>{reclamation.type} </p>
                  <p className="mb-1"><strong>Equipement :</strong>{reclamation.equipement} </p>
                  <p className="mb-1"><strong>Etat:</strong>{reclamation.etat} </p>
                  <p className="mb-1 ">
                    <strong>Traiteur:</strong>
                    {reclamation.traiteur ? reclamation.traiteur : <span className='text-tunisys-100 font-extrabold'> "Non affectée encore"</span>
                    }</p>
                  <p className="mb-1">
                    <strong>Date de création:</strong>
                    {new Date(reclamation.createdAt).toLocaleString('fr-FR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    })}
                  </p>
                  <button className='text-white rounded cursor-pointer p-2.5 border-0 bg-navy-500' onClick={() => handleOpenModal(reclamation)}>
                    Réaffecter
                  </button>

                </li>

              </div>
            </div>
          </div>
        ))}
      </ul>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content border-x-violet-800	'>
            <span className='close' onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            {isModalOpen && <ListeTechniciens handleClose={handleCloseModal} reclamation={selectedRec} />
            }
          </div>
        </div>
      )}

    </div>

  )
}

export default RecRep