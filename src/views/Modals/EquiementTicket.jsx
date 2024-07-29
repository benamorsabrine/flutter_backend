import React, { useEffect, useState } from 'react'
import { format, differenceInMonths } from 'date-fns';
const EquipementTicket = ({ handleClose, handleEquipementSelection }) => {
    const [equipementData, setEquipementData] = useState([]);
    const [isEquipementModalOpen, setEquipementModalOpen] = useState(false);

    const fetchEquipements = async () => {
        try {
            const response = await fetch('/api/equi/ticket');
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error fetching equipement:', error);
            return [];
        }
    };


    useEffect(() => {
        fetchEquipements().then(data => setEquipementData(data));
    }, []);

    const selectEquipement = (equipement) => {
        handleEquipementSelection(equipement)
        handleClose();
    }
    
    const [scnquery, setSCNQuery] = useState("");
    return (
        <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center " >
            <div className="overflow-x-auto relative transform overflow-hidden  rounded-lg bg-white text-left shadow-xl rounded-md bg-white p-6 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
                <div className="flex items-center justify-between  border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-sm  text-center dark:text-white p-2 text-tunisys-100">
                        Choisir les équipements  </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="bottom-left-modal" onClick={handleClose}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="ml-4 flex items-center flex-wrap space-x-5">
                    <label htmlFor="search" className=" text-gray-700    dark:text-gray-300">
                        Equipement S/N :</label>
                    <input
                        type="text"
                        id="search"
                        className="block p-2 text-sm text-gray-700 border border-gray-300 rounded-lg w-40 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                        onChange={(e) => setSCNQuery(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full sm:table lg:table text-sm text-left rtl:text-right  text-gray-900 dark:text-gray-900">
                        <thead className="overflow-x-auto text-xs uppercase bg-gray-50 dark:bg-gray-900 ">
                            <tr >
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search"

                                            type="checkbox" 
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-gray-900   dark:text-gray-300">
                                    Equipement S/N :  </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300" >
                                    Modéle                     </th>
                       
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Type                         </th>

                            </tr>
                        </thead>
                        <tbody>
                            {equipementData
                                .filter((equipement) =>
                                    Object.values(equipement)
                                        .filter((value) => typeof value === "string")
                                        .some((value) => value.toLowerCase().includes(scnquery.toLowerCase()))
                                )
                                .map((equipement, index) => (
                                    <tr key={`${equipement._id}-${index}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`checkbox-table-search-${index}`}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onClick={() => selectEquipement(equipement)}

                                               />

                                                <label className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {equipement.equipement_sn}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {equipement.modele}
                                        </td>

                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {equipement.equipement_type}
                                        </td>

                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex items-center justify-end gap-x-6">
                       
                        <button
                            type="button"
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleClose}
                        >
                            Annuler
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EquipementTicket