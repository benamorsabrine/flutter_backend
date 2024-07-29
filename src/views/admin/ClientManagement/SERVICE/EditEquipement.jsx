import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAtm, MdDelete, MdEdit, MdPersonAdd } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import EquipementList from 'views/Modals/EquipementList';


const ModifyEquipement = ({ handleClose, service }) => {
    console.log(service._id)
    const [isEquipementModalOpen, setEquipementModalOpen] = useState(false);

    const [error, setError] = useState(null);
    const [equipement, setequipement] = useState(service?.equipement || "")
    const openEquipementModal = () => {
        setEquipementModalOpen(true);
    };
    const closeEquipementModal = () => {
        setEquipementModalOpen(false);
    };
    const [selectedEquipementIds, setselectedEquipementIds] = useState([]);

    const handleEquipementSelection = (selectedEquipements) => {
        const equipementIds = selectedEquipements.map(equipement => equipement._id);
        const equipementSns = selectedEquipements.map(equipement => equipement.equipement_sn); 
        //setselectedEquipementSn(equipementSns.join(', ')); 
        setequipement(equipementIds);
    };
    
    useEffect(() => {
        fetch(`/api/service/${service._id}/equipement`)
            .then(response => response.json())
            .then(data => {
                setequipement(data);
                console.log(data);
            })
            .catch(error => console.error('Error fetching service data:', error));
    }, []);

    return (
        <>
            <ToastContainer />
            

            <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center " >
            {isEquipementModalOpen && <EquipementList handleClose={closeEquipementModal} handleEquipementSelection={handleEquipementSelection} />}
            <div className="overflow-x-auto relative transform overflow-hidden  rounded-lg bg-white text-left shadow-xl rounded-md bg-white p-6 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
                <div class="flex items-center justify-between  border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-sm  dark:text-white p-2 text-tunisys-100">
                        Equipement  </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="bottom-left-modal" onClick={handleClose}>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <button  className="dark:text-gray-300 flex text-gray-900 dark:text-gray-600" onClick={openEquipementModal}><IoMdAdd className="h-6 w-6"  />Add</button>
                <table className="min-w-full sm:table lg:table text-sm text-left rtl:text-right  text-gray-900 dark:text-gray-900">
                    <thead className="overflow-x-auto text-xs uppercase bg-gray-50 dark:bg-gray-900 ">
                        <tr >
                            <th scope="col" className="px-2 py-3 text-gray-900   dark:text-gray-300">
                                Equipement_sn                        </th>
                            <th scope="col" className="px-2 py-3 text-gray-900   dark:text-gray-300">
                                Serie_no                       </th>
                            <th scope="col" className="px-2 py-3 text-gray-900    dark:text-gray-300">
                                Adresse email                 </th>
                            <th scope="col" className="px-2 py-3 text-gray-900    dark:text-gray-300">
                                Delete                       </th>

                        </tr>
                    </thead>
                    <tbody className="overflow-x-auto text-xs uppercase bg-gray-50 dark:bg-gray-900 ">
                        {equipement.map((item, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >

                                <td scope="row" className="px-2 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.equipement_sn}
                                </td>
                                <td scope="row" className="px-2 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.terminal_no
}
                                </td>
                                <td scope="row" className="px-2 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                    {item.adresse}
                                </td> 
                                <td> <button  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <MdDelete className="h-6 w-6" />
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
        </>
    );
};

export default ModifyEquipement;
