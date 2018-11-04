import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  state = {
    venues: []
  };

  componentDidMount() {
    this.getVenues();
    this.loadMap();
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
      client_id: "TPH0HARWJI330EF4O0RJIYJR2V3WNWPA03BXBQPO3MWUCQF3",
      client_secret: "NRQQEB0M10YV10LZBC20OHFN2IV0NBB1FGKPGQCIENH4W5JG",
      query: "food",
      near: "Sydney",
      v: "20182507"
    };

    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        console.log(response.data.response.groups[0].items);
        this.setState({ venues: response.data.response.groups[0].items });
      })
      .catch(error => {
        console.log("ERROR!! " + error);
      });
  };

  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: -34.397,
        lng: 150.644
      },
      zoom: 8
    });
  };

  render() {
    return (
      <main>
        does this work ?<div id="map" />
      </main>
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
