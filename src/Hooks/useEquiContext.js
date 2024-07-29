import { EquipementsContext  } from "Contexts/equipementContext"
import { useContext } from "react"

export const useEquipementsContext = () => {
  const context = useContext(EquipementsContext)

  if(!context) {
    throw Error('useEquipementsContext must be used inside a equipementsContextProvider')
  }

  return context
}