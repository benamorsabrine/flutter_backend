import React, { createContext, useState } from 'react';

export const ChartContext = createContext();

export const ChartContextProvider = ({ children }) => {
  const [chartData, setChartData] = useState([]);

  const updateChartData = (newData) => {
    setChartData(newData);
  };

  return (
    <ChartContext.Provider value={{ chartData, updateChartData }}>
      {children}
    </ChartContext.Provider>
  );
};
