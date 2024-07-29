import React, { useState, useEffect } from "react";
import { useReclamationsContext } from 'Hooks/useRecsContext';
import { useAuthContext } from 'views/auth/hooks/useAuthContext'
import { toast, ToastContainer } from 'react-toastify';

const ListeTechniciens = ({ handleClose, reclamation }) => {
    const { user } = useAuthContext();
    const { dispatch } = useReclamationsContext();
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/user/tech');
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

    useEffect(() => {
        fetchUsers().then(data => setUsers(data));
    }, []);

    const Reaffecter = async (reclamationId, userId) => {
        try {
            const response = await fetch(`/api/rec/reaffecter/${reclamationId}/affecte`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    traiteur: userId, // Pass the user ID as traiteur
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const updatedReclamation = await response.json();

            dispatch({
                type: 'UPDATE_REC_AFFECTER',
                payload: { _id: reclamationId, etat: 'affecte' },
            });

            toast.success('État de la réclamation mis à jour : affecte');

        } catch (error) {
            console.error('Error:', error);
            toast.error('Erreur lors de la mise à jour de l\'état de la réclamation');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
                <div className="rounded-md bg-white p-8 border-2 shadow-lg border-navy-600">
                    <h2 className="mb-4 text-[1.7em] text-center text-navy-600 font-semibold">Choisir un technicien</h2>

                    <ul>
                        {users.map(user => (
                            <li key={user._id} value={user._id}>
                                <p
                                    className="bg-gray-200 w-full h-[35px] text-[1.7em] rounded text-xl text-center text-navy-700 hover:bg-orange-300 active:bg-green-500 transition duration-200"
                                    onClick={() => {
                                        Reaffecter(reclamation._id, user._id); // Pass user ID to Reaffecter
                                        handleClose();
                                    }}
                                >
                                    {user.firstname} {user.lastname}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="mt-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-600"
                        type="button"
                        onClick={handleClose}
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </>
    );
};

export default ListeTechniciens;
