import { NotificationsContext } from "Contexts/notificationContext"
import { useContext } from "react"

export const useNotificationsContext = () => {
  const context = useContext(NotificationsContext)

  if(!context) {
    throw Error('useNotificationsContext must be used inside a notificationsContextProvider')
  }

  return context
}