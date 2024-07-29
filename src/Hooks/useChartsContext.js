import React, { useContext } from 'react';
import ChartContext from './ChartContext';

function useChartContext() {
  const chartContext = useContext(ChartContext);
  if (!chartContext) {
    throw new Error('useChartContext must be used within a ChartProvider');
  }
  return chartContext;
}

export default useChartContext;
