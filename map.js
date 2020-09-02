require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/CSVLayer"
], function (Map, MapView, CSVLayer) {

  const popupTemplate = {
    content: "{place}"
  };

  let iconRenderer = {
    type: "simple",
    symbol: {
      type: "simple-marker",

      color: [
        0,
        197,
        255,
        64
      ],
      size: 30,
      xoffset: 0,
      yoffset: 15,
      path: "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z"

    }
  }

  let locationLabels = {
    symbol: {
      type: "text",
      color: "#000000",
      haloColor: "#FFFFFF",
      haloSize: "1px",
      font: {
        size: "15px",
        family: "Arial",
        style: "normal",
        weight: "bold"
      }
    },
    labelPlacement: "center-center",
    labelExpressionInfo: {
      expression: "$feature.place"
    }
  };




  document.getElementById("USAbutton").addEventListener("click", function () {
    SetMap({
      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
      csvUrl: "USA.csv",
      center: [-95.7129, 37.0902], // longitude, latitude
      zoom: 3
    });
  });

  document.getElementById("WorldButton").addEventListener("click", function () {
    SetMap({
      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
      csvUrl: "World.csv",
      center: [44.525455,1.677438], // longitude, latitude
      zoom: 2
    });
  });

  function SetMap(mapConfiguration) {
    let map = new Map({
      basemap: "topo-vector"
    });

    let view = new MapView({
      container: "view",
      map: map,
      center: mapConfiguration.center, 
      zoom: mapConfiguration.zoom
    });

    let csvLayer = new CSVLayer({
      url: mapConfiguration.csvUrl,
      labelingInfo: [locationLabels],
      renderer: iconRenderer,
      popupTemplate: popupTemplate
    });

    map.add(csvLayer);

  }

});

