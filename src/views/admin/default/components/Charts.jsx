import React, { useState, useEffect } from "react";
import Chart from 'react-apexcharts';
import 'apexcharts/dist/apexcharts.css';
import Card from "components/card";
import { MdBarChart } from "react-icons/md";
import { useAuthContext } from 'views/auth/hooks/useAuthContext';

const Charts = () => {
  const { user } = useAuthContext();
  const [chartData, setChartData] = useState({
    labels: [],
    totalData: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/ticket/getTicketByDay', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const labels = data.map((item) => item.day);
        const totalData = data.map((item) => item.count);

        setChartData({ labels, totalData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user.token]);

  const { labels, totalData } = chartData;


  const chartOptions = {
    chart: {
      type: "bar",
      height: 50,
      stacked: false,
      toolbar: {
        show: true,
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
        columnWidth: "80px",
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
        name: "Nombre",
        data: totalData,
      },
    ],
    xaxis: {
      categories: labels,
      show: true,
      labels: {
        show: true,
        style: {
          colors: "#cc1d45",
          fontSize: "12px",
          fontWeight: "500",
        },
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      show: true,
      color: "#cc1d45",
      labels: {
        show: false,
        style: {
          colors: "#cc1d45",
          fontSize: "14px",
        },
        formatter: function (val) {
          return val + "par jour";
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " par jour";
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

  }

  return (
    <Card extra="flex flex-col bg-white w-full rounded-3xl py-6 px-2 text-center">
      <div className="mb-auto flex items-center justify-between px-6">
        <h2 className="text-lg text-tunisys-100 font-bold dark:text-white">
          Nombre réclamations : {new Date().toLocaleString('default', { month: 'long' })}
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
              series={[{ name: "Total", data: totalData }]}
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
