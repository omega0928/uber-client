import { GoogleAPI } from "google-maps-react";
import React from "react";
import ReactDOM from "react-dom";
import FindAddressPresenter from "./FindAddressPresenter";

interface IState {
  lat: number;
  lng: number;
}

class FindAddressContainer extends React.Component<any, IState> {
  public mapRef: any;
  public map: any;
  constructor(props: any) {
    super(props);
    this.mapRef = React.createRef();
  }
  public componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
    );
  }
  public render() {
    return <FindAddressPresenter mapRef={this.mapRef} />;
  }
  public handleGeoSucces = (positon: any) => {
    const {
      coords: { latitude, longitude },
    } = positon;
    this.setState({
      lat: latitude,
      lng: longitude,
    });
    this.loadMap(latitude, longitude);
  };
  public handleGeoError = () => {
    console.log("No location");
  };
  public loadMap = (lat: any, lng: any) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: any = {
      center: {
        lat,
        lng,
      },
      disableDefaultUI: true,
      zoom: 11,
    };
    this.map = new maps.Map(mapNode, mapConfig);
    this.map.addListener("dragend", this.handleDragEnd);
  };
  public handleDragEnd = () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    console.log(lat, lng)
    this.setState({
      lat,
      lng,
    });
  };
}

export default FindAddressContainer;