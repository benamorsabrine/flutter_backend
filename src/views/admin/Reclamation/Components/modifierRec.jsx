import React, { useState } from "react";
import { useReclamationsContext } from 'Hooks/useRecsContext';
import {useAuthContext } from 'views/auth/hooks/useAuthContext'

const ModifierRec = ({ handleClose, reclamation }) => {
  const {user} = useAuthContext()
  const { dispatch } = useReclamationsContext();
  const [idn, setIdn] = useState(reclamation?.idn || "");
  const [type, setType] = useState(reclamation?.type || "");
  const [client, setClient] = useState(reclamation?.client || "");
  const [technicien, setTechnicien] = useState(reclamation?.technicien || "");
  const [equipement, setEquipement] = useState(reclamation?.equipement || "");
  const [localisation, setLocalisation] = useState(reclamation?.localisation || "");
  const [etat, setEtat] = useState(reclamation?.etat || "");
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const reclamationData = {
      idn : idn,
      type: type,
      client: client,
      technicien: technicien,
      equipement: equipement,
      localisation : localisation,
      etat : etat
    };
    if (reclamation && reclamation._id) {
      try {
        const response = await fetch(`/api/rec/${reclamation._id}`, {
          method: "PATCH",
          body: JSON.stringify(reclamationData),
          headers: {
            "Content-type": "application/json",
            'Authorization' :`Bearer ${user.token}`

          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur dans la modification de la réclamation");
        }
  
        const updatedRecData = await response.json();
        dispatch({
          type: "UPDATE_REC",
          payload: { _id: reclamation._id, ...updatedRecData },
        });
  
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  }; 
  return (
    <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
      <div className="rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100">
        <h2 className="mb-4 text-xl font-semibold text-center text-tunisys-100">Modifier Réclamation</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>
            Idn:
            <input
              type="text"
              value={idn}
              onChange={(e) => setIdn(e.target.value)}
            />
          </label>
          <label>
          Type:
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </label>
          <label>
           Client:
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </label>
          <label>
          Technicien:
            <input
              type="text"
              value={technicien}
              onChange={(e) => setTechnicien(e.target.value)}
            />
          </label>
          <label>
            Equipement:
            <input
              type="text"
              value={equipement}
              onChange={(e) => setEquipement(e.target.value)}
            />
          </label>
          <label>
            Localisation:
            <input
              type="text"
              value={localisation}
              onChange={(e) => setLocalisation(e.target.value)}
            />
          </label>
          <label>
            Etat:
            <input
              type="text"
              value={etat}
              onChange={(e) => setEtat(e.target.value)}
            />
          </label>
          <button
            className="text-indigo-00 text-green-600 text- mt-4 rounded py-2 px-4 font-bold hover:text-green-600"
            type="submit"> Enregistrer </button>
          <button
            className="mt-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-600"
            type="button"
            onClick={handleClose} >Annuler </button>
        </form>
      </div>
    </div>
  );
  
};

export default ModifierRec;
