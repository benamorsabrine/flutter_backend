import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddContact = ({ handleClose, client }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientId, setClientId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [office, setOffice] = useState('');
    const [gender, setGender] = useState('');
    const [title, setTitle] = useState('');
    const [mobile, setMobile] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    useEffect(() => {
        setClientId(client);
    }, [client]); 
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    const clients = { clientId, name, email, title, office, mobile, gender };
    let response;

    try {
        // Assign value to response
        response = await fetch('/api/client/contact', {
            method: 'POST',
            body: JSON.stringify(clients),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await response.json();

        console.log('Response:', json);
        if (!response.ok) {
            if (json.errors && Array.isArray(json.errors)) {
                // Handle validation errors from the server
                const validationErrors = json.errors.join(', ');
                setError(`Validation failed: ${validationErrors}`);
            } else if (json.message) {
                // Handle other error messages from the server
                setError(json.message);
            }
        }

        if (response.ok) {
            setEmptyFields([]);
            setEmail('');
            setOffice('');
            setMobile('');
            setTitle('');
            setGender('');
            setName('');
            setError(null);
            toast.success('Contact ajouté avec succès');
            setSuccessMessage("Contact ajouté avec succès");
            console.log('Request sent successfully');
        }
    } catch (error) {
        console.error('Error:', error);

        // Check if the error is a JSON parsing error
        if (error instanceof SyntaxError && error.message.includes('JSON')) {
            setError('Invalid JSON format in server response');
        } else {
            setError('Une erreur s\'est produite lors de la soumission du formulaire.');
        }

        if (response) {
            console.error('Response:', await response.text());
        }
    }
};


    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex h-[600px] w-[350px] items-center justify-center">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
                <div className="overflow-x-auto">
                    <div class="flex items-center justify-between  border-b rounded-t dark:border-gray-600">
                        <h3 class="text-lg font-sm text-gray-900 dark:text-white p-2">
                            Add </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="bottom-left-modal" onClick={handleClose}>
                            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>

                    <form className="create block mt-6" onSubmit={handleSubmit} >


                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label for="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Contact Person</label>
                                    <div className="mt-2">
                                        <input type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div className="sm:col-span-3">
                                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Title</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label for="office" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Office Number</label>
                                    <div className="mt-2">
                                        <input type="text"
                                            value={office}
                                            onChange={(e) => setOffice(e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>


                                <div className="sm:col-span-3">
                                    <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Gender</label>
                                    <div className="mt-2">
                                        <input type="text"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Mobile Phone</label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-3">
                                    <label for="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Email</label>
                                    <div className="mt-2">
                                        <input type="text"
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}
                        <button type="submit" className='bg-green-500 text-white border rounded p-2'>Valider</button>

                    </form>


                </div>

            </div>



        </div>)
}

export default AddContact