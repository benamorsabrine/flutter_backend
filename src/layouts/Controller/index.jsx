import React,{useState,useEffect} from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import ControllerSidebar from "components/sidebar/controllersidebar";
import Footer from "components/footer/Footer";
import croutes from "../../Routes/croutes";
import {useAuthContext} from 'views/auth/hooks/useAuthContext'

export default function Controller(props) {
  const {user}  = useAuthContext()
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");
  const [socket,setSocket] = useState(null)
  
  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(croutes);
  }, [location.pathname]);

  const getActiveRoute = (routes) => {
    let activeRoute = "Main Dashboard";
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(
          routes[i].layout + "/" + routes[i].path
        ) !== -1
      ) {
        setCurrentRoute(routes[i].name);
      }
    }
    return activeRoute;
  };
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return activeNavbar;
  };

  const getRoutes = (croutes) => {
    return croutes.map((prop, key) => {
      if (prop.layout === "/manager") {
        // Add a conditional check for allowed roles
        if (user &&
          prop.allowedRoles.includes(user.role)) {
          return <Route path={`/${prop.path}`} element={prop.component} key={key} />;
        } else {
          // Optionally, you can redirect to a different page if the user's role is not allowed
          return <Navigate to="/noaccess" key={key} />;
        }
      } else {
        return null;
      }
    });
  };

  document.documentElement.dir = "ltr";
  return (
    <div className="flex h-full w-full">
      <ControllerSidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={""}
              brandText={currentRoute}
              secondary={getActiveNavbar(croutes)}
              {...rest}
              socket ={socket}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(croutes)}

                <Route
                  path="/"
                  element={<Navigate to="/manager/default" replace />}
                />
              </Routes>
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
