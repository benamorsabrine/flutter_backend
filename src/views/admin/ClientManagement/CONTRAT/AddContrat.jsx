import React from 'react'
import { useState, useEffect, useMemo } from "react";
import { useAuthContext } from 'views/auth/hooks/useAuthContext'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClientList from './../../../Modals/ClientList';
import { MdList, MdShower } from 'react-icons/md';
const AddContrat = () => {
    const { user } = useAuthContext()
    const [client, setClient] = useState('')
    const [contrat_sn, setcontrat_sn] = useState('')
    const [effective_date, seteffective_date] = useState('')
    const [termination_date, settermination_date] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]);
    const [attachement, setAttachement] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const [services, setServices] = useState([]);
    const [isClientModalOpen, setClientModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedClientName, setSelectedClientName] = useState('');
    const [selectedClientId, setSelectedClientId] = useState(null);
    const [additionalNumber, setAdditionalNumber] = useState('');
    useEffect(() => {
        const formattedDate = effective_date.replace(/-/g, '');
        const updatedContratSn = `C${formattedDate}${additionalNumber}`;
        setcontrat_sn(updatedContratSn);
    }, [effective_date, additionalNumber]);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setAttachement([{ url: reader.result }]);
        };
      };
      
    const openClientModal = () => {
        setClientModalOpen(true);
    };
    const closeClientModal = () => {
        setClientModalOpen(false);
    };
    const handleClientSelection = (clientInfo) => {
        setSelectedClientName(clientInfo.client);
        setSelectedClientId(clientInfo._id);
        setClient(clientInfo._id);

        console.log("Selected client ID:", clientInfo._id);
        closeClientModal();
    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        const clients = {
            client: selectedClientId,
            contrat_sn,
            effective_date, termination_date, attachement
        };


        console.log(clients);
        try {
            const response = await fetch('/api/contrat/add', {
                method: 'POST',
                body: JSON.stringify(clients),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            console.log(json);
            if (!response.ok) {
                if (json.error) {
                    setError(json.error);
                }
                if (json.emptyFields) {
                    setEmptyFields(json.emptyFields);
                }
            }
            if (response.ok) {
                setEmptyFields([]);
                setClient('');
                setcontrat_sn('');
                seteffective_date('');
                settermination_date('');
                setAttachement('');
                setError(null);
                toast.success('Contrat ajouté avec succès');
                setSuccessMessage("Client ajouté avec succès");
                console.log('Request sent successfully');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Une erreur s\'est produite lors de la soumission du formulaire.');
        }
    };
    const handleReset = () => {
        setEmptyFields([]);
        setClient('');
        setcontrat_sn('');
        seteffective_date('');
        settermination_date('');
        setAttachement('');
    }


    const handleDeleteService = (index) => {
        setServices((prevServices) => prevServices.filter((_, i) => i !== index));
    };
    const [imagePreview, setImagePreview] = useState(null);

    return (
        <div className="overflow-x-auto">
            <ToastContainer />

            <h1 className="text-[1.7em]  mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Ajouter Contrat:</h1>
            <div className="space-y-1">
                <h1 className='text-tunisys-100 '>Contrat S/N : </h1>
                <div className='flex'>
                    <h1 className="text-gray-900 text-[30px]">{`C${effective_date.replace(/-/g, '')}${additionalNumber}`}</h1>

                    <input
                        type="text"
                        onChange={(e) => setAdditionalNumber(e.target.value)}
                        className="block w-[] ml-9 border-red-700 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3 relative">
                            <label htmlFor="client" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Client</label>
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder={selectedClientName ? selectedClientName : ''}
                                    value={selectedClientName ? selectedClientName : ''}
                                    onClick={openClientModal}
                                    className="block w-full border-red-700 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 cursor-pointer"
                                />
                                <MdList className="h-6 w-6 ml-2.5 mt-1.5 text-gray-700" />
                            </div>
                        </div>


                        <div className="sm:col-span-3">
                            <label htmlFor="effective_date" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Effective Date</label>
                            <div className="">
                                <input type="Date"
                                    value={effective_date}
                                    onChange={(e) => seteffective_date(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="termination_date" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Contrat termination Date </label>
                            <div className="">
                                <input type="Date"
                                    value={termination_date}
                                    onChange={(e) => settermination_date(e.target.value)}
                                    className="block w-full border-red-700 rounded-md border-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="attachement" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Attachement</label>
                            <div className="">
                                <input
                                    className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields.includes("attachement") ? "border-red-500" : "border-[#ddd]"
                                        }`}
                                    type="file"
                                    onChange={handleLogoChange}
                                />

                            </div>
                            {imagePreview && (
                                <div>
                                    <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/*services.map((service, index) => (

                <div key={index} className="border rounded mx-0 my-5 p-2.5 border-solid bg-gray-100 dark:bg-navy-700">
                    <div className="flex items-center justify-between">
                        <h3>Service {index}</h3>
                        <button
                            type="button"
                            onClick={() => handleDeleteService(index)}
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            X
                        </button>
                    </div>

                    <div class="border-b border-gray-900/10 pb-12">
                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-3">
                                <label htmlFor="client" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Model</label>
                                <div class="">
                                    <input type="text"
                                        value={client}
                                        onChange={(e) => setClient(e.target.value)}
                                        className="block w-full   rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div class="sm:col-span-3">
                                <label htmlFor="adresse" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Response time</label>
                                <div class="">
                                    <input type="text"
                                        value={adresse}
                                        onChange={(e) => setAdresse(e.target.value)}
                                        class="block w-full  rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>


                            <div class="sm:col-span-3">
                                <label htmlFor="office" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Garantie start date</label>
                                <div class="">
                                    <input type="Date"
                                        value={office}
                                        onChange={(e) => setOffice(e.target.value)}
                                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div class="sm:col-span-3">
                                <label htmlFor="mobile" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Equipement S/N </label>
                                <div class="">
                                    <input type="Date"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        class="block w-full  rounded-md border-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div class="sm:col-span-3">
                                <label htmlFor="mobile" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Quantité d'équipement </label>
                                <div class="">
                                    <input type="Date"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                        class="block w-full  rounded-md border-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div> <div class="sm:col-span-3">
                                <label htmlFor="mobile" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Garantie end date </label>
                                <div class="">
                                    <input 
                                     type="file"
                                        onChange={handleLogoChange}
                                        value={mobile}
                                        class="block w-full rounded-md border-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            ))*/}
            <div className="mt-4 flex items-center justify-end gap-x-6">
                <button type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit}>Valider</button>
                <button type="button" className="rounded-md bg-indigo-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleReset}>Annuler</button>
            </div>
            {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}
            {successMessage && <div className="success border rounded mx-0 my-5 p-2.5 border-solid bg-green-300">{successMessage}</div>}
            {isClientModalOpen && <ClientList handleClose={closeClientModal} handleClientSelection={handleClientSelection} />}

        </div>
    )
}

export default AddContrat