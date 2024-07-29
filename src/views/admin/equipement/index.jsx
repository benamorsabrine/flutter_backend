import React from 'react'
import { useEffect } from "react"
import { useEquipementsContext } from "Hooks/useEquiContext"
import EquipementForm from './Components/addEquipement'
import EquipementDetails from './Components/detailsEquipement'

const Equipement = () => {
  const { equipements, dispatch } = useEquipementsContext()

  useEffect(() => {
    const fetchEquipements = async () => {
      const response = await fetch('/api/equi',{
        headers : {
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_EQUI', payload: json})
      }
    }
    

    fetchEquipements()
  
  }, [dispatch])
  return (
    <div className=' grid grid-cols-[3fr_1fr] gap-[100px]'>
      <div className='equipements mt-2.5 grid-cols-[3fr_1fr] gap-[100px] '>
        {equipements && equipements.map((equipement) => (
          <EquipementDetails key={equipement._id} equipement={equipement} />
        ))}
      </div>
      <div className="col-span-1 h-full w-full rounded-xl 2xl:col-span-1">
        <EquipementForm/>
      </div>
    </div>
  )
}

export default Equipement