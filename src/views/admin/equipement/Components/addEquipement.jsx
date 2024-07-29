import { useState } from "react";
import { useEquipementsContext } from "Hooks/useEquiContext";
const EquipementForm = () => {
    const { dispatch } = useEquipementsContext();
    const [num_serie, setNumserie] = useState("");
    const [type_ecran, setypeEcran] = useState("");
    const [nb_camera, setNbcamera] = useState("");
    const [code_agence, setCodeAgence] = useState("");
    const [marque, setMarque] = useState("");
    const [date_visite_pre, setDate_visite_pre] = useState("");
    const [date_mise_service, setMiseService] = useState("");
    const [date_transfert, setDateTransfer] = useState("");
    const [date_installation_physique, setDateInstallation] = useState("");
    const [modele_pc, setModele_pc] = useState("");
    const [modele, setModele] = useState("");
    const [modele_ecran, setModele_ecran] = useState("");
    const [os, setOs] = useState("");
    const [code_barre, setCode_barre] = useState("");
    const [nb_casette, setNbCasette] = useState("");
    const [version_application, setVersion_application] = useState("");
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const [emptyFields, setEmptyFields] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const equipementData = {
            num_serie,
            code_agence,
            marque,
            date_visite_pre,
            date_mise_service,
            date_transfert,
            date_installation_physique,
            modele_pc,
            modele_ecran,
            os,
            modele,
            code_barre,
            nb_casette,
            version_application,
            nb_camera,
            type_ecran

        };
        const response = await fetch('/api/equi/', {
            method: 'POST',
            body: JSON.stringify(equipementData),
            headers: {
                'Content-type': 'application/json'
            }
        });
        const json = await response.json();
        if (!response.ok) {
            console.log(json); // Log the server response
            setError(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            setEmptyFields([]);
            setNumserie('');
            setCodeAgence('');
            setMarque('');
            setDate_visite_pre('')
            setMiseService('')
            setDateTransfer('');
            setDateInstallation('');
            setModele_pc('');
            setypeEcran('');
            setModele('');
            setModele_ecran('');
            setCode_barre('');
            setNbCasette('');
            setVersion_application('');
            setNbcamera('');
            setOs('');
            setError(null);
            dispatch({ type: 'CREATE_EQUI', payload: json }); // Vous devez avoir une action de création dans votre contexte
            setSuccessMessage("Équipement ajouté avec succès");
        }
    }
    return (
        <form className="create block mt-6" onSubmit={handleSubmit}>
            <h1 className="text-[1.7em] mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Ajouter un équipement :</h1>

            <label className="block dark:text-gray-600 ">Numéro série:</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('num_serie') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="text"
                onChange={(e) => setNumserie(e.target.value)}
                value={num_serie}
            />
            <label className="block dark:text-gray-600 ">Code Agence :</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('code_agence') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="Number"
                onChange={(e) => setCodeAgence(e.target.value)}
                value={code_agence}
            />
            <label className="block dark:text-gray-600 ">Marque</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('marque') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="text"
                onChange={(e) => setMarque(e.target.value)}
                value={marque}
            />
            <label className="block dark:text-gray-600 ">Date visite préliminaire </label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('date_visite_pre') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="datetime-local"
                onChange={(e) => setDate_visite_pre(e.target.value)}
                value={date_visite_pre}
            />
            <label className="block dark:text-gray-600 ">Date Mise en Service :</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('date_mise_service') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="datetime-local"
                onChange={(e) => setMiseService(e.target.value)}
                value={date_mise_service}
            />
             <label className="block dark:text-gray-600 ">Date de transfert :</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('date_transfert') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="datetime-local"
                onChange={(e) => setDateTransfer(e.target.value)}
                value={date_transfert}
            />
           <label className="block dark:text-gray-600 ">Date d'installation :</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('date_installation_physique') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="datetime-local"
                onChange={(e) => setDateInstallation(e.target.value)}
                value={date_installation_physique}
            />
            <label className="block dark:text-gray-600 ">Modéle pc:</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('modele_pc') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="text"
                onChange={(e) => setModele_pc(e.target.value)}
                value={modele_pc}
            />
            <label className="block dark:text-gray-600 ">Type écran:</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('type_ecran') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="text"
                onChange={(e) => setypeEcran(e.target.value)}
                value={type_ecran}
            />
            <label className="block dark:text-gray-600 ">Modéle :</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('modele') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="text"
                onChange={(e) => setModele(e.target.value)}
                value={modele}
            />
            
            <label className="block dark:text-gray-600 ">Nombre casette :</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('nb_casette') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="Number"
                onChange={(e) => setNbCasette(e.target.value)}
                value={nb_casette}
            />
            <label className="block dark:text-gray-600 ">Nombre camera :</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('nb_camera') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="Number"
                onChange={(e) => setNbcamera(e.target.value)}
                value={nb_camera}
            />
            <label className="block dark:text-gray-600 ">Version application :</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('version_application') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="Number"
                onChange={(e) => setVersion_application(e.target.value)}
                value={version_application}
            />
            <label className="block dark:text-gray-600 ">Code à barre :</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('code_barre') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="text"
                onChange={(e) => setCode_barre(e.target.value)}
                value={code_barre}
            />
            <label className="block dark:text-gray-600 ">Systéme d'exploitation :</label>
            <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('os') ? 'border-red-500' : 'border-[#ddd]'
                }`} type="text"
                onChange={(e) => setOs(e.target.value)}
                value={os}
            />
            <button className="text-white rounded cursor-pointer p-2.5 border-0 bg-tunisys-100">Valider</button>
            {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}
            {successMessage && <div className="success border rounded mx-0 my-5 p-2.5 border-solid bg-green-300">{successMessage}</div>}
        </form>
    )
}
export default EquipementForm;
