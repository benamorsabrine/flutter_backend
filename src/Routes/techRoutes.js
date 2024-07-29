import { MdHistory, MdHome, MdList, MdPerson } from "react-icons/md";
import { IoMdAlert } from "react-icons/io";

import Home from "views/technicien/home";
import History from "views/technicien/historique";
import Profil from "views/technicien/profil";
import ModifierProfile from "views/technicien/profil/components";
import TicketAssigned from "views/technicien/TicketAssigned/TicketAssignedPhone";
import TicketAssignedField from "views/technicien/TicketAssigned/TicketAssignedField";
import PhoneticketDetails from "views/technicien/TicketAssigned/PhoneTicketDetails";
import FieldDetails from "views/technicien/TicketAssigned/FieldTicketDetails";
import Intervention from "views/technicien/intervention/intervention";

const techroutes = [
  {
    name: "Home",
    layout: "/tech",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Home />,
    allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

  },
  {
        name: "Home",
        layout: "/tech",
        path: "home",
        icon: <MdHome className="h-6 w-6" />,
        component: <Home />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Tickets",
        layout: "/tech",
        path: "ticket",
        icon: <IoMdAlert className="h-6 w-6" />,
        component: <TicketAssigned />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Tickets",
        layout: "/tech",
        path: "field",
        icon: <IoMdAlert className="h-6 w-6" />,
        component: <TicketAssignedField />,
        allowedRoles: ['TECHNICIEN'] 

      },
      {
        name: "historique",
        layout: "/tech",
        path: "historique",
        icon: <MdHistory className="h-6 w-6" />,
        component: <History />,
        allowedRoles: ['TECHNICIEN'] 

      },
   
      {
        name: "intervention",
        layout: "/tech",
        path: "intervention/:ticketId",
        icon: <MdList className="h-6 w-6" />,
        component: <Intervention />,
        allowedRoles: ['TECHNICIEN'] 

      },
      {
        name: "profil",
        layout: "/tech",
        path: "profil",
        icon: <MdPerson className="h-6 w-6" />,
        component: <Profil />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "modifier",
        layout: "/tech",
        path: "modifier",
        icon: <MdPerson className="h-6 w-6" />,
        component: <ModifierProfile />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Phone",
        layout: "/tech",
        path: "phone/:ticketId",
        icon: <MdPerson className="h-6 w-6" />,
        component: <PhoneticketDetails />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
      {
        name: "Field",
        layout: "/tech",
        path: "field/:ticketId",
        icon: <MdPerson className="h-6 w-6" />,
        component: <FieldDetails />,
        allowedRoles: ['TECHNICIEN'] // Liste des rôles autorisés pour accéder à cette route

      },
     
 

];
export default techroutes;
