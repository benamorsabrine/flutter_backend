import { useEffect, useState } from 'react'
import { useUsersContext } from './hooks/useUsersContext';
import ModifyUser from './Components/modifyUser';

const Tables = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    const { users, dispatch } = useUsersContext()
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/user/list')
            const json = await response.json()
            if (response.ok) {
                dispatch({ type: 'SET_USERS', payload: json })
            }
        }
        fetchUsers()
    }, [])
    const handleClick = async (userId) => {
        const response = await fetch(`/api/user/${userId}`, {
            method: 'DELETE',
        });
        const json = await response.json();
        if (response.ok) {
            dispatch({ type: 'DELETE_USER', payload: json });
        }
    };
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenModal = (user) => {
        setIsModalOpen(true);
        setSelectedUser(user);
    };
    return (
        <div className='w-full'>
            <div class="-my-2 py-5 w-full overflow-x-auto sm:-mx-6  sm:px-6 lg:-mx-8 pr-10 lg:px-8 	">

                <div class="align-middle inline-block  mt-3 shadow overflow-hidden bg-white shadow-dashboard rounded-bl-lg rounded-br-lg">
                    <table class="w-[1500px]">
                        <thead>
                            <tr>
                                <th class="px-9 py-3 border-b-2 border-gray-300 text-left  tracking-wider">ID</th>
                                <th class="px-6 py-3 border-b-2 border-gray-300 text-left   tracking-wider">Prénom</th>
                                <th class="px-6 py-3 border-b-2 border-gray-300 text-left    tracking-wider">Nom</th>
                                <th class="px-6 py-3 border-b-2 border-gray-300 text-left  leading-4  tracking-wider">Email</th>
                                <th class="px-6 py-3 border-b-2 border-gray-300 text-left  leading-4  tracking-wider">Mot de passe</th>
                                <th class="px-6 py-3 border-b-2 border-gray-300 text-left    tracking-wider">Role</th>
                                <th class="px-6 py-3 border-b-2 border-gray-300 text-left leading- tracking-wider">Modifier</th>
                                <th class="px-6 py-3 border-b-2 border-gray-300 text-left  leading-4 tracking-wider">Supprimer</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {users && users.map((user) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        <div className="flex items-center">
                                            <div>
                                                <div className="text-sm leading-5">{user._id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                                        <div className="text-sm leading-5 ">{user.firstname}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-500 text-sm leading-5">{user.lastname}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-500 text-sm leading-5">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b  border-gray-500 text-sm leading-5">{user.password}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                        <button className="px-5 py-2 border-green-500 border text-green-500 rounded transition duration-300 hover:bg-green-500 hover:text-white focus:outline-none" onClick={() => handleOpenModal(user)}

                                        >Modifier</button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                                        <button className="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-500 hover:text-white focus:outline-none" onClick={() => handleClick(user._id)}>Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div class="sm:flex-1 sm:flex sm:items-center sm:justify-between mt-4 work-sans">
                        <div>
                        </div>
                        <div>
                            <nav class="relative z-0 inline-flex shadow-sm">
                                <div	>
                                    <a href="#" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-tunisys-100 hover:text-tunisys-100 focus:z-10 focus:outline-none focus:border-tunisys-100 focus:shadow-outline-blue active:bg-gray-100 active:text-tunisys-100 transition ease-in-out duration-150" aria-label="Previous">
                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                                <div>
                                    <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium  focus:z-10 focus:outline-none focus:border-tunisys-100 focus:shadow-outline-blue active:bg-tertiary active:text-tunisys-100  transition ease-in-out duration-150 hover:bg-tertiary">
                                        1
                                    </a>
                                    <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium  focus:z-10 focus:outline-none focus:border-tunisys-100 focus:shadow-outline-blue active:bg-tertiary active:text-tunisys-100 transition ease-in-out duration-150 hover:bg-tertiary">
                                        2
                                    </a>
                                    <a href="#" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium0 focus:z-10 focus:outline-none focus:border-tunisys-100 focus:shadow-outline-blue active:bg-tertiary active:text-tunisys-100  transition ease-in-out duration-150 hover:bg-tertiary">
                                        3
                                    </a>
                                </div>
                                <div v-if="pagination.current_page < pagination.last_page">
                                    <a href="#" class="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-tunisys-100 hover:text-tunisys-100 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150" aria-label="Next">
                                        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                </div>
                            </nav>
                        </div>
                    </div>
                    {isModalOpen && (
                        <div className='modal'>
                            <div className='modal-content border-x-violet-800	'>
                                <span className='close' onClick={() => setIsModalOpen(false)}>
                                    &times;
                                </span>
                                {isModalOpen && <ModifyUser handleClose={handleCloseModal} user={selectedUser} />
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>

    );
};

export default Tables;