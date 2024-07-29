import React, { useState, useEffect } from 'react';
import Card from 'components/card';


const Nbtechnicien = () => {
  const [techCount, setTechCount] = useState(null);
 useEffect(() => {
    fetch('/api/user/role/TECHNICIEN')
      .then(response => response.json())
      .then(data => setTechCount(data.count))
      .catch(error => console.error('Error:', error));
  }, []);
  return (
    <Card extra="pb-7 p-[20px]">
      <p className="text-lg text-tunisys-100 font-bold dark:text-white">Nombre Techniciens </p>
      <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8 md:space-y-0">
        <div className="flex flex-col items-center">
        {techCount !== null && <p className="text-4xl mt-5 text-tunisys-100 font-bold dark:text-white">{techCount}</p>}

       </div> 
      </div>

  </Card>
  );
};

export default Nbtechnicien;

