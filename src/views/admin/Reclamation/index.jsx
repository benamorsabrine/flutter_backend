import { useEffect } from "react"
import { useReclamationsContext } from "Hooks/useRecsContext"
import ReclamationForm from "../Reclamation/Components/reclamationForm";
import ReclamationDetails from "../Reclamation/Components/reclamationDetails";
import {useAuthContext} from "views/auth/hooks/useAuthContext"
const ManageReclamation = () => {
  const { reclamations, dispatch } = useReclamationsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchReclamations = async () => {
      const response = await fetch('/api/rec/',{
        headers : {
          'Authorization' :`Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_REC', payload: json})
      }
    }
    if(user){

     
      fetchReclamations()
    }
  
  }, [dispatch,user])
  return (
    <div className=' grid grid-cols-[3fr_1fr] gap-[100px]'>
      <div className='reclamations mt-2.5 grid-cols-[3fr_1fr] gap-[100px] '>
        {reclamations && reclamations.map((reclamation) => (
          <ReclamationDetails key={reclamation._id} reclamation={reclamation} />
        ))}
      </div>
      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <ReclamationForm/>
      </div>
    </div>
  );
};

export default ManageReclamation;
