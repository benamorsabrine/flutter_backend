import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ClientDetails = () => {
    const { clientId } = useParams();
    const [clientDetails, setClientDetails] = useState(null);

    useEffect(() => {
        if (clientId) {
            fetch(`/api/client/${clientId}`)
                .then(response => response.json())
                .then(data => setClientDetails(data))
                .catch(error => console.error('Error fetching client details:', error));
        }

    }, [clientId]);
    if (!clientDetails) {
        return <div>Loading...</div>;
    }
    console.log(clientDetails)

    return (
        <>
            <h1 className="text-[1.7em] mb-2.5 mx-0 text-gray-900 text-center font-semibold dark:text-gray-600">Client  : {clientDetails.client}</h1>


            <div className='min-w-screen p-5 py-10 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white dark:bg-gray-900'>
                <div class=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Adresse :</strong> {clientDetails.adresse}</p>
                    </div>
                    <div class="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong> Email:</strong> {clientDetails.email} </p>
                    </div>
                    <div class="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Corporate :   </strong>{clientDetails.corporate}</p>
                    </div>
                    <div class="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Mobile : </strong> {clientDetails.mobile} </p>
                    </div>
                    <div class="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Office :   </strong>{clientDetails.office}</p>
                    </div>
                    <div class="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200 flex">
                            <strong>Contact : </strong>
                            {clientDetails.contacts.length > 0 ? (
                                <div>
                                    <p className="mb-1 text-gray-900 dark:text-gray-200">
                                    {clientDetails.contacts.length} contact
                                    </p>

                                </div>
                            ) : (
                                <p className="mb-1 text-tunisys-100 dark:text-tunisys-100">Aucun contact</p>
                            )}
                        </p>

                    </div>
                </div>
                <div>


                </div>
            </div>

        </>

    );
};

export default ClientDetails;
