import { useState} from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useEquipementsContext } from 'Hooks/useEquiContext';
import ModifierEqui from './modifierEquipement';
const { format } = require('date-fns');
const EquipementDetails = ({ equipement }) => {
  const [selectedEqui, setSelectedEqui] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = (equipement) => {
    setIsModalOpen(true);
    setSelectedEqui(equipement);
  };
  const { dispatch } = useEquipementsContext();
  const handleClick = async () => {
   
    const response = await fetch('/api/equi/' + equipement._id, {
      method: 'DELETE',
      headers: {
      }
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_EQUI', payload: json });
    }
  };
  return (
    <div className='event-details p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white'>
      <div className='flex'>
        <div className="ml-4">
          <p className="mb-1"><strong>Numéro serie :</strong>{equipement.num_serie || 'N/A'} </p>
          <p className="mb-1"><strong>Code agence:</strong>{equipement.code_agence || 'N/A'} </p>
          <p className="mb-1"><strong>Marque :</strong>{equipement.marque || 'N/A'} </p>
          <p className="mb-1"><strong>Date visite préliminaire :</strong> {format(new Date(equipement.date_visite_pre || 'N/A'), 'yy:MM:dd HH:mm')}</p>
          <p className="mb-1"><strong>Date mise service:</strong> {format(new Date(equipement.date_mise_service || 'N/A'), 'yy:MM:dd HH:mm')}</p>
          <p className="mb-1"><strong>Date d'installation physique:</strong>{format(new Date(equipement.date_installation_physique || 'N/A'), 'yy:MM:dd HH:mm')}</p>
          <p className="mb-1"><strong>Date de transfert:</strong>{format(new Date(equipement.date_transfert || 'N/A'), 'yy:MM:dd HH:mm')}</p>
          <p className="mb-1"><strong>Modéle Pc:</strong>{equipement.modele_pc || 'N/A'} </p>
          <p className="mb-1"><strong>Modéle :</strong>{equipement.modele || 'N/A'} </p>
          <p className="mb-1"><strong>Type écran:</strong>{equipement.type_ecran || 'N/A'} </p>
          <p className="mb-1"><strong>Code à barre :</strong>{equipement.code_barre || 'N/A'} </p>
          <p className="mb-1"><strong>Systéme d'exploitation:</strong>{equipement.os || 'N/A'} </p>
          <p className="mb-1"><strong>Nombre casettes:</strong>{equipement.nb_casette || 'N/A'} </p>
          <p className="mb-1"><strong>Version application:</strong>{equipement.version_application || 'N/A'} </p>
          <p className="mb-1">{formatDistanceToNow(new Date(equipement.createdAt), { addSuffix: true })}</p>
          <button onClick={handleClick} className='bg-transparent hover:bg-red-400 text-red-400  hover:text-white py-1 px-2 border border-red-400 hover:border-transparent rounded'>Supprimer</button>
          <button className='bg-transparent ml-2 hover:bg-green-400 text-green-400  hover:text-white py-1 px-2 border border-green-400 hover:border-transparent rounded' onClick={() => handleOpenModal(equipement)}>
            Modifier</button>
        </div>
      </div>
      {isModalOpen && (
        <div className='modal'>
          <div className='modal-content border-x-violet-800	'>
            <span className='close' onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            {isModalOpen && <ModifierEqui handleClose={handleCloseModal} equipement={selectedEqui} />
            }
          </div>
        </div>
      )}

    </div>

  );
};

export default EquipementDetails;



