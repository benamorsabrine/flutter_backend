import React from "react";
import {
    IoMdCloudDownload,
    IoMdUndo,
} from "react-icons/io";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
const TicketApproval = () => {
    const [tickets, setTicket] = useState([]);
    const [scnquery, setSCNQuery] = useState("");
    const [selectedTicket, setSelectedTicket] = useState([]);
    const [selectedTicketIds, setSelectedTicketIds] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    useEffect(() => {
        fetch("/api/ticket/solved")
            .then((response) => response.json())
            .then((data) => setTicket(data))
            .catch((error) => console.error("Error fetching ticket data:", error));
    }, [])
    const handleCheckboxChange = (ticketId) => {
        setSelectedTicketIds((prevSelectedIds) => {
            if (prevSelectedIds.includes(ticketId)) {
                return prevSelectedIds.filter((id) => id !== ticketId);
            } else {
                return [...prevSelectedIds, ticketId];
            }
        });
        console.log(ticketId);
    };


    const handleApprouveClick = async () => {
        Swal.fire({
            icon: "success",
            title: "Confirmation de complétion",
            text: "Êtes-vous sûr de vouloir approuver ce ticket ?",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Oui, approuver",
            cancelButtonText: "Annuler",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/ticket/approved/${selectedTicketIds}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            status: "APPROVED",
                        }),
                    });

                    if (response.ok) {

                        Swal.fire({
                            icon: "success",
                            title: "Ticket approuvé avec succès!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Erreur lors de l'approbation du ticket",
                            text: "Veuillez réessayer plus tard",
                        });
                    }
                } catch (error) {
                    console.error("Error approving ticket:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Erreur lors de l'approbation du ticket",
                        text: "Veuillez réessayer plus tard",
                    });
                }
            }
        });
    };
    const handleResetTicket = async () => {
        Swal.fire({
            title: "Confirmation de réinitialisation",
            text: "Êtes-vous sûr de vouloir réinitialiser ce ticket ?",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Oui, réinitialiser",
            cancelButtonText: "Annuler",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`/api/ticket/resetToSolved/${selectedTicketIds}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            status: "SOLVED",
                        }),
                    });

                    if (response.ok) {
                        Swal.fire({
                            icon: "success",
                            title: "Ticket réinitialisé avec succès!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Erreur lors de la réinitialisation du ticket",
                            text: "Veuillez réessayer plus tard",
                        });
                    }
                } catch (error) {
                    console.error("Erreur lors de la réinitialisation du ticket:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Erreur lors de la réinitialisation du ticket",
                        text: "Veuillez réessayer plus tard",
                    });
                }
            }
        });
    };
    const getBackgroundColor = (status) => {
        switch (status) {
            case 'ASSIGNED':
                return 'bg-red-500';
            case 'SOLVED':
                return 'bg-blue-500';
            case 'APPROVED':
                return 'bg-green-500';
            case 'ACCEPTED':
                return 'bg-pink-500';
            case 'LOADING':
                return 'bg-orange-500';
            case 'REPORTED':
                return 'bg-gray-500';
            default:
                return '';
        }
    };
    return (
        <div>
            <div className="mt-9 relative overflow-x-auto shadow-lg sm:rounded-lg">
                <div className=" mt-2 flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4 ml-2">

                    <div className="ml-2 flex flex-wrap items-center space-x-5">

                        <button
                            className={`flex text-gray-900 dark:text-gray-300 dark:text-gray-600 ${selectedTicketIds.length !== 1 ? "cursor-not-allowed" : ""
                                }`}
                            onClick={() => {
                                if (selectedTicketIds.length !== 1) {
                                    Swal.fire({
                                        icon: "warning",
                                        title: "Please select one Ticket",
                                    });
                                } else {
                                    handleResetTicket()
                                }
                            }}
                        >
                            <IoMdUndo className="h-6 w-6" />
                            Reset
                        </button>
                        <button
                            className={`flex text-gray-900 dark:text-gray-300 dark:text-gray-600 ${selectedTicketIds.length !== 1 ? "cursor-not-allowed" : ""
                                }`}
                            onClick={() => {
                                if (selectedTicketIds.length !== 1) {
                                    Swal.fire({
                                        icon: "warning",
                                        title: "Please select one Ticket",
                                    });
                                } else {
                                    handleApprouveClick();
                                }
                            }}
                        >
                            <IoMdCloudDownload className="h-6 w-6" />
                            Approve
                        </button>
                    </div>
                </div>
                <div className="ml-4 flex flex-wrap items-center space-x-5">
                    <label
                        htmlFor="search"
                        className=" text-gray-700    dark:text-gray-300"
                    >
                        Equipement S/N :
                    </label>
                    <input
                        type="text"
                        id="search"
                        className="block w-40 rounded-lg border border-gray-300 bg-gray-50 p-2 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                        placeholder="Search"
                        onChange={(e) => setSCNQuery(e.target.value)}

                    />
                    <button
                        type="button"
                        className="ml-[-5px] inline-flex items-center  rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                    >
                        <svg
                            className="h-5 w-5 text-red-700    dark:text-gray-300"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        Search
                    </button>
                </div>
                <div className="border-b border-gray-900/10 pb-6"></div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm text-gray-900 rtl:text-right dark:text-gray-900  sm:table lg:table">
                        <thead className="overflow-x-auto bg-gray-50 text-xs uppercase dark:bg-gray-900 ">
                            <tr className="">
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                        />
                                        <label htmlFor="checkbox-all-search" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-gray-900   dark:text-gray-300"
                                >
                                    Ticket No
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-gray-900    dark:text-gray-300"
                                >
                                    Status
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-gray-900    dark:text-gray-300"
                                >
                                    Equipement S/N
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-gray-900    dark:text-gray-300"
                                >
                                    Service Station
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-gray-900    dark:text-gray-300"
                                >
                                    Service type
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-gray-900    dark:text-gray-300"
                                >
                                    TYPE
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-gray-900    dark:text-gray-300"
                                >
                                    Client
                                </th>

                                <th
                                    scope="col"
                                    className="px-6 py-3 text-gray-900    dark:text-gray-300"
                                >
                                    Call in Time
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-gray-900    dark:text-gray-300"
                                >
                                    Receiving Time
                                </th>

                                <th
                                    scope="col"
                                    className="px-6 py-3 text-gray-900    dark:text-gray-300"
                                >
                                    Technicien
                                </th>


                                <th
                                    scope="col"
                                    className="px-6 py-3 text-gray-900    dark:text-gray-300"
                                >
                                    Resolving time
                                </th>

                            </tr>
                        </thead>
                        <tbody>
                            {tickets
                                .filter((ticket) =>
                                    Object.values(ticket)
                                        .filter((value) => typeof value === "string")
                                        .some((value) =>
                                            value.toLowerCase().includes(scnquery.toLowerCase())
                                        )
                                )
                                .map((ticket, index) => (
                                    <tr
                                        key={index}
                                        className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                                    >
                                        <td className="w-4 p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id={`checkbox-table-search-${index}`}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                                                    checked={selectedTicketIds.includes(
                                                        ticket._id
                                                    )}
                                                    onChange={() => handleCheckboxChange(ticket._id)}
                                                />
                                                <label
                                                    htmlFor={`checkbox-table-search-${index}`}
                                                    className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </td>
                                        <td
                                            scope="row"
                                            className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                        >
                                            {ticket.reference || ''}
                                        </td>
                                        <td className={`px-6 py-4 ${getBackgroundColor(ticket.status)}`}>
                                            {ticket.status || ''}
                                        </td>
                                        <td className="px-6 py-4">{ticket.equipement?.equipement_sn || ''}</td>

                                        <td className="px-6 py-4">{ticket.service_station || ''}</td>
                                        <td className="px-6 py-4">{ticket.service_type || ''}</td>
                                        <td className="px-6 py-4">{ticket.type || ''}</td>

                                        <td className="px-6 py-4">{ticket.client ? (
                                            <>
                                                {ticket.client.client || ''}
                                            </>
                                        ) : (
                                            "N/A"
                                        )}</td>
                                        <td className="px-6 py-4"> {ticket.call_time ? format(new Date(ticket.call_time), 'yyyy/MM/dd ') : 'Not yet'}</td>
                                        <td className="px-6 py-4"> {ticket.receiving_time ? format(new Date(ticket.receiving_time), 'yyyy/MM/dd ') : 'Not yet'}</td>
                                        <td className="px-6 py-4">
                                            {ticket.technicien ? (
                                                <>
                                                    {ticket.technicien.firstname || ''} {ticket.technicien.lastname || ''}
                                                </>
                                            ) : (
                                                "N/A"
                                            )}
                                        </td>
                                        <td className="px-6 py-4">  {ticket.solving_time ? format(new Date(ticket.solving_time), 'yyyy/MM/dd ') : 'Not yet'}</td>

                                    </tr>
                                ))}
                        </tbody>
                    </table>

                </div>
            </div>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">1000</span></span>
                <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                    </li>
                    <li>
                        <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">1</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">3</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                    </li>
                    <li>
                        <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default TicketApproval