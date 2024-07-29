import { useState,useEffect } from "react";
import {useReclamationsContext} from "Hooks/useRecsContext";
import {useAuthContext } from 'views/auth/hooks/useAuthContext'

const ReclamationForm = ({ socket }) => {
  const {user} = useAuthContext()
    const { dispatch } = useReclamationsContext();
    const [user_id, setUserIdn] = useState(user._id);
    const [creerpar, setCreerpar] = useState(user._id);
    const [idn, setIdn] = useState('');
    const [type, setType] = useState('');
    const [client, setClient] = useState('');
    const [traiteur, setTraiteur] = useState('');
    const [equipement, setEquipement] = useState('');
    const [localisation, setLocalisation] = useState('');
    const [etat, setEtat] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState(""); 
    const [emptyFields, setEmptyFields] = useState([]);
    const [users, setUsers] = useState([]);
//affichage des techniciens et helpdesk 
    const fetchUsers = async () => {
        try {
          const response = await fetch('/api/user/techhelp'); // Replace with your actual API endpoint
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching users:', error);
          return [];
        }
      };
      useEffect(() => {
        fetchUsers().then(data => setUsers(data));
      }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!user){
          setError('Vous devez etre connectez')
          return
      }
        const reclamation = { idn,type,client,traiteur,equipement,etat, localisation,user_id,creerpar}
        const response = await fetch('/api/rec/add', {
            method: 'POST',
            body: JSON.stringify(reclamation),
            headers: {
                'Content-type': 'application/json',
                'Authorization' :`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields || []) // Provide a default empty array if emptyFields is not present

        }
        if (response.ok) {
            setEmptyFields([])
            setIdn('')
            setType('')
            setClient('')
            setEquipement('')
            setTraiteur('')
            setLocalisation('')
            setEtat('')
            setError(null)
            dispatch({ type: 'CREATE_REC', payload: json })
            setSuccessMessage("Réclamation ajoutée avec succès");
            setTimeout(() => {
                setSuccessMessage("");
            }, 5000); 
            if (socket) {
              socket.emit("sendNotification", {
                senderId: creerpar, // senderId is creerpar
                receiverId: user._id // receiverId is the user's id
              });
            }
      }
    }
  return (
    <form className="create block mt-6" onSubmit={handleSubmit}>
    <h1 className="text-[1.7em]  mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Ajouter réclamation :</h1>
    <label className="block dark:text-gray-600">Id :</label>
    <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('idn') ? 'border-red-500' : 'border-[#ddd]'
        }`} type="number"
        onChange={(e) => setIdn(e.target.value)}
        value={idn}
    />
    <label className="block dark:text-gray-600 ">Type :</label>
    <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('type') ? 'border-red-500' : 'border-[#ddd]'
        }`} type="text"
        onChange={(e) => setType(e.target.value)}
        value={type}
    />
    <label className="block dark:text-gray-600">Client :</label>
    <input className={`block w-full border rounded box-border mb-2 p-2.5 border-solid ${emptyFields.includes('client') ? 'border-red-500' : 'border-[#ddd]'
        }`} type="text"
        onChange={(e) => setClient(e.target.value)}
        value={client}
    />
   <label className="block dark:text-gray-600">Technicien / help desk :</label>
   <select
        className={`block w-full border rounded box-border mb-2 p-2.5 border-solid ${
          emptyFields.includes('traiteur') ? 'border-red-500' : 'border-[#ddd]'
        }`}
        onChange={(e) => setTraiteur(e.target.value)}
        value={traiteur}
      >
        <option value="">Selectionner personne</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>
            {user.firstname} {user.lastname}
          </option>
        ))}
      </select>
     <label className="block dark:text-gray-600">Equipement :</label>
    <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('equipement') ? 'border-red-500' : 'border-[#ddd]'
        }`} type="text"
        onChange={(e) => setEquipement(e.target.value)}
        value={equipement}
    />
     <label className="block dark:text-gray-600">Localisation :</label>
    <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('localisation') ? 'border-red-500' : 'border-[#ddd]'
        }`} type="text"
        onChange={(e) => setLocalisation(e.target.value)}
        value={localisation}
    />
     <label className="block dark:text-gray-600">Etat :</label>
    <input className={`block w-full border rounded box-border  mb-2 p-2.5 border-solid ${emptyFields.includes('etat') ? 'border-red-500' : 'border-[#ddd]'
        }`} type="text"
        onChange={(e) => setEtat(e.target.value)}
        value={etat} 
    />
    <input type="hidden" name="user_id" value={user_id} />
    <input type="hidden" name="creepar" value={creerpar} />
    <button className="text-white rounded cursor-pointer p-2.5 border-0 bg-tunisys-100">Valider</button>
    {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}
    {successMessage && <div className="success border rounded mx-0 my-5 p-2.5 border-solid bg-green-300">{successMessage}</div>}
</form>  )
}

export default ReclamationForm;