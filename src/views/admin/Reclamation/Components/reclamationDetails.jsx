import { useState, Link } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useAuthContext } from 'views/auth/hooks/useAuthContext';
import { useReclamationsContext } from 'Hooks/useRecsContext';
import ModifierRec from './modifierRec';
const { format } = require('date-fns');
const ReclamationDetails = ({ reclamation }) => {
  const {user} = useAuthContext()
  const [selectedRec, setSelectedRec] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
      const handleOpenModal = (reclamation) => {
        setIsModalOpen(true);
        setSelectedRec(reclamation);
      };
  const { dispatch } = useReclamationsContext();
  const handleClick = async () => {
    if(!user) {
      return
    }
    const response = await fetch('/api/rec/' + reclamation._id, {
      method: 'DELETE',
      headers: {
        'Authorization' :`Bearer ${user.token}`
      }
    });
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_REC', payload: json });
    }
  };
  return (
    <div className='event-details p-5 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white'>
      <div className='flex'>
        
        <div className="ml-4">
          <p className="mb-1"><strong>Id :</strong>{reclamation.idn} </p>
          <p className="mb-1"><strong>Type :</strong>{reclamation.type} </p>
          <p className="mb-1"><strong>Client :</strong>{reclamation.client} </p>
          <p className="mb-1"><strong>Technicien:</strong>{reclamation.traiteur} </p>
          <p className="mb-1"><strong>Equipement:</strong>{reclamation.equipement} </p>
          <p className="mb-1"><strong>Localisation:</strong>{reclamation.localisation} </p>
          <p className="mb-1">{formatDistanceToNow(new Date(reclamation.createdAt), { addSuffix: true })}</p>
          <button onClick={handleClick} className='bg-transparent hover:bg-red-400 text-red-400  hover:text-white py-1 px-2 border border-red-400 hover:border-transparent rounded'>Supprimer</button>
          <button className='bg-transparent ml-2 hover:bg-green-400 text-green-400  hover:text-white py-1 px-2 border border-green-400 hover:border-transparent rounded' onClick={() => handleOpenModal(reclamation)}>
            Modifier</button>
            <button className='bg-transparent ml-2 hover:bg-yellow-400 text-yellow-400  hover:text-white py-1 px-2 border border-yellow-400 hover:border-transparent rounded'>
            {reclamation.etat}</button>
        </div>
      </div>
      {isModalOpen && (
      <div className='modal'>
        <div className='modal-content border-x-violet-800	'>
          <span className='close' onClick={() => setIsModalOpen(false)}>
            &times;
          </span>
          {isModalOpen && <ModifierRec handleClose={handleCloseModal} reclamation={selectedRec} />
}
        </div>
      </div>
    )}
    </div>
    
  );
};

export default ReclamationDetails;
