import React from "react";
import ControllerDashboard from "views/controller/default";
import ControllerProfile from "views/controller/profile";
import ControllerDataTables from "views/controller/tables";
import UserForm from "views/controller/tables/Components/addUser";

import {
  MdHome,
  MdBarChart,
  MdPerson,
  MdLogout,
  MdHelp,
  MdPlusOne,
  MdAdd,
  MdSettings
} from "react-icons/md";

const controllerroutes = [
  {
    name: "Acceuil",
    layout: "/manager",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <ControllerDashboard />,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route
  },
  {
    name: "ajouter utilisateur",
    layout: "/manager",
    path: "add",
    icon: <MdAdd className="h-6 w-6" />,
    component: <UserForm/>,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route
  },

  {
    name: "Utilisateurs",
    layout: "/manager",
    icon: <MdPerson className="h-6 w-6" />,
    path: "utilisateurs",
    component: <ControllerDataTables />,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route

  },

  {
    name: "Profile",
    layout: "/manager",
    path: "profile",
    icon: <MdSettings className="h-6 w-6" />,
    component: <ControllerProfile />,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route


  },
  
  /*{
    name: "Log out",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignIn />,
    allowedRoles: ['ADMIN'] // Liste des rôles autorisés pour accéder à cette route

  },*/

 
];
export default controllerroutes;


