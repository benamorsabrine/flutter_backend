import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format, differenceInMonths } from 'date-fns';
const ServicesDetails = () => {
    const { serviceId } = useParams();
    const [serviceDetails, setServiceDetails] = useState([]);
    console.log('id', serviceId)
    useEffect(() => {
        if (serviceId) {
            fetch(`/api/service/${serviceId}`)
                .then(response => response.json())
                .then(data => setServiceDetails(data))
                .catch(error => console.error('Error fetching service details:', error));
        }
    }, [serviceId]);
    if (!setServiceDetails) {
        return <div>Loading...</div>;
    }
    console.log(serviceDetails)
    return (
        <>
            <h1 className="text-[1.7em] text-tunisys-100  mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Service No : {serviceDetails.service_no || 'N/A'} </h1>
            <div className='min-w-screen p-5 py-10 rounded-2xl relative shadow-[2px_2px_5px_rgba(0,0,0,0.05)] mx-auto my-5 bg-white dark:bg-gray-900'>
                <div className=" grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                    <div class="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Service_no :{serviceDetails.service_no || 'N/A'}    </strong>
                        </p>
                    </div>
                    <div class="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Modéle :{serviceDetails.model || 'N/A'}</strong>
                        </p>
                    </div>
                    <div class="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Quantité :{serviceDetails.quantity || 'N/A'}    </strong>
                        </p>
                    </div>
                    <div className="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Contrat_sn :{serviceDetails.contrat && serviceDetails.contrat.length > 0 ? serviceDetails.contrat[0].contrat_sn : 'N/A'}

                        </strong></p>
                    </div>
                    <div className="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Effective_date :
                            {format(serviceDetails.effective_date ? new Date(serviceDetails.effective_date) : new Date(), 'yyyy/MM/dd')}
                        </strong>
                        </p>
                    </div>
                    <div className="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Termination_date :
                            {format(serviceDetails.termination_date ? new Date(serviceDetails.termination_date) : new Date(), 'yyyy/MM/dd')}
                        </strong>
                        </p>
                    </div>
                    <div className="sm:col-span-3">
                        <p className="mb-1 text-gray-900 dark:text-gray-200"><strong>Equipement S/N : {serviceDetails.equipement && serviceDetails.equipement.length > 0 ? (
                            <ul>
                                {serviceDetails.equipement.map(equipement => (
                                    <li key={equipement._id}>
                                        {equipement.equipement_sn},
                                    </li>
                                ))}
                            </ul>
                        ) : 'N/A'}
                        </strong>
                        </p>
                    </div>
                </div>
                <div>
                </div>
            </div>

        </>)
}

export default ServicesDetails