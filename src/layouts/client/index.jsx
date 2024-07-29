import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "components/navbar";
import ClientSidebar from "components/sidebar/clientsidebar";
import Footer from "components/footer/Footer";
import clroutes from "../../Routes/clientRoutes";
import {useAuthContext} from 'views/auth/hooks/useAuthContext'


export default function Client(props) {
  const {user}  = useAuthContext()
  const { ...rest } = props;
  const location = useLocation();
  const [open, setOpen] = React.useState(true);
  const [currentRoute, setCurrentRoute] = React.useState("Main Dashboard");

  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true)
    );
  }, []);
  React.useEffect(() => {
    getActiveRoute(clroutes);
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
  /*const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/client") {
        return (
          <Route path={`/${prop.path}`} element={prop.component} key={key} />
        );
      } else {
        return null;
      }
    });
  };*/
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/client") {
        // Add a conditional check for allowed roles
        if (user && prop.allowedRoles.includes(user.role)) {
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
      <ClientSidebar open={open} onClose={() => setOpen(false)} />
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[313px]`}
        >
          <div className="h-full">
            <Navbar
              onOpenSidenav={() => setOpen(true)}
              logoText={""}
              brandText={currentRoute}
              secondary={getActiveNavbar(clroutes)}
              {...rest}
            />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Routes>
                {getRoutes(clroutes)}

                <Route
                  path="/"
                  element={<Navigate to="/client/default" replace />}
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