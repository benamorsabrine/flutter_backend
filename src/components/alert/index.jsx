import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts/get');
      if (!response.ok) {
        throw new Error('Error fetching alerts');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching alerts:', error);
      toast.error('Error fetching alerts. Please try again later.');
      throw error;
    }
  };
  

const AlertComponent = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAlerts();
        setAlerts(data);
      } catch (error) {
        console.error('Error setting alerts:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    alerts.forEach((alert) => {
      toast.info(`Alert: User ${alert.userId.name} did not accept ticket "${alert.ticketId.title}"`, {
        position: 'top-right',
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }, [alerts]);

  return <></>;
};

export default AlertComponent;
