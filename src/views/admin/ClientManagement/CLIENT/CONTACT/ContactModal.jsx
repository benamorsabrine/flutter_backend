import React from 'react'
import { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io'
import { MdDelete, MdEdit, MdPersonAdd } from 'react-icons/md'
import AddContact from './AddContact'
import ModifyContact from './ModifyContact';
import { toast } from 'react-toastify';
const ContactModal = ({ handleClose, client }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
    const [contactData, setContactData] = useState([])
    const [selectedContact, setSelectedContact] = useState(null)
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await fetch(`/api/client/contact/${client}`);
                if (response.ok) {
                    const contactData = await response.json();
                    setContactData(contactData);
                    console.log(contactData);
                } else {
                    console.error('Failed to fetch contacts');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchContacts();
    }, [client, isModalOpen]);


    console.log(client)

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = (client) => {
        setIsModalOpen(true)
    }
    const openModifyModal = (contact) => {
        setIsModifyModalOpen(true)
        setSelectedContact(contact)
    }
    const handleCloseModifyModal = () => {
        setIsModifyModalOpen(false);
    };
    const handleClick = async (contact) => {
        try {
            const response = await fetch(`/api/client/contact/${client}/${contact._id}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                const json = await response.json();
                console.log('Response:', json.message);
                toast.success("Supression effectué avec succés")
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
            }
        } catch (error) {
            console.error('Network error:', error.message);
        }
    };

    return (
        <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center " >
            {isModalOpen && <AddContact handleClose={handleCloseModal} client={client} />}

            {isModifyModalOpen && <ModifyContact handleClose={handleCloseModifyModal} contact={selectedContact} />}
            <div className="overflow-x-auto relative transform overflow-hidden  rounded-lg bg-white text-left shadow-xl rounded-md bg-white p-6 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
                <div class="flex items-center justify-between  border-b rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-sm  dark:text-white p-2 text-tunisys-100">
                        Contact  </h3>
                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="bottom-left-modal" onClick={handleClose}>
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <button onClick={handleOpenModal} className="dark:text-gray-300 flex text-gray-900 dark:text-gray-600"><IoMdAdd className="h-6 w-6" />Add</button>
                <table className="min-w-full sm:table lg:table text-sm text-left rtl:text-right  text-gray-900 dark:text-gray-900">
                    <thead className="overflow-x-auto text-xs uppercase bg-gray-50 dark:bg-gray-900 ">
                        <tr >
                            <th scope="col" className="px-2 py-3 text-gray-900   dark:text-gray-300">
                                Client                        </th>
                            <th scope="col" className="px-2 py-3 text-gray-900   dark:text-gray-300">
                                Title                       </th>
                            <th scope="col" className="px-2 py-3 text-gray-900    dark:text-gray-300">
                                Adresse email                 </th>
                            <th scope="col" className="px-2 py-3 text-gray-900    dark:text-gray-300">
                                Gender                        </th>
                            <th scope="col" className="px-2 py-3 text-gray-900    dark:text-gray-300">
                                Office                       </th>
                            <th scope="col" className="px-2 py-3 text-gray-900    dark:text-gray-300">
                                Mobile Number                        </th>
                            <th scope="col" className="px-2 py-3 text-gray-900    dark:text-gray-300">
                                Edit                        </th>
                            <th scope="col" className="px-2 py-3 text-gray-900    dark:text-gray-300">
                                Delete                       </th>

                        </tr>
                    </thead>
                    <tbody className="overflow-x-auto text-xs uppercase bg-gray-50 dark:bg-gray-900 ">
                        {contactData.map((contact, index) => (
                            <tr
                                key={index}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >

                                <td scope="row" className="px-2 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                    {contact.name}
                                </td>
                                <td scope="row" className="px-2 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                    {contact.title}
                                </td>
                                <td scope="row" className="px-2 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                    {contact.email}
                                </td> <td scope="row" className="px-2 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                    {contact.gender}
                                </td>
                                <td scope="row" className="px-2 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                    {contact.office}
                                </td>
                                <td scope="row" className="px-2 py-4  text-gray-900 whitespace-nowrap dark:text-white">
                                    {contact.mobile}
                                </td>
                                <td>
                                    <button
                                        scope="row"
                                        onClick={() => openModifyModal(contact)}
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        <MdEdit className="h-6 w-6" />
                                    </button>

                                </td>

                                <td> <button onClick={() => handleClick(contact)} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <MdDelete className="h-6 w-6" />
                                </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default ContactModal