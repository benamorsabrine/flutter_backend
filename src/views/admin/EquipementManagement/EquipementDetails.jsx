import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EquipementDetails = () => {
  const { equipementId } = useParams();
  const [equipementDetails, setEquipementDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (equipementId) {
      fetch(`/api/equi/${equipementId}`)
        .then((response) => response.json())
        .then((data) => setEquipementDetails(data))
        .catch((error) =>
          console.error("Error fetching equipement details:", error)
        );
    }
  }, [equipementId]);
  if (!equipementDetails) {
    return <div>Loading...</div>;
  }
  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (!equipementDetails) {
    return <div>Loading...</div>;
  }

  console.log(equipementDetails);

  // EDIT EQUIPEMENT
  const handleSave = async (e) => {
    e.preventDefault();
    console.log("bouton appuyé");

    try {
      const response = await fetch(`/api/equi/${equipementDetails._id}`, {
        method: "PATCH",
        body: JSON.stringify(equipementDetails),
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400 && errorData.error) {
          console.error("Error:", errorData.error);
        } else {
          throw new Error(errorData.error || "Error modifying equipment");
        }
      } else {
        const responseData = await response.json();
        console.log("Updated equipment data:", responseData);
        setIsEditing(false); 
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCancel = () => {
    setIsEditing(false); 
  };

  return (
    <>
      <h1 className="text-navy-700 mx-0 mb-2.5 text-center text-[1.7em] font-semibold dark:text-white">
        Equipement S/N : {equipementDetails.equipement_sn}
      </h1>
      <div className="min-w-screen dark:bg-navy-900 relative mx-auto my-5 rounded-2xl bg-white p-5 py-10 shadow-[2px_2px_5px_rgba(0,0,0,0.05)]">
        <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Numéro terminal :</strong>

            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.terminal_no || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, terminal_no: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.terminal_no ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.terminal_no || "Non rempli"}
              </p>
            )}
           
          </div>
          <div className="flex  sm:col-span-3">
            <strong className="text-navy-900 dark:text-white"> Status :</strong>

            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.status || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, status: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.status ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.status || "Non rempli"}
              </p>
            )}

          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Equipement Type : </strong>
            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.equipement_type || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, equipement_type: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.equipement_type ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.equipement_type || "Non rempli"}
              </p>
            )}

          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Client : </strong>
    
              <p className={`mb-1 text-${equipementDetails.client && equipementDetails.client.length > 0 ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.client && equipementDetails.client.length > 0 ? equipementDetails.client[0].client : "Non rempli"}
              </p>
         

          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Service Station : </strong>
            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.service_station || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, service_station: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.service_station ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.service_station || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Contrat : </strong>

            <p className={`mb-1 text-${equipementDetails.contrat && equipementDetails.contrat.length > 0 ? "navy-900" : "red-700"} dark:text-gray-200`}>
              {equipementDetails.contrat && equipementDetails.contrat.length > 0 ? equipementDetails.contrat[0].contrat_sn : "Non rempli"}
            </p>
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Service : </strong>
            <p className={`mb-1 text-${equipementDetails.service && equipementDetails.service.length > 0 ? "navy-900" : "red-700"} dark:text-gray-200`}>
              {equipementDetails.service && equipementDetails.service.length > 0 ? equipementDetails.service[0].service_no : "Non rempli"}
            </p>

          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Nombre casette : </strong>
            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.nb_casette || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, nb_casette: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.nb_casette ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.nb_casette || "Non rempli"}
              </p>
            )}
          </div>

          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Nombre caméra :</strong>
            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.nb_camera || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, nb_camera: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.nb_camera ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.nb_camera || "Non rempli"}
              </p>
            )}

          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Modéle écran : </strong>

            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.modele_ecran || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, modele_ecran: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.modele_ecran ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.modele_ecran || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Modéle pc : </strong>
            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.modele_pc || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, modele_pc: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.modele_ecran ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.modele_pc || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Version Application : </strong>
            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.version_application || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, version_application: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.modele_ecran ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.version_application || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Début garantie : </strong>
            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.garantie_start_date || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, garantie_start_date: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.garantie_start_date ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.garantie_start_date || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Fin garantie : </strong>

            {isEditing ? (
              <input
                type="date"
                value={equipementDetails.garantie_end_date || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, garantie_end_date: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.garantie_end_date ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.garantie_end_date || "Non rempli"}
              </p>
            )}
          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Geolocalisation :</strong>
            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.geolocalisation || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, geolocalisation: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.garantie_end_date ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.geolocalisation || "Non rempli"}
              </p>
            )}

          </div>
          <div className="flex sm:col-span-3">
          <strong className="text-navy-900 dark:text-white">Type Branche :</strong>

            {isEditing ? (
              <input
                type="text"
                value={equipementDetails.branch_type || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, branch_type: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.branch_type ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.branch_type || "Non rempli"}
              </p>
            )}

          </div>
          <div className="flex sm:col-span-3">
            <strong className="text-navy-900 dark:text-white">Date d'installation :</strong>
            {isEditing ? (
              <input
                type="date" // Use type="date" for date input
                value={equipementDetails.installation_date || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, installation_date: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.installation_date ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.installation_date || "Non rempli"}
              </p>
            )}

          
          </div>
          <div className="flex sm:col-span-3">

              <strong className="text-navy-900 dark:text-white">Date formation :</strong>
              {isEditing ? (
              <input
                type="date" // Use type="date" for date input
                value={equipementDetails.date_formation || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, date_formation: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.date_formation ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.date_formation || "Non rempli"}
              </p>
            )}
            
         
          </div>
          <div className="flex sm:col-span-3">
          <strong className="text-navy-900 dark:text-white">Date visite préventive :</strong>

          {isEditing ? (
              <input
                type="text"
                value={equipementDetails.date_visite_préventive || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, date_visite_préventive: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.date_visite_préventive ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.date_visite_préventive || "Non rempli"}
              </p>
            )}
       
          </div>
          <div className="flex sm:col-span-3">
          <strong className="text-navy-900 dark:text-white">Adresse :</strong>

          {isEditing ? (
              <input
                type="text"
                value={equipementDetails.adresse || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, adresse: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.adresse ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.adresse || "Non rempli"}
              </p>
            )}
          
          </div>
          <div className="flex sm:col-span-3">
          <strong className="text-navy-900 dark:text-white">Paramétre réseau :</strong>
          {isEditing ? (
              <input
                type="text"
                value={equipementDetails.parametre_reseau || ""}
                onChange={(e) => setEquipementDetails({ ...equipementDetails, parametre_reseau: e.target.value })}
              />
            ) : (
              <p className={`mb-1 text-${equipementDetails.parametre_reseau ? "navy-900" : "red-700"} dark:text-gray-200`}>
                {equipementDetails.parametre_reseau || "Non rempli"}
              </p>
            )}
            
          </div>
        </div>
        {isEditing ? (
            <>
              <button className="bg-tunisys-100 p-3 rounded-xl text-white" onClick={handleSave}>
                Save
              </button>
              <button className="bg-red-500 p-3 rounded-xl text-white" onClick={handleCancel}>
                Cancel
              </button>
            </>
          ) : (
            <button className="bg-tunisys-100 p-3 rounded-xl text-white" onClick={handleEditClick}>
              Edit
            </button>
          )}
      </div>
    </>
  );
};

export default EquipementDetails;
