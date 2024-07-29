import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const Map = ({ locations }) => {
  const mapStyles = {
    height: '400px',
    width: '100%',
  };
  const defaultCenter = {
    lat: 0,
    lng: 0, 
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCIxHzvfQ_tZ02yGhJL9BJ1Qjm9kRWlnUc">
      <GoogleMap mapContainerStyle={mapStyles} zoom={2} center={defaultCenter}>
        {locations.map((location, index) => (
          <Marker key={index} position={{ lat: location.lat, lng: location.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
