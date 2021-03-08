import React, { useEffect, useState } from "react";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";
import Menu from "../../Common/Menu/Menu";
import { useQuery } from "@apollo/client";
import { USER_PROFILE } from "../../commonQuery";
import { useGoogleMaps } from "react-hook-google-maps";
import { MAPS_KEY } from "../../keys";
import Button from "../../Common/Button/Button";
import AddressBar from "../../Common/AddressBar/AddressBar";
import { geoCode } from "../../mapHelpers";
import { toast } from "react-toastify";

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
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

function Home() {
  const [sideMenu, setSideMenu] = useState(false);
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
    toAddress: "",
    toLat: 0,
    toLng: 0,
    distance: "",
    duration: "",
  });
  console.log("location", location);
  const { lat, lng, toAddress } = location;
  const { loading } = useQuery(USER_PROFILE);
  const { ref, map, google } = useGoogleMaps(
    MAPS_KEY,
    // NOTE: even if you change options later
    {
      center: { lat, lng },
      zoom: 13,
      disableDefaultUI: true,
    }
  );
  console.log("map", map);
  console.log("google", google?.maps);

  const handleGeoSuccess = (position: any) => {
    const {
      coords: { latitude, longitude },
    } = position;
    setLocation({
      ...location,
      lat: latitude,
      lng: longitude,
    });
  };
  const handleGeoError = () => {
    console.log("No location");
  };

  if (map) {
    var userMarker = new google.maps.Marker({
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 7,
      },
      position: {
        lat,
        lng,
      },
    });
    userMarker.setMap(map);
  }

  const watchOption = {
    enableHighAccuracy: true,
  };

  const handleGeoWatchSuccess = (position: any) => {
    const {
      coords: { latitude, longitude },
    } = position;
    if (map) {
      userMarker.setPosition({ lat: latitude, lng: longitude });
    }
  };

  const handleGeoWatchError = () => {
    console.log("Error watching you");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
    });
  };

  const handleAddressSubmit = async () => {
    const result = await geoCode(toAddress);
    if (result !== false) {
      const { lat, lng, formatted_address: formatedAddress } = result;
      console.log("Submitlat", lat);
      console.log("Submitlng", lng);
      if (toMarker) {
        toMarker.setMap(null);
      }
      const toMarkerOptions = {
        position: {
          lat,
          lng,
        },
      };
      var toMarker = new google.maps.Marker(toMarkerOptions);
      toMarker.setMap(map);
      const bounds = new google.maps.LatLngBounds();
      bounds.extend({ lat, lng });
      bounds.extend({ lat: location.lat, lng: location.lng });
      map.fitBounds(bounds);
      await setLocation({
        ...location,
        toAddress: formatedAddress,
        toLat: lat,
        toLng: lng,
      });
      createPath();
    }
  };

  const createPath = () => {
    const { toLat, toLng } = location;
    console.log("toLat", toLat);
    if (directions) {
      directions.setMap(null);
    }
    const renderOptions = {
      polylineOptions: {
        strokeColor: "#000",
      },
      suppressMarkers: true,
    };
    if (map) {
      var directions = new google.maps.DirectionsRenderer(renderOptions);
      const directionService = new google.maps.DirectionsService();
      const to = new google.maps.LatLng(35.689487, 139.691711);
      const from = new google.maps.LatLng(35.6938253, 139.7033559);
      console.log("abctoLng", to);
      console.log("abclng", from);
      const directionOptions = {
        destination: to,
        origin: from,
        travelMode: google.maps.TravelMode.DRIVING,
      };
      directionService.route(directionOptions, (result: any, status: any) => {
        if (status === "OK") {
          const { routes } = result;
          const {
            distance: { text: distance },
            duration: { text: duration },
          } = routes[0].legs[0];
          setLocation({
            ...location,
            distance,
            duration,
          });
          console.log(distance, duration);
          directions.setDirections(result);
          directions.setMap(map);
        } else {
          toast.error("경로가 없습니다");
        }
      });
    }
  };

  navigator.geolocation.watchPosition(
    handleGeoWatchSuccess,
    handleGeoWatchError,
    watchOption
  );

  const toggleMenu = () => {
    setSideMenu(!sideMenu);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }, []);

  return (
    <Container>
      <Sidebar
        sidebar={<Menu />}
        open={sideMenu}
        onSetOpen={toggleMenu}
        styles={{
          sidebar: { background: "white", width: "80%", zIndex: "10" },
        }}
      >
        {!loading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
        <AddressBar
          name={"toAddress"}
          onChange={handleInputChange}
          value={toAddress}
          onBlur={null}
        />
        <ExtendedButton
          onClick={handleAddressSubmit}
          disabled={toAddress === ""}
          value={"Pick Address"}
        />
        <div
          ref={ref}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </Sidebar>
    </Container>
  );
}

export default Home;
