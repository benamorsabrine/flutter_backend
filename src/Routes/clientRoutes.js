  import { MdHome} from "react-icons/md";
  import Home from "views/client/home";

  
  const clroutes = [
    {
      name: "Acceuil",
      layout: "/client",
      path: "default",
      icon: <MdHome className="h-6 w-6" />,
      component: <Home />,
      allowedRoles: ['CLIENT'] // Liste des rôles autorisés pour accéder à cette route
    },
   
  ];
  
  export default clroutes;
  