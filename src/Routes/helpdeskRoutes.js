import { IoMdAlert, IoMdPerson } from "react-icons/io";
import { MdAirplaneTicket, MdHistory, MdHome } from "react-icons/md";
import PhoneticketDetails from "views/helpdesk/TicketAssigned/PhoneTicketDetails";
import TicketAssigned from "views/helpdesk/TicketAssigned/TicketAssignedPhone";
import History from "views/helpdesk/historique";
import Home from "views/helpdesk/home";
import Profil from "views/helpdesk/profil";

const hdroutes = [
    {
        name: "Acceuil",
        layout: "/helpdesk",
        path: "default",
        icon: <MdHome className="h-6 w-6" />,
        component: <Home />,
        allowedRoles: ['HELPDESK'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Phone Ticket",
        layout: "/helpdesk",
        path: "phone",
        icon: <MdAirplaneTicket className="h-6 w-6" />,
        component: <TicketAssigned />,
        allowedRoles: ['HELPDESK'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "History",
        layout: "/helpdesk",
        path: "history",
        icon: <MdHistory className="h-6 w-6" />,
        component: <History />,
        allowedRoles: ['HELPDESK'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Profil",
        layout: "/helpdesk",
        path: "profil",
        icon: <IoMdPerson className="h-6 w-6" />,
        component: <Profil />,
        allowedRoles: ['HELPDESK'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Details",
        layout: "/helpdesk",
        path: "phone/:ticketId",
        icon: <IoMdPerson className="h-6 w-6" />,
        component: <PhoneticketDetails />,
        allowedRoles: ['HELPDESK'] // Liste des rôles autorisés pour accéder à cette route

      },
      

];
export default hdroutes;
