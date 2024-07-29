import React, { useEffect, useState } from 'react';

const TechnicienList = ({ handleClose, handleTechnicienSelection }) => {
    const [techniciens, setTechnicien] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/user/technicien/liste');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching technicien:', error);
            return [];
        }
    };

    const selectTechnicien = (technicien) => {
        handleTechnicienSelection(technicien);
        handleClose();
    };

    useEffect(() => {
        fetchUsers().then(data => setTechnicien(data));
    }, []);

    return (
        <>
            <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <h1 className="text-[1.7em]  mb-2.5 mx-0 text-center font-semibold dark:text-gray-700">Liste techniciens :</h1>
                        <div className="space-y-1">
                            <div className="mt-10    sm:grid-cols-6 space-y-4 ">
                                {techniciens.length === 0 ? (
                                    <div className="text-gray-500 text-center">Aucun technicien trouvé</div>
                                ) : (
                                    techniciens.map((technicien, index) => (
                                        <div key={technicien._id} value={technicien._id} className="sm:col-span-3 bg-gray-200 border p-2 rounded dark:bg-navy-700" onClick={() => selectTechnicien(technicien)}>
                                            <div className="mb-4">
                                            <p className=" font-medium leading-6 text-gray-900 dark:text-gray-600">Nom & prénom: {technicien.firstname} {technicien.lastname}</p>
                                  
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" onClick={handleClose} className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Cancel</button>
                            <button type="button" onClick={handleClose} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TechnicienList;
