import React, { useEffect, useState } from 'react'
import { IoMdAdd, IoMdEye } from 'react-icons/io'
import { MdDelete, MdEdit } from 'react-icons/md'
import { format, differenceInMonths } from 'date-fns';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ModifyContrat from './ModifyContrat';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Contrat = () => {
    const [contratData, setContratData] = useState([]);
    const [selectedContratIds, setSelectedContratIds] = useState([]);
    const [selectedContrat, setSelectedContrat] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleOpenModal = (selectedContrat) => {
        setSelectedContrat(selectedContrat);
        setIsModalOpen(true);
    }
    const handleCheckboxChange = contratID => {
        setSelectedContratIds(prevSelectedIds => {
            if (prevSelectedIds.includes(contratID)) {
                return prevSelectedIds.filter(id => id !== contratID);
            } else {
                return [...prevSelectedIds, contratID];
            }
        });
        console.log(contratID)
    };
    useEffect(() => {
        fetch('/api/contrat/liste')
            .then(response => response.json())
            .then(data => {
                console.log('Contrat Data:', data);
                setContratData(data);
            })
            .catch(error => console.error('Error fetching contrat data:', error));
    }, []);

    const handleDeleteClick = async (contratId) => {
        try {
            const response = await fetch(`/api/contrat/${contratId}`, {
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
    const [scnquery, setSCNQuery] = useState("");
    return (
        <div>
            <ToastContainer />
            <div className="mt-9 relative overflow-x-auto shadow-lg sm:rounded-lg">
                <div className="ml-2 flex items-center flex-wrap space-x-5">
                    <a href='/admin/client/contrat/add'><button className="dark:text-gray-300 flex text-gray-900 dark:text-gray-600"><IoMdAdd className="h-6 w-6" />Add</button></a>
                    <Link to={selectedContratIds.length === 1 ? `/admin/contrat/${selectedContratIds}` : '#'}>
                        <button
                            className={`text-gray-900 dark:text-gray-300 flex dark:text-gray-600 ${selectedContratIds.length !== 1 ? 'cursor-not-allowed' : ''}`}
                            onClick={() => {
                                if (selectedContratIds.length !== 1) {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: 'Please select one contract',
                                    });
                                }
                            }}
                        >
                            <IoMdEye className="h-6 w-6" />
                            View
                        </button>
                    </Link>
                    <button
                        className={`text-gray-900 dark:text-gray-300 flex dark:text-gray-600 ${selectedContratIds.length !== 1 ? 'cursor-not-allowed' : ''}`}
                        onClick={() => {
                            if (selectedContratIds.length !== 1) {
                                Swal.fire({
                                    icon: 'warning',
                                    title: 'Please select one contract',
                                });
                            } else {
                                Swal.fire({
                                    icon: 'question',
                                    title: 'Are you sure?',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, delete it!',
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handleDeleteClick(selectedContratIds[0]);
                                    }
                                });
                            }
                        }}
                    >
                        <MdDelete className="h-6 w-6" />
                        Delete
                    </button>

                </div>
                <br />
                <div className="ml-4 flex items-center flex-wrap space-x-5">
                    <label htmlFor="search" className=" text-gray-700    dark:text-gray-300">
                        Service Contrat No :      </label>
                    <input
                        type="text"
                        id="search"
                        className="block p-2 text-sm text-gray-700 border border-gray-300 rounded-lg w-40 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        onChange={(e) => setSCNQuery(e.target.value)}

                    />
                    <svg className="w-5 h-5 text-red-700    dark:text-gray-300" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    Search
                </div>
                <div className="border-b border-gray-900/10 pb-6">
                </div>
                <div className="overflow-x-auto">
                     <table className="min-w-full sm:table lg:table text-sm text-left rtl:text-right  text-gray-900 dark:text-gray-900">
                        <thead className="overflow-x-auto text-xs uppercase bg-gray-50 dark:bg-gray-900 ">
                            <tr>  
                                <th scope="col" className="flex items-center p-4">
                                    <input id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300" >
                                    Contrat S/N     </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Client          </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Effective Date                        </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Contrat termination                        </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Created                     </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Edit            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {contratData
                                .filter((contrat) =>
                                    Object.values(contrat)
                                        .filter((value) => typeof value === "string")
                                        .some((value) => value.toLowerCase().includes(scnquery.toLowerCase()))
                                )
                                .map((contrat, index) => (
                                    <tr key={index}
                                        style={{
                                            backgroundColor: (() => {
                                                const terminationDate = contrat.termination_date || null;
                                                const currentDate = new Date();
                                                const halfYearInMonths = 6;
                                                const monthsDifference = terminationDate ? differenceInMonths(new Date(terminationDate), currentDate) : null;

                                                if (monthsDifference !== null) {
                                                    if (monthsDifference > halfYearInMonths) {
                                                        return 'hsl(120, 80%, 55%)';
                                                    } else if (monthsDifference <= 0) {
                                                        return 'red';
                                                    } else {
                                                        return 'orange';
                                                    }
                                                }
                                                return '';
                                            })(),
                                        }} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id={`checkbox-table-search-${index}`}
                                                    type="checkbox"

                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    checked={selectedContratIds.includes(contrat._id)}
                                                    onChange={() => handleCheckboxChange(contrat._id)}
                                                />
                                                <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {contrat.contrat_sn || 'N/A'}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {contrat.client && contrat.client.length > 0 && (
                                                <p>{contrat.client[0].client || 'N/A'}</p>
                                            )}   </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {format(new Date(contrat.effective_date || 'N/A'), 'yyyy/MM/dd')}
                                        </td> <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {format(new Date(contrat.termination_date || 'N/A'), 'yyyy/MM/dd')}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {contrat.createdAt ? format(new Date(contrat.createdAt), 'yyyy/MM/dd HH:mm') : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <button onClick={() => handleOpenModal(contrat)} scope="row" className=" px-6 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <MdEdit className="h-6 w-6" />
                                            </button>
                                        </td>
                                    </tr> ))}
                        </tbody>
                    </table>

                    {isModalOpen && <ModifyContrat handleClose={handleCloseModal} contrat={selectedContrat} />
                    }
                </div>
            </div>

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

export default Contrat