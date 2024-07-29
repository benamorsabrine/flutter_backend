import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ModifyClient = ({ handleClose, client }) => {
    console.log(client)
    const [clients, setClient] = useState(client?.client || "");
    const [adresse, setAdresse] = useState(client?.adresse || "");
    const [email, setEmail] = useState(client?.email || "");
    const [corporate, setCorporate] = useState(client?.corporate || "");
    const [office, setOffice] = useState(client?.office || "");
    const [mobile, setMobile] = useState(client?.mobile || "");
    const [error, setError] = useState(null)

    useEffect(() => {
        setClient(client?.client || "");
        setAdresse(client?.adresse || "");
        setEmail(client?.email || "");
        setCorporate(client?.corporate || "");
        setOffice(client?.office || "");
        setMobile(client?.mobile || "");
    }, [client]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const clientData = {
            client: clients,
            adresse: adresse,
            email: email,
            corporate: corporate,
            office: office,
            mobile: mobile,
        };

        if (client && client._id) {
            try {
                const response = await fetch(`/api/client/${client._id}`, {
                    method: "PATCH",
                    body: JSON.stringify(clientData),
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
                        throw new Error(errorData.error || "Error modifying client");
                    }
                } else {
                    responseData = await response.json();
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

            <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center " >
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <h1 className="text-[1.7em]  mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Modifier client:</h1>
                        <div className="space-y-1">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="Client" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Client</label>
                                        <div className="">
                                            <input type="text"
                                                value={clients}
                                                onChange={(e) => setClient(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Adresse</label>
                                        <div className="">
                                            <input type="text"
                                                value={adresse}
                                                onChange={(e) => setAdresse(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Adresse email </label>
                                        <div className="">
                                            <input type="text"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Corporate</label>
                                        <div className="">
                                            <input type="text"
                                                value={corporate}
                                                onChange={(e) => setCorporate(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Office</label>
                                        <div >
                                            <input type="text"
                                                value={office}
                                                onChange={(e) => setOffice(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="mobile" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">
                                            Mobile
                                        </label>
                                        <div>
                                            <input
                                                type="text"
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" onClick={handleClose} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                            <button type="submit" onClick={handleSubmit} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>
                        {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ModifyClient             