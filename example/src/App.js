import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

const mapStyles = {
  width: '80%',
  height: '80%'
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={
          {
            lat: 40.014,
            lng: -105.269
          }
        }
      >
        <Marker
          name={'Mexican'}
          onClick={this.onMarkerClick}
          position={{lat: 40.016, lng: -105.282}} />
        <Marker
          name={'Pizza Pizza'}
          onClick={this.onMarkerClick}
          position={{lat: 40.011, lng: -105.279}} />
        <Marker />

        <Marker
          onClick={this.onMarkerClick}
          name={'Freddies Hot Dogs'}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h1>*Food Truck*</h1>
            <h3>{this.state.selectedPlace.name}</h3>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDG2yQUqLUTXWRPyDceJqntNldd_v69-Aw'
})(MapContainer);

