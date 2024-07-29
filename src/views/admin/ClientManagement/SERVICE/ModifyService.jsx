import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ModifyService = ({ handleClose, service }) => {

    console.log(service)
    const [service_no, setservice_no] = useState(service?.service_no || "");
    const [model, setModel] = useState(service?.model || "");
    const [quantity, setQuantity] = useState(service?.quantity || "");
    const [working_hour_start, setworking_hour_start] = useState(service?.working_hour_start || "")
    const [working_hour_end, setworking_hour_end] = useState(service?.working_hour_end || "")
    const [response_time_critical, setresponse_time_critical] = useState(service?.response_time_critical || "")
    const [response_time_major, setresponse_time_major] = useState(service?.response_time_major || "")
    const [response_time_minor, setresponse_time_minor] = useState(service?.response_time_minor || "")
    const [error, setError] = useState(null)
    useEffect(() => {
        setservice_no(service?.service_no || "");
        setModel(service?.model || "");
        setQuantity(service?.quantity || "");
        setworking_hour_start(service?.working_hour_start || "");
        setworking_hour_end(service?.working_hour_end || "");
        setresponse_time_critical(service?.response_time_critical || "");
        setresponse_time_major(service?.response_time_major || "");
        setresponse_time_minor(service?.response_time_minor || "");

    }, [service]);
    const handleUpdate = async (updatedService) => {
        try {
            const response = await fetch(`/api/service/${service._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedService),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Contract updated successfully:', result);
            } else {
                const errorDetails = await response.json();
                throw new Error(errorDetails.error); 
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    const handleSave = async () => {
        try {
            await handleUpdate({
                service_no,
                model,
                quantity,
                working_hour_start,
                working_hour_end,
                response_time_critical,
                response_time_major,
                response_time_minor
            });

            toast.success('Service updated successfully');
            handleClose();
        } catch (error) {
            console.error('Error updating contract:', error);
            setError('error', error.message); 
            toast.error('Error updating Service');
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center " >
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <h1 className="text-[1.7em]  mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Modifier service:</h1>
                        <div className="space-y-1">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">
                                            Service  No  </label>
                                        <div className="">
                                            <input type="text"
                                                value={service_no}
                                                onChange={(e) => setservice_no(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">
                                            Modéle  </label>
                                        <div className="">
                                            <input type="text"
                                                value={model}
                                                onChange={(e) => setModel(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">
                                            Quantité  </label>
                                        <div className="">
                                            <input type="text"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                            <label htmlFor="termination_date" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">heure de travail </label>
                            <div className="flex">
                                <input type="time"
                                    value={working_hour_start}
                                    onChange={(e) => setworking_hour_start(e.target.value)}
                                    className="block border-red-700 rounded-md border-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                                <input type="time"
                                    value={working_hour_end}
                                    onChange={(e) => setworking_hour_end(e.target.value)}
                                    className="block ml-5 border-red-700 rounded-md border-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                                    <div className="sm:col-span-3">
                            <label htmlFor="termination_date" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Response time </label>
                            <div className="flex">
                                <label htmlFor="termination_date" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">critical </label>
                                <input type="number"
                                    value={response_time_critical}
                                    onChange={(e) => setresponse_time_critical(e.target.value)}
                                    className="ml-2 w-20 block border-red-700 rounded-md border-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <label htmlFor="termination_date" className="ml-2 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">major </label>

                                <input type="number"
                                    value={response_time_major}
                                    onChange={(e) => setresponse_time_major(e.target.value)}
                                    className="ml-2  w-20 block ml-5 border-red-700 rounded-md border-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                <label htmlFor="termination_date" className="ml-2 block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">minor </label>

                                <input type="number"
                                    value={response_time_minor}
                                    onChange={(e) => setresponse_time_minor(e.target.value)}
                                    className="ml-2 ml-2  w-20 block ml-5 border-red-700 rounded-md border-2  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                            </div>
                        </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" onClick={handleClose} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                            <button type="submit"
                                onClick={handleSave} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>
                        {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}

                    </div>
                </div>
            </div>
        </>
    )
}

export default ModifyService