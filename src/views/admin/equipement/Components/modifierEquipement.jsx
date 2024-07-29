
import React, { useState } from "react";
import { useEquipementsContext } from 'Hooks/useEquiContext';
const ModifierEqui = ({ handleClose, equipement }) => {
  const { dispatch } = useEquipementsContext();
  const [num_serie, setNumserie] = useState(equipement?.num_serie || "");
  const [code_agence, setCodeAgence] = useState(equipement?.code_agence || "");
  const [marque, setMarque] = useState(equipement?.marque || "");
  const [date_visite_pre, setDate_visite_pre] = useState(equipement?.date_visite_pre || "");
  const [date_mise_service, setMiseService] = useState(equipement?.date_mise_service || "");
  const [date_transfert, setDateTransfer] = useState(equipement?.date_transfert || "");
  const [date_installation_physique, setDateInstallation] = useState(equipement?.date_installation_physique || "");
  const [modele_pc, setModele_pc] = useState(equipement?.modele_pc || "");
  const [modele, setModele] = useState(equipement?.modele || "");
  const [type_ecran, setModele_ecran] = useState(equipement?.type_ecran || "");
  const [os, setOs] = useState(equipement?.os || "");
  const [code_barre, setCode_barre] = useState(equipement?.code_barre || "");
  const [nb_casette, setNbCasette] = useState(equipement?.nb_casette || "");
  const [version_application, setVersion_application] = useState(equipement?.version_application || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const equipementData = {
      num_serie: num_serie,
      code_agence: code_agence,
      marque: marque,
      date_visite_pre: date_visite_pre,
      date_mise_service: date_mise_service,
      date_installation_physique: date_installation_physique,
      modele_pc: modele_pc,
      modele: modele,
      type_ecran: type_ecran,
      os: os,
      date_transfert: date_transfert,
      code_barre: code_barre,
      nb_casette: nb_casette,
      version_application: version_application,
    };
    if (equipement && equipement._id) {
      try {
        const response = await fetch(`/api/equi/${equipement._id}`, {
          method: "PATCH",
          body: JSON.stringify(equipementData),
          headers: {
            "Content-type": "application/json",
          },
        });
        if (!response.ok) {
          console.log(response); // Log the server response
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur dans la modification de l'équipement");
        }

        const updatedEquiData = await response.json();
        dispatch({
          type: "UPDATE_EQUI",
          payload: { _id: equipement._id, ...updatedEquiData },
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
            Numéro série:
            <input
              type="text"
              value={num_serie}
              onChange={(e) => setNumserie(e.target.value)}
            />
          </label>
          <label>
            Code Agence:
            <input
              type="text"
              value={code_agence}
              onChange={(e) => setCodeAgence(e.target.value)}
            />
          </label>
          <label>
            Marque :
            <input
              type="text"
              value={marque}
              onChange={(e) => setMarque(e.target.value)}
            />
          </label>
          <label>
            Date visite préliminaire:
            <input
              type="datetime-local"
              value={date_visite_pre ? new Date(date_visite_pre).toISOString().slice(0, 16) : ""}
              onChange={(e) => setDate_visite_pre(e.target.value)}
            />
          </label>
          <label>
            Date mise en service:
            <input
              type="datetime-local"
              
              value={date_mise_service ? new Date(date_mise_service).toISOString().slice(0, 16) : ""}
              onChange={(e) => setMiseService(e.target.value)}
            />
          </label>

          <label>
            Date d'installation
            <input
              type="datetime-local"
              value={date_installation_physique ? new Date(date_installation_physique).toISOString().slice(0, 16) : ""}
              onChange={(e) => setDateInstallation(e.target.value)}
            />
          </label>
          <label>
            Date de transfert
            <input
              type="datetime-local"
              value={date_transfert ? new Date(date_transfert).toISOString().slice(0, 16) : ""}
              onChange={(e) => setDateTransfer(e.target.value)}
            />
          </label>
          <label>
            Modéle pc:
            <input
              type="text"
              value={modele_pc}
              onChange={(e) => setModele_pc(e.target.value)}
            />
          </label>
          <label>
            Modéle :
            <input
              type="text"
              value={modele}
              onChange={(e) => setModele(e.target.value)}
            />
          </label>

          <label>
            Code à barre :
            <input
              type="number"
              value={code_barre}
              onChange={(e) => setCode_barre(e.target.value)}
            />
          </label>
          <label>
            Modéle écran:
            <input
              type="text"
              value={type_ecran}
              onChange={(e) => setModele_ecran(e.target.value)}
            />
          </label>
          <label>
            Nombre casette:
            <input
              type="text"
              value={nb_casette}
              onChange={(e) => setNbCasette(e.target.value)}
            />
          </label>
          <label>
            Systéme d'exploitation :
            <input
              type="text"
              value={os}
              onChange={(e) => setOs(e.target.value)}
            />
          </label>
          <label>
            Version application :
            <input
              type="text"
              value={version_application}
              onChange={(e) => setVersion_application(e.target.value)}
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

export default ModifierEqui;
