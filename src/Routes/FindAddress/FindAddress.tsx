import { mergeOptions } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useGoogleMaps } from "react-hook-google-maps";
import AddressBar from "../../Components/AddressBar/AddressBar";
import { MAPS_KEY } from "../../keys";
import { reverseGeoCode } from "../../mapHelpers";
import styled from "../../typed-components";

const Center = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  z-index: 2;
  font-size: 30px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

function FindAddress() {
  const [location, SetLocation] = useState({
    lat: 0,
    lng: 0,
    address: "",
  });
  console.log('locationState', location)
  const { lat, lng, address } = location;
  const { ref, map, google } = useGoogleMaps(
    MAPS_KEY,
    // NOTE: even if you change options later
    {
      center: { lat, lng },
      zoom: 11,
    }
  );

  const handleDragEnd = async () => {
    const newCenter = map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    const reversAddress = await reverseGeoCode(lat, lng)
    SetLocation({
      ...location,
      lat: lat,
      lng: lng,
      address: reversAddress,
    });
  };
  map?.addListener("dragend", handleDragEnd);

  const handleGeoSuccess = (position: any) => {
    const {
      coords: { latitude, longitude },
    } = position;
    SetLocation({
      ...location,
      lat: latitude,
      lng: longitude,
    });
  };

  const handleGeoError = () => {
    return;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    SetLocation({
      ...location,
      [name]: value,
    });
  };

  const onInputBlur = () => {
    console.log("Address updated");
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }, []);
  
  return (
    <div>
      <AddressBar
        onBlur={onInputBlur}
        onChange={handleInputChange}
        name={"address"}
        value={address}
      />
      <Center>📍</Center>
      <div
        ref={ref}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default FindAddress;
