import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "boxicons";
import App from "./App";
import { UsersContextProviders } from "Contexts/userContext";
import { AuthContextProvider } from "views/auth/context/AuthContext";
import { ReclamationsContextProvider } from "Contexts/reclamationContext";
import { EquipementsContextProvider } from "Contexts/equipementContext";
import { ChartContextProvider } from "Contexts/chartContext";
import { NotificationsContextProvider } from "Contexts/notificationContext";
import { HelpRecContextProvider } from "Contexts/helpRecContext";
import { InterventionsContextProvider } from "Contexts/interventionContext";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AuthContextProvider>
    <HelpRecContextProvider>
      <UsersContextProviders>
        <ReclamationsContextProvider>
          <EquipementsContextProvider>
            <ChartContextProvider>
              <NotificationsContextProvider>
                <InterventionsContextProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
                </InterventionsContextProvider>
              </NotificationsContextProvider>
            </ChartContextProvider>
          </EquipementsContextProvider>
        </ReclamationsContextProvider>
      </UsersContextProviders>
    </HelpRecContextProvider>
  </AuthContextProvider>
);
