import { ReclamationsContext } from "../Contexts/reclamationContext"
import { useContext } from "react"

export const useReclamationsContext = () => {
  const context = useContext(ReclamationsContext)

  if(!context) {
    throw Error('useReclamationsContextmust be used inside a reclamationsContextProvider')
  }

  return context
}