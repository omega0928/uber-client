import React from "react";
import { useGoogleMaps } from "react-hook-google-maps";

function FindAddress() {
  const { ref, map, google } = useGoogleMaps(
    "AIzaSyChR2_Zr0Yyym8zeRllajGFKlD6CXhsuuU",
    // NOTE: even if you change options later
    {
      center: { lat: 0, lng: 0 },
      zoom: 3,
    }
  );
  console.log(map); // instance of created Map object (https://developers.google.com/maps/documentation/javascript/reference/map)
  console.log(google); // google API object (easily get google.maps.LatLng or google.maps.Marker or any other Google Maps class)
  return <div ref={ref} style={{ width: 400, height: 300 }} />;
}

export default FindAddress;
