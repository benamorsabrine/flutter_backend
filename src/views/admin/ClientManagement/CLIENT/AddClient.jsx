import React from 'react'
import { useState } from 'react';
import { useAuthContext } from 'views/auth/hooks/useAuthContext'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddClient = () => {
    const { user } = useAuthContext()
    const [client, setClient] = useState('')
    const [adresse, setAdresse] = useState('')
    const [email, setEmail] = useState('')
    const [corporate, setCorporate] = useState('')
    const [office, setOffice] = useState('')
    const [mobile, setMobile] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const clients = { client, adresse, email, corporate, office, mobile };
        try {
            const response = await fetch('/api/client/add', {
                method: 'POST',
                body: JSON.stringify(clients),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            });
            const json = await response.json();
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
                setAdresse('');
                setEmail('');
                setCorporate('');
                setOffice('');
                setMobile('');
                setError(null);
                toast.success('Client ajouté avec succès');
                setSuccessMessage("Client ajouté avec succès");
                console.log('Request sent successfully');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Une erreur s\'est produite lors de la soumission du htmlFormulaire.');
        }
    };
    return (
        <div className="overflow-x-auto">
            <ToastContainer />
            <h1 className="text-[1.9em]  mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Ajouter client:</h1>
            <div class="space-y-1">
                <div class="border-b border-gray-900/10 pb-12">
                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-3">
                            <label htmlFor="client" class="block text-m font-medium leading-6 text-gray-900 dark:text-gray-600">Client</label>
                            <div class="">
                                <input type="text"
                                value={client}  
                                onChange={(e) => setClient(e.target.value)}  
                                    className="block w-full  border-red-700 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m sm:leading-6" />
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label htmlFor="adresse" class="block text-m font-medium leading-6 text-gray-900 dark:text-gray-600">Adresse</label>
                            <div class="">
                                <input type="text"
                                value={adresse}  
                                onChange={(e) => setAdresse(e.target.value)}  
                                class="block w-full border-red-700 rounded-md border-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m sm:leading-6" />
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label htmlFor="email" class="block text-m font-medium leading-6 text-gray-900 dark:text-gray-600">Adresse email </label>
                            <div class="">
                                <input type="text" 
                                 value={email}  
                                 onChange={(e) => setEmail(e.target.value)}  
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m sm:leading-6" />
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label htmlFor="corporate" class="block text-m font-medium leading-6 text-gray-900 dark:text-gray-600">Corporate</label>
                            <div class="">
                                <input type="text" 
                                value={corporate}  
                                onChange={(e) => setCorporate(e.target.value)}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m sm:leading-6" />
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label htmlFor="office" class="block text-m font-medium leading-6 text-gray-900 dark:text-gray-600">Office</label>
                            <div class="">
                                <input type="text" 
                                value={office}  
                                onChange={(e) => setOffice(e.target.value)}
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m sm:leading-6" />
                            </div>
                        </div>
                        <div class="sm:col-span-3">
                            <label htmlFor="mobile" class="block text-m font-medium leading-6 text-gray-900 dark:text-gray-600">Mobile Number </label>
                            <div class="">
                                <input type="number" 
                                value={mobile}  
                                onChange={(e) => setMobile(e.target.value)}
                                class="block w-full border-red-700 rounded-md border-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-m sm:leading-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-4 flex items-center justify-end gap-x-6">
                <button type="button" class="rounded-md bg-red-600 px-3 py-2 text-m font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit}>Valider</button>
                <button type="button" class="rounded-md bg-indigo-900 px-3 py-2 text-m font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Annuler</button>
            </div>
            {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}
            {successMessage && <div className="success border rounded mx-0 my-5 p-2.5 border-solid bg-green-300">{successMessage}</div>}
        </div>)
}

export default AddClient