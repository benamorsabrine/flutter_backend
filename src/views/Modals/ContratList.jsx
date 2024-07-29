import React, { useEffect, useState } from 'react'
import { format, differenceInMonths } from 'date-fns';
const ContratList = ({ handleClose, handleContratSelection }) => {
    const [contratData, setContratData] = useState([]);
    useEffect(() => {
        fetch('/api/contrat/liste')
            .then(response => response.json())
            .then(data => setContratData(data))
            .catch(error => console.error('Error fetching contrat data:', error));

    }, []);
    const selectContrat = (contrat) => {
        handleContratSelection(contrat);
        console.log(contrat)
        handleClose();
    };
    const [scnquery, setSCNQuery] = useState("");
    return (
        <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center " >
            <div className="overflow-x-auto relative transform overflow-hidden  rounded-lg bg-white text-left shadow-xl rounded-md bg-white p-6 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
                <div class="flex items-center justify-between  border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-sm  dark:text-white p-2 text-tunisys-100">
                        Contact  </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="bottom-left-modal" onClick={handleClose}>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div className="ml-4 flex items-center flex-wrap space-x-5">
                    <label htmlFor="search" className=" text-gray-700    dark:text-gray-300">
                        Contrat service No :</label>
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
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 text-gray-900   dark:text-gray-300">
                                    Service Contrat No </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300" >
                                    Contrat S/N </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Client  </th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Effective Date</th>
                                <th scope="col" className="px-6 py-3 text-gray-900    dark:text-gray-300">
                                    Contrat termination</th>
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
                                    <tr
                                        key={index}
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
                                        }}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id={`checkbox-table-search-${index}`}
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onClick={() => selectContrat(contrat)} // Pass a callback function
                                                />
                                                <label htmlFor={`checkbox-table-search-${index}`} className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {contrat.service_cn || 'N/A'}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {contrat.contrat_sn || 'N/A'}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {contrat.client && contrat.client.length > 0 && (
                                                <>
                                                    <p>{contrat.client[0].client || 'N/A'}</p>
                                                </>
                                            )}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {format(new Date(contrat.effective_date || 'N/A'), 'yyyy/MM/dd')}
                                        </td>
                                        <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {format(new Date(contrat.termination_date || 'N/A'), 'yyyy/MM/dd')}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>)
}

export default ContratList