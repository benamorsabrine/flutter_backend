import { useState,useEffect } from "react";
import { toast, ToastContainer } from 'react-toastify';
const AddEquipement = () => {
    const [equipement_sn, setequipement_sn] = useState("");
    const [equipement_type, setequipement_type] = useState("");
    const [terminal_no, setterminal_no] = useState("");
    const [modele, setModele] = useState("");
    const[status,setStatus] = useState("");
    const[modele_pc,setModelePc] = useState("") 
    const [modele_ecran, setModele_ecran] = useState("");
    const [os, setOs] = useState("");
    const[parametre_reseau,setParametreReseau]= useState("")
    const [nb_camera, setNbCamera  ] = useState("");
    const [nb_casette, setNbCasette] = useState("");
    const [version_application, setVersion_application] = useState("");
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState("");
    const [emptyFields, setEmptyFields] = useState([]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const equipementData = {
            parametre_reseau,
            equipement_sn,
            equipement_type,
            terminal_no,
            modele,
            status,
            modele_pc,
            modele_ecran,
            os,
            nb_casette,
            version_application,
            nb_camera,
        };
        const response = await fetch('/api/equi/add', {
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
            setequipement_sn('');
            setequipement_type('');
            setterminal_no('');
            setModele('')
            setStatus('')
            setModelePc('');
            setModele_ecran('');
            setOs('');
            setParametreReseau('');
            setNbCamera('');
            setNbCasette('');
            setVersion_application('');
            setError(null);
            setSuccessMessage("Équipement ajouté avec succès");
        }
    }
    return (
        <div className="overflow-x-auto">
        <ToastContainer />

        <h1 className="text-[1.7em]  mb-2.5 mx-0 text-center font-semibold dark:text-white">Ajouter Equipement:</h1>
        <div className="space-y-1">
            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 relative">
                    <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">equipement_sn</label>
                        <div >
                            <input type="text"
                                value={equipement_sn}
                                onChange={(e) => setequipement_sn(e.target.value)}
                                className="block w-full dark:bg-navy-900 border-red-700 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">equipement_type</label>
                        <div >
                            <input type="text"
                                value={equipement_type}
                                onChange={(e) => setequipement_type(e.target.value)}
                                className="block w-full border-red-700 dark:bg-navy-900 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">terminal_no</label>
                        <div >
                            <input type="text"
                                value={terminal_no}
                                onChange={(e) => setterminal_no(e.target.value)}
                                className="block w-full border-red-700 dark:bg-navy-900 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">modele</label>
                        <div >
                            <input type="text"
                                value={modele}
                                onChange={(e) => setModele(e.target.value)}
                                className="block w-full  rounded-md border-2 py-1.5 dark:bg-navy-900 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">status</label>
                        <div >
                            <input type="text"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="block w-full  rounded-md border-2 dark:bg-navy-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">modele_pc</label>
                        <div >
                            <input type="text"
                                value={modele_pc}
                                onChange={(e) => setModelePc(e.target.value)}
                                className="block w-full  rounded-md border-2 py-1.5 dark:bg-navy-900 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">version_application</label>
                        <div >
                            <input type="text"
                                value={version_application}
                                onChange={(e) => setVersion_application(e.target.value)}
                                className="block w-full  rounded-md border-2 py-1.5 text-gray-900 dark:bg-navy-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Systéme d'exploitation</label>
                        <div >
                            <input type="text"
                                value={os}
                                onChange={(e) => setOs(e.target.value)}
                                className="block w-full rounded-md border-2 py-1.5 text-gray-900 dark:bg-navy-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">parametre_reseau</label>
                        <div >
                            <input type="text"
                                value={parametre_reseau}
                                onChange={(e) => setParametreReseau(e.target.value)}
                                className="block w-full  rounded-md border-2 py-1.5 text-gray-900 dark:bg-navy-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">modele_ecran</label>
                        <div >
                            <input type="text"
                                value={modele_ecran}
                                onChange={(e) => setModele_ecran(e.target.value)}
                                className="block w-full  rounded-md border-2 py-1.5 text-gray-900 dark:bg-navy-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">nb_casette</label>
                        <div >
                            <input type="number"
                                value={nb_casette}
                                onChange={(e) => setNbCasette(e.target.value)}
                                className="block w-full rounded-md border-2 py-1.5 text-gray-900 dark:bg-navy-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="model" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">nb_camera</label>
                        <div >
                            <input type="number"
                                value={nb_camera}
                                onChange={(e) => setNbCamera(e.target.value)}
                                className="block w-full  rounded-md border-2 py-1.5 dark:bg-navy-900  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="mt-4 flex items-center justify-end gap-x-6">
            <button type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit}>Valider</button>
            <button type="button" className="rounded-md bg-indigo-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Annuler</button>
        </div>
        {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}
        {successMessage && <div className="success border rounded mx-0 my-5 p-2.5 border-solid bg-green-300">{successMessage}</div>}
       
    </div>
        )
}

export default AddEquipement