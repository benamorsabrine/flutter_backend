import React, { useState, useEffect } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
//import ModifierProfile from './components/index';
import Card from 'components/card';
import {useAuthContext} from "views/auth/hooks/useAuthContext"

const Profil = () => {
  const {auth} = useAuthContext()

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = (user) => {
    setIsModalOpen(true);
  };

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }
  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user'))?.email || '';
    console.log(email)

    if (!email) {
      setError(new Error("No email found in localStorage"));
      setIsLoading(false);
      return;
    }
    fetch(`/api/user/email/${email}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to retrieve user profile data");
        }
      })
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1 className=" ml-6  font-semibold text-[1.7em]	dark:text-tunisys-100 text-tunisys-100 text-center mt-3">Paramétres de profile </h1>
      <Card className=" p-8 h-full w-full  bg-gray-100 rounded-lg border">
        <div className="mb-4">
          <label className="block  text-gray-700 text-lg font-bold mb-2" htmlFor="username">
            Prénom
          </label>
          <input
            className="shadow   text-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="lastname"
            type="text"
            readOnly
            name="lastname"
            value={user.lastname}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700  text-lg  font-bold mb-2" htmlFor="password">
            Nom
          </label>
          <input
            className="shadow appearance-none text-lg border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="firstname"
            type="text"
            readOnly
            name="firstname"
            value={user.firstname}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700  text-lg font-bold mb-2" htmlFor="password">
            Adresse Email
          </label>
          <input
            className="shadow appearance-none border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            readOnly
            name="email"
            value={user.email}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700  text-lg font-bold mb-2" htmlFor="password">
            Role
          </label>
          <input
            className="shadow appearance-none border text-lg rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            type="text"
            readOnly
            name="role"
            value={user.role}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
            Mot de passe
          </label>
          <div className="relative">
            <div className="mb-4 flex">
              <input
                className="shadow text-lg appearance-none border rounded w-full py-2 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={type}
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <span className="flex justify-around items-center" onClick={handleToggle}>
                <Icon className="absolute mr-10" icon={icon} size={25} />
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
         {/* <button
            className="bg-tunisys-100 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleOpenModal(user)}
          >
            modifier
  </button>*/}
        </div>
      </Card>
      {/*{isModalOpen && (
        <div className='modal'>
          <div className='modal-content border-x-violet-800	'>
            <span className='close' onClick={() => setIsModalOpen(false)}>
              &times;
            </span>
            {isModalOpen && <ModifierProfile handleClose={handleCloseModal} user={user} />
            }
          </div>
        </div>
          )}*/}
    </div>
  )
}

export default Profil