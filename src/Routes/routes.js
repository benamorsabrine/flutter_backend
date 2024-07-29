import React from "react";
import Dashboard from "views/admin/default";
import ContactUS from "views/admin/help";
import Profile from "views/admin/profile";
import ModifierProfile from "views/admin/profile/components/ModifyModal";
import Equipement from "views/admin/equipement";
import SignIn from "views/auth/SignIn";
import {
  MdEscalator,
  MdHome,
  MdPerson,
  MdEventAvailable,
  MdLogout,
  MdHelp,
  MdHistory,
  MdAirplaneTicket,
} from "react-icons/md";
import SignUp from "views/auth/Signup";
import Calandar from "views/admin/calandar";
import { IoMdAlert, IoMdTv } from "react-icons/io";
import ManageReclamation from "views/admin/Reclamation";
import History from "views/admin/History";
import NoAccess from "layouts/noaccess";
import RecRep from "views/admin/RecReporte";
import ListeTechniciens from "views/admin/RecReporte/Components/ListeTechniciens";
import TicketMangement from "views/admin/ticket/TicketMangement";
import TicketProcessing from "views/admin/ticket/FieldTicket/TicketProcessing";
import PhoneTicketProcessing from "views/admin/ticket/PhoneTicket/PhoneTicketProcessing";
import PhoneTicket from "views/admin/ticket/PhoneTicket/PhoneTicket";
import FieldTicket from "views/admin/ticket/FieldTicket/FieldTicket";
import AddFieldTicket from "views/admin/ticket/FieldTicket/AddFieldTicket";
import AddPhoneTicket from "views/admin/ticket/PhoneTicket/AddPhoneTicket";
import ManagementEquipement from "views/admin/EquipementManagement/equipement";
import AddEquipement from "views/admin/EquipementManagement/AddEquipement";
import EquipementDetails from "views/admin/EquipementManagement/EquipementDetails";
/******************  CLIENT ******************/
import ClientManagement from "views/admin/ClientManagement/clientManagement";
import Client from "views/admin/ClientManagement/CLIENT/Client";
import ClientDetails from "views/admin/ClientManagement/CLIENT/ClientDetails";
import AddClient from "views/admin/ClientManagement/CLIENT/AddClient";
/******************  CONTRAT ******************/
import AddContrat from "views/admin/ClientManagement/CONTRAT/AddContrat";
import ContratDetails from "views/admin/ClientManagement/CONTRAT/ContratDetails";
import Contrat from "views/admin/ClientManagement/CONTRAT/Contrat";
import Services from "views/admin/ClientManagement/SERVICE/Services";
import AddService from "views/admin/ClientManagement/SERVICE/AddService";
import HelpDeskList from "views/Modals/ListeHelpdesk";
import ServicesDetails from "views/admin/ClientManagement/SERVICE/ServicesDetails";
import PhoneTicketDetails from "views/admin/ticket/PhoneTicket/PhoneTicketDetails";
import TicketApproval from "views/admin/ticket/TicketApprouval";
import FieldDetails from "views/admin/ticket/FieldTicket/FieldDetails";
import AddPhoneTicketToTechnicien from "views/admin/ticket/PhoneTicket/AddPhoneTicketToTechnicien";
//import PhoneTicketDetails from "views/admin/ticket/PhoneTicket/";
const routes = [
  {
    name: "Acceuil",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Acceuil",
    layout: "/admin",
    path: "",
    icon: <MdHome className="h-6 w-6" />,
    component: <Dashboard />,
    allowedRoles: ["COORDINATRICE"],
  },

  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Log out",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignIn />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "calendrier",
    layout: "/admin",
    path: "calendrier",
    icon: <MdEventAvailable className="h-6 w-6" />,
    component: <Calandar />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "sign up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLogout className="h-6 w-6" />,
    component: <SignUp />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "help",
    layout: "/admin",
    path: "help",
    icon: <MdHelp className="h-6 w-6" />,
    component: <ContactUS />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "modifierprofile",
    layout: "/admin",
    path: "modifier",
    icon: <MdHelp className="h-6 w-6" />,
    component: <ModifierProfile />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Reclamations",
    layout: "/admin",
    path: "reclamations",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <ManageReclamation />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Equipement",
    layout: "/admin",
    path: "equipement",
    icon: <MdEscalator className="h-6 w-6" />,
    component: <Equipement />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Tickets",
    layout: "/admin",
    path: "ticket",
    icon: <MdAirplaneTicket className="h-6 w-6" />,
    component: <TicketMangement />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Client",
    layout: "/admin",
    path: "client",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ClientManagement />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Add",
    layout: "/admin",
    path: "client/add",
    icon: <MdPerson className="h-6 w-6" />,
    component: <AddClient />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "",
    layout: "/admin",
    path: "client/:clientId",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ClientDetails />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "",
    layout: "/admin",
    path: "contrat/:contratId",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ContratDetails />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Contrats",
    layout: "/admin",
    path: "client/contrat",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Contrat />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Add",
    layout: "/admin",
    path: "client/contrat/add",
    icon: <MdPerson className="h-6 w-6" />,
    component: <AddContrat />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Services",
    layout: "/admin",
    path: "client/service",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Services />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Services",
    layout: "/admin",
    path: "client/service/add",
    icon: <MdPerson className="h-6 w-6" />,
    component: <AddService />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Services",
    layout: "/admin",
    path: "client/service/:serviceId",
    icon: <MdPerson className="h-6 w-6" />,
    component: <ServicesDetails />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "client",
    layout: "/admin",
    path: "client/liste",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Client />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "history",
    layout: "/admin",
    path: "history",
    icon: <MdHistory className="h-6 w-6" />,
    component: <History />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Reported ",
    layout: "/admin",
    path: "reported",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <RecRep />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Liste Technicien ",
    layout: "/admin",
    path: "liste technicien",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <ListeTechniciens />,
    allowedRoles: ["COORDINATRICE"],
  },
 
 
  {
    name: "Add ",
    layout: "/admin",
    path: "add/equipement",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <AddEquipement />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Equiment Details",
    layout: "/admin",
    path: "equipement/details/:equipementId",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <EquipementDetails />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Ticket Details",
    layout: "/admin",
    path: "/field/:ticketId",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <FieldDetails />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Ticket Details",
    layout: "/admin",
    path: "/phone/:ticketId",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <PhoneTicketDetails />,
    allowedRoles: ["COORDINATRICE"],
  },
  {

    name: "liste helpdesk",
    layout: "/admin",
    path: "liste helpdesk",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <HelpDeskList />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Equipements",
    layout: "/admin",
    path: "manage/equipement",
    icon: <IoMdTv className="h-6 w-6" />,
    component: <ManagementEquipement />,
    allowedRoles: ["COORDINATRICE"],
  },

  {
    name: "Clients",
    layout: "/admin",
    path: "client/management",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <ClientManagement />,
    allowedRoles: ["COORDINATRICE"],
  },
  /////ADD//
  {
    name: "Add ",
    layout: "/admin",
    path: "add/phone",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <AddPhoneTicket />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Add ",
    layout: "/admin",
    path: "add/field",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <AddFieldTicket />,
    allowedRoles: ["COORDINATRICE"],
  },
  
  {
    name: "Field  Processing",
    layout: "/admin",
    path: "processing",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <TicketProcessing />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Ticket  Approuval",
    layout: "/admin",
    path: "approval",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <TicketApproval />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Phone  Processing",
    layout: "/admin",
    path: "processing/phone",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <PhoneTicketProcessing />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Phone Tickets",
    layout: "/admin",
    path: "phone",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <PhoneTicket />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Field Tickets",
    layout: "/admin",
    path: "field",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <FieldTicket />,
    allowedRoles: ["COORDINATRICE"],
  },
  {
    name: "Phone Technicien",
    layout: "/admin",
    path: "add/technicien/phone",
    icon: <IoMdAlert className="h-6 w-6" />,
    component: <AddPhoneTicketToTechnicien/>,
    allowedRoles: ["COORDINATRICE"],
  },
  
  {
    name: "No Access",
    layout: "/noacces",
    path: "*",
    component: <NoAccess />,
  },
];
export default routes;
