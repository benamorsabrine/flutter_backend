import React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ModifyContact = ({ handleClose, contact }) => {
    console.log(contact)
    const [name, setName] = useState(contact?.name || '');
    const [email, setEmail] = useState(contact?.email || '');
    const [office, setOffice] = useState(contact?.office || '');
    const [gender, setGender] = useState(contact?.gender || '');
    const [title, setTitle] = useState(contact?.title || '');
    const [mobile, setMobile] = useState(contact?.mobile || "");
    const [error, setError] = useState(null)

    useEffect(() => {
        setName(contact?.name || "");
        setTitle(contact?.title || "");
        setGender(contact?.gender || "");
        setEmail(contact?.email || "");
        setOffice(contact?.office || "");
        setMobile(contact?.mobile || "");
    }, [contact]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const contactData = {
            name: name,
            email: email,
            office: office,
            mobile: mobile,
            gender: gender,
            title: title
        };

        if (contact && contact._id) {
            try {
                const response = await fetch(`/api/client/contact/${contact.client}/${contact._id}`, {
                    method: "PATCH",
                    body: JSON.stringify(contactData),
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
                        throw new Error(errorData.error || "Error modifying contact");
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
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex h-[600px] w-[350px] items-center justify-center">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100 dark:bg-gray-900">
                    <div className="overflow-x-auto">
                        <h1 className="text-[1.7em]  mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Modifier contact:</h1>
                        <div className="space-y-1">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Contact</label>
                                        <div>
                                            <input type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Adresse email </label>
                                        <div>
                                            <input type="text"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Gender </label>
                                        <div>
                                            <input type="text"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Title </label>
                                        <div>
                                            <input type="text"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        <label htmlFor="office" className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-600">Office</label>
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

export default ModifyContact