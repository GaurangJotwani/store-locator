import React from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import "./GoogleMap.css";

const mapStyles = {
  width: "100%",
  height: "100%",
};

let markerObjects = [];

export class MapContainer extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onClose = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (!this.isEqual(prevProps.storeList, this.props.storeList)) {
      this.setState(() => ({
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      }));
    }

    if (prevProps.selectedMarkerIndex !== this.props.selectedMarkerIndex) {
      if (markerObjects.length > 0 && this.props.selectedMarkerIndex) {
        let markers = markerObjects.slice(
          markerObjects.length - 20,
          markerObjects.length
        );

        new this.props.google.maps.event.trigger(
          markers[this.props.selectedMarkerIndex - 1].marker,
          "click"
        );
      }
    }
  }

  onMarkerMounted = (element) => {
    markerObjects.push(element);
  };

  getMarkers = () => {
    const markers = this.props.storeList.map((store, index) => {
      return (
        <Marker
          id={index}
          ref={this.onMarkerMounted}
          onClick={this.onMarkerClick}
          position={{
            lat: store.coordinates.latitude,
            lng: store.coordinates.longitude,
          }}
          key={store.id}
          name={store.name}
          address={store.location.address1}
          phone={store.phone}
          index={index + 1}
          rating={store.rating}
          category={store.categories[0].title}
          label={`${index + 1}`}
        />
      );
    });
    return markers;
  };

  getMapBounds = (stores) => {
    let bounds = new this.props.google.maps.LatLngBounds();
    for (let index = 0; index < this.props.storeList.length; index++) {
      bounds.extend({
        lat: this.props.storeList[index].coordinates.latitude,
        lng: this.props.storeList[index].coordinates.longitude,
      });
    }
    return bounds;
  };

  render() {
    return (
      <Map
        google={this.props.google}
        defaultZoom={8}
        style={mapStyles}
        defaultCenter={{
          lat: 34.06338,
          lng: -118.35808,
        }}
        onClick={this.onMapClicked}
        bounds={this.getMapBounds()}
      >
        {this.getMarkers()}
        <InfoWindow
          position={this.state.selectedPlace.position}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div id="info-window" className="store-info-window">
            <div className="store-info-name">
              {this.state.selectedPlace.name}
            </div>
            <div className="store-info-open-status">
              {this.state.selectedPlace.category} | Rating:{" "}
              {this.state.selectedPlace.rating} / 5
            </div>
            <div className="store-info-address">
              <div className="icon">
                <i className="fas fa-location-arrow"></i>
              </div>
              <span> {this.state.selectedPlace.address}</span>
            </div>
            <div className="store-info-phone">
              <div className="icon">
                <i className="fas fa-phone-alt"></i>
              </div>
              <span>
                <a href="tel:{this.state.selectedPlace.phone}">
                  {this.state.selectedPlace.phone}
                </a>
              </span>
            </div>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(MapContainer);
