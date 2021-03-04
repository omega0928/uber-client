import { mergeOptions } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useGoogleMaps } from "react-hook-google-maps";
import { useHistory } from "react-router-dom";
import AddressBar from "../../Components/AddressBar/AddressBar";
import Button from "../../Components/Button/Button";
import { MAPS_KEY } from "../../keys";
import { geoCode, reverseGeoCode } from "../../mapHelpers";
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

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

function FindAddress() {
  const history = useHistory();
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    address: "",
  });
  console.log("locationState", location);
  const { lat, lng, address } = location;
  const { ref, map, google } = useGoogleMaps(
    MAPS_KEY,
    // NOTE: even if you change options later
    {
      center: { lat, lng },
      minZoom: 8,
      zoom: 11,
    }
  );

  const handleDragEnd = async () => {
    const newCenter = map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();

    setLocation({
      ...location,
      lat: lat,
      lng: lng,
    });
  };
  map?.addListener("dragend", handleDragEnd);

  const handleGeoSuccess: PositionCallback = (position: any) => {
    const {
      coords: { latitude, longitude },
    } = position;
    setLocation({
      ...location,
      lat: latitude,
      lng: longitude,
    });
    reverseGeocodeAddress(latitude, longitude);
  };

  const handleGeoError: PositionErrorCallback = () => {
    return;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    setLocation({
      ...location,
      [name]: value,
    });
  };

  const reverseGeocodeAddress = async (lat: number, lng: number) => {
    const reversAddress = await reverseGeoCode(lat, lng);
    if (reversAddress !== false) {
      setLocation({
        ...location,
        address: reversAddress,
      });
    }
  };

  const onInputBlur = async () => {
    const result = await geoCode(address);
    if (result !== false) {
      const { lat, lng, formatted_address: formattedAddress } = result;
      setLocation({
        address: formattedAddress,
        lat,
        lng,
      });
      map.panTo({ lat, lng });
    }
  };

  const onPickPlace = () => {
    history.push({
      pathname: "/add-place",
      state: { address, lat, lng },
    });
  };

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
      <ExtendedButton value={"장소 선택"} onClick={onPickPlace} />
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
