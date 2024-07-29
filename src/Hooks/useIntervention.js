import { InterventionsContext } from "../Contexts/interventionContext"
import { useContext } from "react"

export const useInterventionsContext = () => {
  const context = useContext(InterventionsContext)

  if(!context) {
    throw Error('useInterventionsContext must be used inside a interventionsContextProvider')
  }

  return context
}