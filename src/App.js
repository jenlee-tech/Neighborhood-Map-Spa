import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    venues: []
  };

  componentDidMount() {
    this.getVenues();
  }

  loadMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDmE98-Nqxd8oecCmB-_iJlKDLKtnV5SJk&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      //place keys here

      query: "food",
      near: "Hartford",
      v: "20182507"
    };
    //handling asynchronous functions by putting loadMap in the then method
    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        console.log(response.data.response.groups[0].items);
        this.setState({
          venues: response.data.response.groups[0].items
        });
      }, this.loadMap())
      .catch(error => {
        console.log("ERROR!! " + error);
      });
  };

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 41.7621,
        lng: -72.742
      },
      zoom: 8
    });
    //creates an infowindow
    var infowindow = new window.google.maps.InfoWindow();

    //show dynamic markers
    this.state.venues.map(myVenue => {
      var contentString = myVenue.venue.name; //this one is weird

      //create a marker
      var marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng
        },
        map: map,
        title: myVenue.venue.name
      });

      //open an infowindow upon click
      marker.addListener("click", function() {
        //change content in infowindow
        infowindow.setContent(contentString);

        //Opens an infowindow
        infowindow.open(map, marker);
      });
    });

    var marker = new window.google.maps.Marker({
      position: {
        lat: 41.7621,
        lng: -72.742
      },
      map: map
    });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="text-input">
            <div className="sidebar tex-input text-input-hidden" />
            <div id="map" />
          </div>
        </div>
      </div>
    );
  }
}

function loadScript(url) {
  const index = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}

export default App;
