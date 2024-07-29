import { HelpRecContext } from "Contexts/helpRecContext"
import { useContext } from "react"

export const useHelpRecContext = () => {
  const context = useContext(HelpRecContext)

  if(!context) {
    throw Error('useHelpRecContext must be used inside a helpRecContextProvider')
  }

  return context
}