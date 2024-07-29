import React, { useState } from "react";
import {useAuthContext } from 'views/auth/hooks/useAuthContext'
import { useUsersContext } from 'Hooks/useUsersContext';

const ModifierProfile = ({ handleClose,user }) => {
  const {use} = useAuthContext()
  const { dispatch } = useUsersContext()
  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userData = {
      firstname : firstname,
      lastname: lastname,
      email: email,
      password: password,
     
    };
    if (user && user._id) {
      try {
        const response = await fetch(`/api/user/${user._id}`, {
          method: "PATCH",
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json",
            'Authorization' :`Bearer ${user.token}`

          },
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erreur dans la modification de la réclamation");
        }
  
        const updatedUserData = await response.json();
        dispatch({
          type: "UPDATE_PROFILE",
          payload: { _id: user._id, ...updatedUserData },
        });
  
        handleClose();
      } catch (error) {
        console.error(error);
      }
    }
  }; 
  return (
    <div className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center">
      <div className="rounded-md bg-white p-8 border-2 shadow-lg border-tunisys-100">
        <h2 className="mb-4 text-xl font-semibold text-center text-tunisys-100">Modifier Profile</h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label>
            Nom:
            <input
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <label>
          Prénom:
            <input
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <label>
           Adresse email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
          Mot de passe:
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
         
          <button
            className="text-indigo-00 text-green-600 text- mt-4 rounded py-2 px-4 font-bold hover:text-green-600"
            type="submit"> Enregistrer </button>
          <button
            className="mt-2 rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-600"
            type="button"
            onClick={handleClose} >Annuler </button>
        </form>
      </div>
    </div>
  );
  
};

export default ModifierProfile;
