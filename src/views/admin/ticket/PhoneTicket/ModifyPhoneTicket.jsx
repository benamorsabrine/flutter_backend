import React from "react";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModifyPhoneTicket = ({ handleClose, ticket }) => {
    const [error, setError] = useState(null);
    console.log(ticket);

    const [service_type, setServiceType] = useState(
        ticket?.service_type || ""
    );
    const [reference, setReference] = useState(ticket?.reference || "");
    const [service_station, setServiceStation] = useState(
        ticket?.service_station || ""
    );
    const [call_time, setCallTime] = useState(
        ticket?.call_time || ""
    );


    const handleSave = async (e) => {
        e.preventDefault();
        console.log("bouton appuyé");
        const ticketData = {
            service_type: service_type,
            reference: reference,
            service_station: service_station,
            call_time: call_time || "",

        };

        if (ticket && ticket._id) {
            try {
                const response = await fetch(`/api/ticket/${ticket._id}`, {
                    method: "PUT",
                    body: JSON.stringify(ticketData),
                    headers: {
                        "Content-type": "application/json",
                    },
                });

                let responseData;

                if (!response.ok) {
                    const errorData = await response.json();
                    if (response.status === 400 && errorData.error) {
                        setError(errorData.error.toString());
                    } else {
                        throw new Error(errorData.error || "Error modifying ticket");
                    }
                } else {
                    responseData = await response.json();
                    console.log("Updated ticket data:", responseData);
                    handleClose();
                }
            } catch (error) {
                setError(error.toString());
            }
        }
    };
    return (
        <>
            <ToastContainer />

            <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center ">
                <div className="relative transform overflow-hidden rounded-lg rounded-md border-2 border-tunisys-100 bg-white bg-white p-8 text-left shadow-xl shadow-lg transition-all dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-lg">
                    <h1 className="text-center">Modifier ticket</h1>
                    <div className="overflow-x-auto">
                        <div className="space-y-1">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="Client"
                                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">
                                            Service Type
                                        </label>
                                        <div className="">
                                            <input
                                                type="text"
                                                value={service_type}
                                                onChange={(e) => setServiceType(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="Client"
                                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">
                                            Reference
                                        </label>
                                        <div className="">
                                            <input
                                                type="text"
                                                value={reference}
                                                onChange={(e) => setReference(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="Client"
                                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600" >
                                            Service station
                                        </label>
                                        <div className="">
                                            <input
                                                type="text"
                                                value={service_station}
                                                onChange={(e) => setServiceStation(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label
                                            htmlFor="Client"
                                            className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">
                                            Call time
                                        </label>

                                        <div className="">
                                            <input
                                                type="datetime-local"
                                                value={call_time ? call_time : ""}
                                                onChange={(e) => setCallTime(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-x-6">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="text-sm font-semibold leading-6 text-gray-900  dark:text-white" >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSave}
                                className="text-sm font-semibold leading-6 text-gray-900  dark:text-white"
                            >
                                save
                            </button>
                        </div>
                        {/*error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>*/}
                    </div>
                </div>
            </div>
        </>)
}

export default ModifyPhoneTicket