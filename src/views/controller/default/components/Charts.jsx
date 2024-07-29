import React, { useState,useEffect} from "react";
import Chart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import Card from "components/card";
import { MdBarChart } from "react-icons/md";

const Charts = () => {

  const [chartSeries, setChartSeries] = useState([
    {
      name: 'Réclamation',
      data: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65,45, 50],
    },
  ]);
  const [chartData, setChartData] = useState({
    labels: [],
    totalData: [],
  });

  /*useEffect(() => {
    fetch("/rec/total")
      .then((response) => response.json())
      .then((data) => {
        // Check and convert date property to Date object if necessary
        data.forEach((item) => {
          if (typeof item.date !== "object" || item.date.constructor !== Date) {
            item.date = new Date(item.date);
          }
        });
        // Group by hour and sum totals
        const hourlyData = {};
        data.forEach((item) => {
          const hour = item.date.getHours();
          hourlyData[hour] = (hourlyData[hour] || 0) + item.total;
        });
        // Generate labels and totalData arrays
        const labels = Array.from(Array(24).keys()).map((hour) => `${hour}`);
        const totalData = labels.map((label) => hourlyData[label.split(":")[0]] || 0);
        setChartData({ labels, totalData });
      });
  }, []);
  
*/
  const { labels, totalData } = chartData;

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 100,
              color: "#cc1d45",
              opacity: 1,
            },
            {
              offset: 100,
              color: "rgba(255, 150, 210,1)",
              opacity: 1,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: true,
    },

    
    grid: {
      show: false,
      strokeDashArray: 2,
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        columnWidth: "60px",
        horizontal: false,
        endingShape: "rounded",
      },
    },
    colors: ["#cc1d45"],
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    series: [
      {
        name: "Total",
        data: totalData,
      },
    ],
    xaxis: {
      categories: labels,
      show: false,
      labels: {
        show: false,
        style: {
          colors: "#cc1d45",
          fontSize: "14px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      color: "#cc1d45",
      labels: {                                                                            
        show: false,
        style: {
          colors: "#cc1d45",
          fontSize: "14px",
        },
        formatter: function (val) {
          return val + "par heure";
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " per hour";
        },
      },
      enabled: true,
      theme: "dark",
      style: {
        fontSize: "12px",
        fontFamily: undefined,
        backgroundColor: "#cc1d45"
      },
    },
  };
  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg  text-tunisys-100 font-bold  dark:text-white">
          Nombre réclamations
        </h2>
        <button className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-tunisys-100 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
          <MdBarChart className="h-6 w-6" />
        </button>
      </div>

      <div className="md:mt-16 lg:mt-0">
        <div className="w-full ">
          <div className="h-64 sm:h-72 md:h-80 lg:h-96 xl:h-120 w-full">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height="100%"
              width="100%"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Charts;
