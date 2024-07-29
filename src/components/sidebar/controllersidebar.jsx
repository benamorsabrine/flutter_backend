/* eslint-disable */
import tunisys from 'assets/img/navbar/tu.png'
import { HiX } from "react-icons/hi";
import Links from "./componentsrtl/Links";

import controllerroutes from "../../Routes/CsideRoutes";

const ControllerSidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-[50px] mt-[10px] flex items-center`}>
        <img src={tunisys} alt='tunisys' className={`w-[140px] mt-6 h-12`}/>
        
      </div>
      <div className="mt-[30px] mb-7 h-px bg-gray-300 dark:bg-white/30" />

      <ul className="mb-auto pt-1">
        <Links routes={controllerroutes} />
      </ul>
    </div>
  );
};

export default ControllerSidebar ;