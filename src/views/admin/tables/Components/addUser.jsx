import { useState } from "react"
import { useUsersContext } from '../hooks/useUsersContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { useAuthContext } from 'views/auth/hooks/useAuthContext';

const UserForm = () => {
    const { dispatch } = useUsersContext()
    //const {user} = useAuthContext()
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const users = { firstname, lastname, email, password, role }
        const response = await fetch('/api/user/add', {
            method: 'POST',
            body: JSON.stringify(users),
            headers: {
                'Content-type': 'application/json',
                //'Authorization' :`Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setEmptyFields([])
            setFirstname('')
            setLastname('')
            setEmail('')
            setPassword('')
            setRole('')
            setError(null)
            dispatch({ type: 'CREATE_USER', payload: json })
            console.log('un nouveau utilisateur est ajouté', json)
            toast.success('Utilisateur ajouté avec succès');

        }
    }
    return (
        <div>
            <ToastContainer />
            <form className="create block mt-6" onSubmit={handleSubmit}>
                <h1 className="text-4xl  mt-10 mb-2.5 mx-0 text-center font-semibold dark:text-gray-600">Ajouter utilisateur :</h1>
                <label className="block dark:text-gray-600 text-2xl">Nom :</label>
                <input className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields.includes('firstname') ? 'border-red-500' : 'border-[#ddd]'
                    }`} type="text"
                    value={firstname}
                    autoComplete="firsttname"
                    onChange={(e) => setFirstname(e.target.value)}

                />
                <label className="block dark:text-gray-600 text-2xl">Prénom :</label>
                <input className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields.includes('lastname') ? 'border-red-500' : 'border-[#ddd]'
                    }`} type="text"
                    value={lastname}
                    autoComplete="lastname"
                    onChange={(e) => setLastname(e.target.value)}

                />
                <label className="block dark:text-gray-600 text-2xl">Adresse email:</label>
                <input className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields.includes('email') ? 'border-red-500' : 'border-[#ddd]'
                    }`} type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className="block dark:text-gray-600 text-2xl">Mot de passe :</label>
                <input className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields.includes('password') ? 'border-red-500' : 'border-[#ddd]'
                    }`} type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className="block dark:text-gray-600 text-2xl">Rôle :</label>
                <select
                    className={`block w-full border rounded box-border mt-2.5 mb-5 p-2.5 border-solid ${emptyFields.includes('role') ? 'border-red-500' : 'border-[#ddd]'}
  `} value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="null">Null</option>

                    <option value="TECHNICIEB">Technicien</option>
                    <option value="HELPDESK">Help desk</option>
                    <option value="CLIENT">Client</option>
                    <option value="COORDINATRICE">Service Manager</option>
                    <option value="COORDINATRICE">Coordinateur/Coordinatrice de service</option>
                </select>
                <button className="text-white rounded cursor-pointer p-2.5 border-0 bg-tunisys-100 justify-center text-xl">Ajouter utilisateur</button>
                {error && <div className="error border rounded mx-0 my-5 p-2.5 border-solid bg-red-300">{error}</div>}
            </form>
        </div>
    )
}
export default UserForm;
