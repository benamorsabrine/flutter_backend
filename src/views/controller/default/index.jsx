import NbClients from "./components/NbClients";
import Nbtechnicien from "./components/Nbtechnicien";
import NbHelpdesk from "./components/NbHelpdesk";
const ControllerDashboard = () => {
  return (
    <div>

      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-1">
        <NbHelpdesk />
      </div>

      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-1">
        <NbClients />
      </div>
      <div className="mt-2 grid grid-cols-1 gap-5  w-full h-full rounded-[20px] md:grid-cols-1">
        <Nbtechnicien />
      </div>
   
    </div>
  );
};

export default ControllerDashboard;
