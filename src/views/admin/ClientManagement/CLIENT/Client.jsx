import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { IoMdAdd, IoMdDoneAll, IoMdEye, IoMdMedkit, IoMdOpen, IoMdSave, IoMdSettings, IoMdShare } from 'react-icons/io'
import { MdDelete, MdEdit, MdPersonAdd } from 'react-icons/md'
import ContactModal from './CONTACT/ContactModal';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModifyClient from './ModifyClient';
const Client = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenModify, setIsModalOpenModify] = useState(false);
    const [selectedClientIds, setSelectedClientIds] = useState([]);
    const [clientData, setClientData] = useState([]);
    const [selectedClient, setSelectedClient] = useState(null);

    useEffect(() => {
        fetch('/api/client/list')
            .then(response => response.json())
            .then(data => setClientData(data))
            .catch(error => console.error('Error fetching client data:', error));
    }, []);
    const handleCheckboxChange = clientId => {
        setSelectedClientIds(prevSelectedIds => {
            if (prevSelectedIds.includes(clientId)) {
                return prevSelectedIds.filter(id => id !== clientId);
            } else {
                return [...prevSelectedIds, clientId];
            }
        });
        console.log(clientId)
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleCloseModify = () => {
        setIsModalOpenModify(false);
    };
    const handleOpenModal = (selectedClientIds) => {
        setSelectedClient(selectedClientIds);
        setIsModalOpen(true);
    };
    const handleOpenModalModify = (client) => {
        if (client) {
            setSelectedClient(client);
            setIsModalOpenModify(true);
        }
    };

    const onDelete = async (clientId) => {
        try {
            const response = await fetch(`/api/client/${clientId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                const result = await response.json();
                toast.success('La suppression a été effectuée avec succès.');
            } else {
                throw new Error('Client deletion failed');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Une erreur est survenue lors de la suppression');
        }
    };

    const handleDeleteClick = () => {
        Swal.fire({
            icon: 'warning',
            title: 'Confirmation de suppression',
            text: 'Êtes-vous sûr de vouloir supprimer ce client et ses contacts associés ?',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
        }).then((result) => {
            if (result.isConfirmed) {
                selectedClientIds.forEach(clientId => onDelete(clientId));

            } else if (result.dismiss === Swal.DismissReason.cancel) {

                console.log('Suppression annulée');
            }
        });
    };
    ////////// SEARCH //////////

    const [query, setQuery] = useState("");
    console.log(clientData.filter(client => client.client.toLowerCase().includes(query)))

    ////////// CONTACT //////////




    return (
        <div>
            <ToastContainer />

            <div className="mt-9 relative overflow-x-auto shadow-lg sm:rounded-lg">
                <div className="ml-2 flex items-center flex-wrap space-x-5">
                    <a href='./add'><button
                        className="dark:text-gray-300 flex text-gray-900 dark:text-gray-600"
                    ><IoMdAdd className="h-6 w-6" />Add</button></a>
                    <button
                        onClick={() => {
                            if (selectedClientIds.length !== 1) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Please select one client',

                                });
                            } else handleOpenModal();
                        }}
                        className={`text-gray-900 dark:text-gray-300 flex dark:text-gray-600 ${selectedClientIds.length !== 1 ? 'cursor-not-allowed' : ''}`}
                    ><MdPersonAdd className="h-6 w-6" />Contact</button>

                    <Link to={selectedClientIds.length === 1 ? `/admin/client/${selectedClientIds[0]}` : '#'}>
                        <button
                            className={`text-gray-900 dark:text-gray-300 flex dark:text-gray-600 ${selectedClientIds.length !== 1 ? 'cursor-not-allowed' : ''}`}
                            onClick={() => {
                                if (selectedClientIds.length !== 1) {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Please select one client',

                                    });
                                }
                            }}
                        >
                            <IoMdEye className="h-6 w-6" />
                            View
                        </button>
                    </Link>
                    <button
                        className={`text-gray-900 dark:text-gray-300 flex dark:text-gray-600 ${selectedClientIds.length !== 1 ? 'cursor-not-allowed' : ''}`}
                        onClick={() => {
                            if (selectedClientIds.length !== 1) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Please select one client',
                                });
                            } else {
                                handleDeleteClick();
                            }
                        }}
                    >
                        <MdDelete className="h-6 w-6" />
                        Delete
                    </button>
                </div>
                <br />

                <div className="ml-4 flex items-center flex-wrap space-x-5">
                    <label htmlFor="search" className=" text-gray-700 dark:text-gray-300">
                        Client :      </label>
                    <input
                        type="text"
                        id="search"
                        className="block p-2 text-sm text-gray-700 border border-gray-300 rounded-lg w-40 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        onChange={(e) => setQuery(e.target.value)}
                    />

                </div>
                <div className="border-b border-gray-900/10 pb-6">
                </div>
                <div className="overflow-x-auto">

                    <table className="min-w-full sm:table lg:table text-sm text-left rtl:text-right  text-gray-900 dark:text-gray-900">
                        <thead className="overflow-x-auto text-xs uppercase bg-gray-50 dark:bg-gray-900 ">
                            <tr className="">
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-gray-900   dark:text-gray-300 ">
                                    Client                        </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300" >
                                    Adresse                       </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Adresse email                 </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Corporate                        </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Office                       </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Mobile Number                        </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Edit                         </th>

                            </tr>
                        </thead>
                        <tbody>

                            {clientData
                                .filter((client) =>
                                    Object.values(client)
                                        .filter((value) => typeof value === "string")
                                        .some((value) => value.toLowerCase().includes(query.toLowerCase()))
                                )
                                .map((client, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id={`checkbox-table-search-${index}`}
                                                    type="checkbox"

                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    checked={selectedClientIds.includes(client._id)}
                                                    onChange={() => handleCheckboxChange(client._id)}
                                                />
                                                <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {client.client}                                </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {client.adresse}
                                        </td> <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {client.email}
                                        </td> <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {client.corporate}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {client.office}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {client.mobile}
                                        </td>
                                        <button onClick={() => handleOpenModalModify(client)} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <MdEdit className="h-6 w-6" /></button>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && <ContactModal handleClose={handleCloseModal} client={selectedClientIds[0]} />
            }

            {isModalOpenModify && (
                <ModifyClient handleClose={handleCloseModify} client={selectedClient} />
            )}

            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal  text-gray-900    dark:text-gray-300 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight  text-gray-900 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight  text-gray-900 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700    dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>)
}

export default Client