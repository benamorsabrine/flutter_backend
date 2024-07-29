import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format} from "date-fns";

const PhoneticketDetails = () => {
    const { ticketId } = useParams();
    const [ticketDetails, setticketDetails] = useState(null);
    useEffect(() => {
        if (ticketId) {
            fetch(`/api/ticket/${ticketId}`)
                .then((response) => response.json())
                .then((data) => setticketDetails(data))
                .catch((error) =>
                    console.error("Error fetching ticket details:", error)
                );
        }
    }, [ticketId]);
    if (!ticketDetails) {
        return <div>Loading...</div>;
    }
    console.log(ticketDetails);
    return (
        <>
                <div  className="text-navy-700 mx-0 mb-2.5 mt-5 text-center font-semibold dark:text-white">
                    <h1 className="text-navy-700 mx-0 mb-2.5 text-center text-[1.5em] font-semibold dark:text-white">
                        Ticket Number: {ticketDetails.reference}
                    </h1>
                    <div className="min-w-screen dark:bg-navy-900 relative mx-auto my-5 rounded-2xl bg-white p-5 py-10 shadow-[2px_2px_5px_rgba(0,0,0,0.05)]">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="flex sm:col-span-3">
                                <p className={`mb-1 text-${ticketDetails.reference ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                    <strong className="text-navy-900 dark:text-white">Reference:</strong>
                                    {ticketDetails.reference ? ticketDetails.reference : "Non rempli"}
                                </p>
                            </div>
                            <div className="flex sm:col-span-3">
                                <strong className="text-navy-900 dark:text-white">Status:</strong>
                                <p className={`ml-2 mb-1 text-${ticketDetails.status ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                    {ticketDetails.status ? ticketDetails.status : "Non rempli"}
                                </p>
                            </div>
                            <div className="flex sm:col-span-3">
                                <strong className="text-navy-900 dark:text-white">Service station:</strong>
                                <p className={`ml-2 mb-1 text-${ticketDetails.service_station ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                    {ticketDetails.service_station ? ticketDetails.service_station : "Non rempli"}
                                </p>
                            </div>
                            <div className="flex sm:col-span-3">
                                <strong className="text-navy-900 dark:text-white">Client:</strong>
                                <p className={`ml-2 mb-1 text-${ticketDetails.client?.client ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                    {ticketDetails.client?.client ? ticketDetails.client?.client : "Non rempli"}
                                </p>
                            </div>
                            <div className="flex sm:col-span-3">
                                <strong className="text-navy-900 dark:text-white"> Equipement S/N:</strong>
                                <p className={`ml-2 mb-1 text-${ticketDetails.equipement?.equipement_sn ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                    {ticketDetails.equipement?.equipement_sn ? ticketDetails.equipement?.equipement_sn : "Non rempli"}
                                </p>
                            </div>
                            <div className="flex sm:col-span-3">
                                <strong className="text-navy-900 dark:text-white">Service type:</strong>
                                <p className={`ml-2 mb-1 text-${ticketDetails.service_type ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                    {ticketDetails.service_type ? ticketDetails.service_type : "Non rempli"}
                                </p>
                            </div>
                            <div className="flex sm:col-span-3">
                                <strong className="text-navy-900 dark:text-white">TYPE:</strong>
                                <p className={`ml-2 mb-1 text-${ticketDetails.type ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                    {ticketDetails.type ? ticketDetails.type : "Non rempli"}
                                </p>
                            </div>
                            <div className="flex sm:col-span-3">
                                <strong className="text-navy-900 dark:text-white">Call  Time :</strong>
                                <p className={`ml-2 mb-1 text-${ticketDetails.call_time ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                {ticketDetails.call_time ? format(new Date(ticketDetails.call_time), 'yyyy/MM/dd ') : 'Not yet'}
                                </p>
                            </div>
                            <div className="flex sm:col-span-3">
                                <strong className="text-navy-900 dark:text-white">Receiving Time:</strong>
                                <p className={`ml-2 mb-1 text-${ticketDetails.receiving_time ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                {ticketDetails.receiving_time ? format(new Date(ticketDetails.receiving_time), 'yyyy/MM/dd ') : 'Not yet'}
                                </p>
                            </div>
                            <div className="flex sm:col-span-3">
                                <strong className="text-navy-900 dark:text-white">Technicien:</strong>
                                <p className={`ml-2 mb-1 text-${ticketDetails.technicien ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                    {ticketDetails.technicien ? (
                                        <>
                                            {ticketDetails.technicien.firstname || ''} {ticketDetails.technicien.lastname || ''}
                                        </>
                                    ) : (
                                        "N/A"
                                    )}
                                </p>
                            </div>
                            <div className="flex sm:col-span-3">
                                <strong className="text-navy-900 dark:text-white">Contact:</strong>
                                <p className={`ml-2 mb-1 text-${ticketDetails.contact ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                    {ticketDetails.contact ? (
                                        <>
                                            {ticketDetails.contact.name || ''} | {ticketDetails.contact.email || ''} | {ticketDetails.contact.mobile || ''}
                                        </>
                                    ) : (
                                        "N/A"
                                    )}
                                </p>
                            </div>
                            <div className="flex sm:col-span-3">
                                <strong className="text-navy-900 dark:text-white">Resolving time:</strong>
                                <p className={`ml-2 mb-1 text-${ticketDetails.solving_time ? "navy-900" : "red-700"} dark:text-gray-200`}>
                                {ticketDetails.resolving_time ? format(new Date(ticketDetails.solving_time), 'yyyy/MM/dd ') : 'Not yet'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
         
        </>
    )
}
export default PhoneticketDetails